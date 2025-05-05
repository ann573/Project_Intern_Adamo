import { getFilterTour } from '@features/tour/tourAction'
import React, { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

// import { Calendar } from "@components/ui/calendar";
import { cn } from '@/lib/utils'
import { Popover, PopoverContent, PopoverTrigger } from '@components/ui/popover'
import { format } from 'date-fns'
import { Calendar as CalendarIcon } from 'lucide-react'

import { useAppDispatch, useAppSelector } from '@/hooks/app'
import { Button } from '@components/ui/button'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from '@components/ui/select'
import { DayPicker, SelectSingleEventHandler } from 'react-day-picker'
import { Controller, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import SearchIcon from '@assets/icons/searchIcon.tsx'
type Props = {
  date: Date | undefined
  setDate: React.Dispatch<React.SetStateAction<Date | undefined>>
}

const FormSearchBanner = ({ date, setDate }: Props) => {
  const nav = useNavigate()
  const { t } = useTranslation()
  const isDefault = useLocation().pathname === '/'
  const isHotel = useLocation().pathname.includes('hotel')
  const { type } = useAppSelector((state) => state.tours)

  const button = [`Tours`, `Hotels`]

  const [choose, setChoose] = React.useState('Tours')
  const dispatch = useAppDispatch()

  const { control, handleSubmit } = useForm({
    defaultValues: {
      location: 'Sapa, Laocai',
      type: '',
      tour: ''
    }
  })

  useEffect(() => {
    if (isHotel) {
      return
    }
    const controller = new AbortController()
    const signal = controller.signal
    dispatch(getFilterTour(signal))

    return () => {
      controller.abort()
    }
  }, [dispatch, isHotel])

  useEffect(() => {
    if (isHotel) setChoose('Hotels')
  }, [isHotel])

  function onsubmitForm(data: { location: string; type: string; tour: string }) {
    const queryParams = new URLSearchParams()

    if (data.location) queryParams.append('location', data.location.trim() || '')
    if (choose === 'Hotels') {
      nav(`/search/hotel?${queryParams.toString()}`)
    } else {
      if (data.tour) queryParams.append('type', data.type)
      if (data.type) queryParams.append('type', data.type)
      nav(`/search/tour?${queryParams.toString()}`)
    }
  }

  const handleSelect: SelectSingleEventHandler = (day) => {
    if (day) setDate(day)
  }
  return (
    <>
      <div className='max-w-[400px] lg:w-[400px] transition-all'>
        {isDefault && (
          <div className='grid grid-cols-2 w-full'>
            {button.map((item, index) => (
              <Button
                key={index}
                className={
                  item === choose ? 'rounded-none' : 'rounded-none bg-white/85 text-content dark:bg-background'
                }
                onClick={() => {
                  setChoose(item)
                }}
              >
                {item}
              </Button>
            ))}
          </div>
        )}
        <form className='bg-white/85 dark:bg-background pt-2 pb-6 px-5' onSubmit={handleSubmit(onsubmitForm)}>
          <h2 className='text-2xl text-left text-heading font-medium mt-5 mb-3'>
            {choose === 'Tours' ? `${t('formsearch.tours.heading')}` : `${t('formsearch.hotels.heading')}`}
          </h2>

          <Controller
            name='location'
            control={control}
            render={({ field }) => (
              <div className='relative mb-3'>
                <label htmlFor='location' className='absolute top-1/2 -translate-y-1/2 left-3 text-orange'>
                  <i className='ri-map-pin-line'></i>
                </label>
                <input
                  type='text'
                  id='location'
                  className='border rounded-md bg-white focus:outline-none w-full px-10 py-4 text-sm dark:bg-input/30 dark:border-input dark:hover:bg-input/50'
                  {...field}
                />
              </div>
            )}
          />

          {/* ================ FIELD INPUT 2 =============== */}
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={'outline'}
                className={cn(
                  'w-full justify-start text-left font-normal py-6 outline-none shadow-none',
                  !date && 'text-muted-foreground'
                )}
              >
                <CalendarIcon className='mr-2 h-4 w-4 text-orange' />
                {date ? (
                  format(date, 'PPP')
                ) : (
                  <span className='text-sub-color-second'>{t('formsearch.tours.date')}</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className='w-auto p-0'>
              <DayPicker mode='single' selected={date} onSelect={handleSelect} disabled={{ before: new Date() }} />
            </PopoverContent>
          </Popover>

          {/* ================ FIELD INPUT 4 =============== */}
          {choose === 'Tours' && (
            <Controller
              name='type'
              control={control}
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger className='w-full mt-3'>
                    <div className='flex items-center gap-5'>
                      <i className='ri-flag-line text-orange'></i>
                      <SelectValue
                        placeholder={t('formsearch.tours.type')}
                        className='placeholder:text-sub-color-second'
                      />
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>--- Types ---</SelectLabel>
                      {type?.map((item) => (
                        <SelectItem value={item} key={item}>
                          {item}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              )}
            ></Controller>
          )}

          {/* ================ FIELD INPUT 5 =============== */}
          <Controller
            name='tour'
            control={control}
            defaultValue=''
            render={({ field }) => (
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger className='w-full mt-3'>
                  <div className='flex items-center gap-5'>
                    <i className='ri-group-line text-orange'></i>
                    <SelectValue
                      placeholder={t('formsearch.tours.guest')}
                      className='placeholder:text-sub-color-second'
                    />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>--- Number of guest ---</SelectLabel>
                    <SelectItem value='2'>2</SelectItem>
                    <SelectItem value='4'>{t('formsearch.more')} 4</SelectItem>
                    <SelectItem value='7'>{t('formsearch.more')} 7</SelectItem>
                    <SelectItem value='10'>{t('formsearch.more')} 10</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            )}
          ></Controller>

          <Button className={'w-full mt-5 py-8 rounded-none'}>
            <SearchIcon className='text-xl font-bold' />
            {/* <i className='ri-search-line text-xl'></i> */}
            {t('formsearch.button')}
          </Button>
        </form>
      </div>
    </>
  )
}

export default FormSearchBanner
