import { Button } from '@components/ui/button'
import React from 'react'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@components/ui/dropdown-menu'

import { useFullHotels } from '@/hooks/hotels'
import { X } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { useLocation, useNavigate } from 'react-router-dom'
import { PriceRangeSlider } from '../PriceSlideRange'
import { Checkbox } from '../ui/checkbox'
import { Label } from '../ui/label'
import { RadioGroup, RadioGroupItem } from '../ui/radio-group'

const FilterHotel = () => {
  const nav = useNavigate()
  const { t } = useTranslation('hotels')
  const { pathname, search } = useLocation()

  const [open, setOpen] = React.useState(false)

  // State for filters
  const [budget, setBudget] = React.useState<number[]>([150, 1000]) // [min, max] price range
  const [stars, setStars] = React.useState<number[]>([]) // Array of selected star ratings (e.g., [1, 3, 5])
  const [reviewScore, setReviewScore] = React.useState<string>() // Array of selected review score ranges (e.g., ["8.5+", "8+"])
  const [price, setPrice] = React.useState<number[]>()
  const { data } = useFullHotels()

  React.useEffect(() => {
    if (data) {
      const prices = data.map((product) => product.cost)

      setPrice([...prices])
    }
  }, [data])
  React.useEffect(() => {
    if (!search) {
      setBudget((prev) => {
        prev[0] = 0
        prev[1] = Math.max(...(price ?? []))

        return prev
      })
    } else {
      const params = new URLSearchParams(search)
      const minPrice = parseInt(params.get('minPrice') || '0', 10)
      const maxPrice = parseInt(params.get('maxPrice') || '1000', 10)
      setBudget([minPrice, maxPrice])

      const starsParam = params.get('stars')?.split(',').map(Number) || []
      const reviewScoreParam = params.get('reviewScore') || ''

      setStars(starsParam)
      setReviewScore(reviewScoreParam)
    }
  }, [search, price])

  const handleClear = () => {
    setBudget((prev) => {
      prev[0] = 0
      prev[1] = Math.max(...(price ?? []))

      return prev
    })
    setStars([])
    setReviewScore('')
    const params = new URLSearchParams(search)
    params.delete('minPrice')
    params.delete('maxPrice')
    params.delete('stars')
    params.delete('reviewScore')

    nav(`${pathname}?${params.toString()}`)
  }

  const toggleStar = (star: number) => {
    if (stars.includes(star)) {
      setStars(stars.filter((s) => s !== star))
    } else {
      setStars([...stars, star])
    }
  }

  // Apply filters (placeholder for your filtering logic)
  const handleApply = () => {
    const params = new URLSearchParams(search)

    params.set('minPrice', budget[0].toString())
    params.set('maxPrice', budget[1].toString())
    if (stars.length > 0) {
      params.set('stars', stars.join(','))
    } else {
      params.delete('stars')
    }
    if (reviewScore) {
      params.set('reviewScore', reviewScore)
    } else {
      params.delete('reviewScore')
    }

    nav(`${pathname}?${params.toString()}`)

    setOpen(false)
  }

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant='ghost'
          className={`transition-all cursor-pointer ${open ? 'w-24 justify-between text-black bg-white' : 'w-fit'}`}
        >
          {t('filter.filter')}
          <X className={`${!open && 'hidden'}`} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-64 p-4'>
        <div className='flex justify-between items-center mb-4'>
          <DropdownMenuLabel className='text-lg font-semibold text-[#03387D]'>{t('filter.filterBy')}</DropdownMenuLabel>
          <Button variant='link' className='text-blue-600 p-0 h-auto cursor-pointer' onClick={handleClear}>
            {t('filter.clear')}
          </Button>
        </div>

        {/* Budget Section */}
        <div className='mb-6'>
          <h3 className='text-sm font-medium mb-2'>{t('filter.budget')}</h3>
          <PriceRangeSlider
            value={budget}
            onValueChange={setBudget}
            min={0}
            max={Math.max(...(price ?? []))}
            step={10}
          />
        </div>

        {/* Hotel Star Section */}
        <DropdownMenuSeparator />
        <div className='my-5'>
          <h3 className='text-sm font-medium mb-2'>{t('filter.hotelStar')}</h3>
          {[5, 4, 3, 2, 1].map((star) => (
            <div key={star} className='flex items-center space-x-2 my-2'>
              <Checkbox id={`star-${star}`} checked={stars.includes(star)} onCheckedChange={() => toggleStar(star)} />
              <Label htmlFor={`star-${star}`} className='text-sm'>
                {star} {t('filter.star')}
              </Label>
            </div>
          ))}
        </div>

        {/* Review Score Section */}
        <DropdownMenuSeparator />
        <div className='my-6'>
          <h3 className='text-sm font-medium mb-2'>{t('filter.review')}</h3>
          <RadioGroup value={reviewScore} onValueChange={(value) => setReviewScore(value)} className='space-y-1'>
            {[
              { label: `${t('filter.score.wonderful')} 9.5+`, value: '9.5' },
              { label: `${t('filter.score.vGood')} 9+`, value: '9' },
              { label: `${t('filter.score.good')} 8+`, value: `8` },
              { label: `${t('filter.score.pleasant')} 7+`, value: `7` },
              { label: `${t('filter.score.normal')} 5+`, value: `5` }
            ].map((score) => (
              <div key={score.value} className='flex items-center space-x-2'>
                <RadioGroupItem id={`score-${score.value}`} value={score.value} />
                <Label htmlFor={`score-${score.value}`} className='text-sm cursor-pointer'>
                  {score.label}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>

        {/* Apply Filter Button */}
        <Button
          className='w-full bg-orange-500 hover:bg-orange-600 text-white rounded-none cursor-pointer'
          onClick={handleApply}
        >
          {t('filter.apply')}
        </Button>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default FilterHotel
