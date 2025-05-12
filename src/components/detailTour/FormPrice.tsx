import { addDays, format } from 'date-fns'
import { CalendarIcon } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { DateRange, DayPicker } from 'react-day-picker'
import { vi } from 'react-day-picker/locale'

import { useAppSelector } from '@/hooks/app'
import { cn } from '@/lib/utils'
import { useOrderStore } from '@/zusTand/orderStore'
import { Button } from '@components/ui/button'
import { Input } from '@components/ui/input'
import { Label } from '@components/ui/label'
import { Popover, PopoverContent, PopoverTrigger } from '@components/ui/popover'
import { User2 } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

import { toastConfig } from '@/lib/toast'
import 'react-day-picker/style.css'
import { useTranslation } from 'react-i18next'

const FormPrice = ({ className }: React.HTMLAttributes<HTMLDivElement>) => {
  // redux toolkit
  const { tour } = useAppSelector((state) => state.tours)
  const { t } = useTranslation('tour')
  const language = sessionStorage.getItem('language')
  // zustand
  const { setOrderTour } = useOrderStore()

  const nav = useNavigate()
  const [date, setDate] = useState<DateRange | undefined>({
    from: addDays(new Date(), 1),
    to: addDays(new Date(), tour?.duration || 0)
  })
  const [price, setPrice] = useState(0)
  const [adults, setAdults] = useState(2)
  const [children, setChildren] = useState(0)

  useEffect(() => {
    if (tour) {
      setPrice(adults * tour?.cost + children * (tour?.cost / 2))
    }
  }, [adults, children, tour])

  const handleClearDate = () => {
    setDate(undefined)
  }

  const handleSubmitForm = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()

    if (!date) return toastConfig.error(t('from_price.tour_date_error_2'), undefined, 2000)

    const { from, to } = date
    if (from && to) {
      const selectedDays = (to.getTime() - from.getTime()) / (1000 * 3600 * 24) + 1
      if (tour && Math.ceil(selectedDays) !== tour?.duration) {
        return toastConfig.error(
          t('from_price.tour_duration_error', {
            selectedDays: Math.ceil(selectedDays),
            requiredDays: tour?.duration
          })
        )
      } else {
        setOrderTour({
          id: tour?.id as number,
          cost: tour?.cost as number,
          title: tour?.title as string,
          location: tour?.location as string,
          duration: tour?.duration as number,
          type: tour?.type as string,
          total: price,
          adults,
          children,
          from,
          to
        })
        nav('/checkout/tour')
      }
    }
  }

  return (
    <>
      <section className={cn('grid gap-2', className)}>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              id='date'
              variant={'outline'}
              className={cn(
                'w-full justify-start text-left font-normal py-7 px-3 rounded-none my-5',
                !date && 'text-muted-foreground'
              )}
            >
              <CalendarIcon className='text-primary' />
              {date?.from ? (
                date.to ? (
                  <>
                    {format(date.from, 'dd/MM/yyyy')} - {format(date.to, 'dd/MM/yyyy')}
                  </>
                ) : (
                  format(date.from, 'dd/MM.yyyy')
                )
              ) : (
                <span>{t('from_price.place_date')}</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className='w-auto p-0' align='start'>
            <DayPicker
              initialFocus
              locale={language === 'vi' ? vi : undefined}
              mode='range'
              defaultMonth={date?.from}
              selected={date || undefined}
              onSelect={setDate}
              numberOfMonths={2}
              disabled={{ before: new Date() }}
            />
            {/* Nút hủy lựa chọn */}
            <Button variant='outline' className='mt-2 w-full' onClick={handleClearDate}>
              {t('from_price.cancel')}
            </Button>
          </PopoverContent>
        </Popover>

        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant='outline'
              className='justify-start text-left flex items-center gap-2 w-full py-7 font-light'
            >
              <User2 className='text-orange-500' size={18} />
              <span>
                {adults} {t('from_price.adult')} - {children} {t('from_price.child')}
              </span>
            </Button>
          </PopoverTrigger>
          <PopoverContent className='w-60 space-y-4'>
            <div className='flex justify-between items-center'>
              <Label htmlFor='adults'>Adults</Label>
              <Input
                id='adults'
                type='number'
                min={1}
                value={adults}
                onChange={(e) => setAdults(parseInt(e.target.value) || 1)}
                className='w-20 text-center'
              />
            </div>
            <div className='flex justify-between items-center'>
              <Label htmlFor='children'>Children</Label>
              <Input
                id='children'
                type='number'
                min={0}
                value={children}
                onChange={(e) => setChildren(parseInt(e.target.value) || 0)}
                className='w-20 text-center'
              />
            </div>
          </PopoverContent>
        </Popover>
      </section>

      <div className='flex justify-between items-center my-5'>
        <span className='font-medium'>{t('from_price.total')}</span>
        <span className='font-bold'>${price.toFixed(2)}</span>
      </div>

      <Button
        variant={'default'}
        className='w-full py-7 mt-7 cursor-pointer hover:opacity-80'
        onClick={handleSubmitForm}
      >
        {t('from_price.btn')}
      </Button>
    </>
  )
}

export default React.memo(FormPrice)
