import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { PriceRangeSlider } from '@components/PriceSlideRange'
import { Button } from '@components/ui/button'
import { Checkbox } from '@components/ui/checkbox'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useLocation, useNavigate } from 'react-router-dom'

type TProp = {
  range: number[]
  setRangeFilter: React.Dispatch<React.SetStateAction<number[]>>
  uniqueTypes: string[]
  setRequest: React.Dispatch<React.SetStateAction<string>>
  setIsSearch: React.Dispatch<React.SetStateAction<boolean>>
  setPage: React.Dispatch<React.SetStateAction<number>>
}
const Filter = ({ range, setRangeFilter, uniqueTypes, setRequest, setIsSearch, setPage }: TProp) => {
  const { t } = useTranslation('tours')
  const nav = useNavigate()
  const { pathname, search } = useLocation()
  const initialRange = [0, 2000]
  const [duration, setDuration] = useState('')
  const [selectedTypes, setSelectedTypes] = useState<string[]>([])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const queryParams = new URLSearchParams()

    queryParams.set('cost_gte', String(range[0]))
    queryParams.set('cost_lte', String(range[1]))

    if (duration) {
      if (duration === 'other') queryParams.set('duration_gte', '7')
      else queryParams.set('duration_gte', String(Number(duration) - 2))
      queryParams.set('duration_lte', duration)
    }

    if (selectedTypes.length > 0) {
      selectedTypes.forEach((type) => {
        queryParams.append('type', type)
      })
    }
    setRequest(queryParams.toString())
    setIsSearch(true)
    setPage(1)

    const newUrl = `${pathname}?${queryParams.toString()}`
    nav(newUrl, { replace: true })
  }
  // cost_gte=0&cost_lte=1150&duration_gte=7&duration_lte=other&type=Cruise+-+Nature
  const isDirty =
    duration !== '' || selectedTypes.length > 0 || range[0] !== initialRange[0] || range[1] !== initialRange[1]

  const handleClear = () => {
    setDuration('')
    setSelectedTypes([])
    setRangeFilter(initialRange)
  }

  useEffect(() => {
    if (search) {
      setRequest(search.slice(1, search.length))
      const filters = search.split('&')
      const queryObject: Record<string, string | string[]> = {}

      for (const item of filters) {
        const [key, rawValue] = item.split('=')
        const value = decodeURIComponent(rawValue)

        if (queryObject[key]) {
          // Nếu key đã tồn tại → chuyển thành mảng (nếu chưa)
          if (Array.isArray(queryObject[key])) {
            ;(queryObject[key] as string[]).push(value)
          } else {
            queryObject[key] = [queryObject[key] as string, value]
          }
        } else {
          queryObject[key] = value
        }
      }

      setRangeFilter((prev) => {
        prev[0] = Number(queryObject['?cost_gte'])
        prev[1] = Number(queryObject['cost_lte'])

        return prev
      })

      setDuration(
        Array.isArray(queryObject['duration_lte']) ? queryObject['duration_lte'][0] : queryObject['duration_lte'] || ''
      )
      const normalizeType = (type: string) =>
        decodeURIComponent(type).replace(/\+-\+/g, ' - ').replace(/\+-/g, ' - ').replace(/-\+/g, ' - ')

      const rawTypes = queryObject['type']

      if (Array.isArray(rawTypes)) {
        const parsedTypes = rawTypes.map((t) => normalizeType(t))
        setSelectedTypes(parsedTypes)
      } else if (typeof rawTypes === 'string') {
        setSelectedTypes([normalizeType(rawTypes)])
      }
    }
  }, [search, setRequest, setRangeFilter])
  return (
    <form
      onSubmit={handleSubmit}
      className='absolute w-[250px] bg-white dark:bg-secondary shadow-2xl p-3 left-full -translate-x-full top-25 z-10'
    >
      <div className='flex justify-between'>
        <h3 className='text-[#03387D]'>{t('filter.heading')}</h3>
        <p
          className={`p-[1px] select-none font-semibold ${
            isDirty ? `hover:underline cursor-pointer ` : `text-sub-color-primary/60`
          }`}
          onClick={() => handleClear()}
        >
          {t('filter.remove')}
        </p>
      </div>

      <div className='border-b pb-4 mb-5'>
        <h3 className='font-semibold text-heading mt-3 mb-7'>{t('filter.budget')}: </h3>
        <PriceRangeSlider value={range} onValueChange={setRangeFilter} min={0} max={2000} step={50} />
      </div>

      <div className='border-b pb-4 mb-5'>
        <h3 className='text-[18px] font-semibold text-heading mt-3 mb-4'>{t('filter.duration')}</h3>

        <RadioGroup name='duration' value={duration} onValueChange={setDuration}>
          <div className='flex items-center space-x-2'>
            <RadioGroupItem value='3' id='option-one' />
            <Label className='font-medium cursor-pointer' htmlFor='option-one'>
              0 - 3 {t('filter.days')}
            </Label>
          </div>
          <div className='flex items-center space-x-2'>
            <RadioGroupItem value='5' id='option-two' />
            <Label className='font-medium cursor-pointer' htmlFor='option-two'>
              3 - 5 {t('filter.days')}
            </Label>
          </div>
          <div className='flex items-center space-x-2'>
            <RadioGroupItem value='7' id='option-three' />
            <Label className='font-medium cursor-pointer' htmlFor='option-three'>
              5 - 7 {t('filter.days')}
            </Label>
          </div>
          <div className='flex items-center space-x-2'>
            <RadioGroupItem value='other' id='option-four' />
            <Label className='font-medium cursor-pointer' htmlFor='option-four'>
              {t('filter.week')}
            </Label>
          </div>
        </RadioGroup>
      </div>

      <div>
        <h3 className='text-[18px] font-semibold text-heading mt-3 mb-4'>{t('filter.type')}</h3>
        <ul className='flex flex-col gap-5'>
          {uniqueTypes.map((item, index) => {
            return (
              <li className='flex gap-3' key={index}>
                <Checkbox
                  id={item}
                  name='type'
                  value={item}
                  checked={selectedTypes.includes(item)}
                  onCheckedChange={(checked) => {
                    setSelectedTypes((prev) => (checked ? [...prev, item] : prev.filter((v) => v !== item)))
                  }}
                />
                <label htmlFor={item} className='font-medium cursor-pointer'>
                  {item}
                </label>
              </li>
            )
          })}
        </ul>
      </div>

      <Button type='submit' className='w-full mt-5 mb-3 cursor-pointer' disabled={!isDirty}>
        {t('filter.apply')}
      </Button>
    </form>
  )
}

export default Filter
