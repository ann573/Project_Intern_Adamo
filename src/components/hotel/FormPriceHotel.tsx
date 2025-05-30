import { addDays, format } from 'date-fns'
import { CalendarIcon } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { DateRange, DayPicker } from 'react-day-picker'

import { useDetailHotels } from '@/hooks/hotels'
import { toastConfig } from '@/lib/toast'
import { cn } from '@/lib/utils'
import { useOrderStore } from '@/zusTand/orderStore'
import { useRoomStore } from '@/zusTand/roomStore'
import { Button } from '@components/ui/button'
import { Checkbox } from '@components/ui/checkbox'
import { Input } from '@components/ui/input'
import { Label } from '@components/ui/label'
import { Popover, PopoverContent, PopoverTrigger } from '@components/ui/popover'
import { User2 } from 'lucide-react'
import { vi } from 'react-day-picker/locale'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

const FormPriceHotel = ({ id }: { id: string }) => {
  const language = sessionStorage.getItem('language')
  const { t } = useTranslation('hotel')
  const nav = useNavigate()
  const { data } = useDetailHotels(id)
  const { rooms, incrementRoom, decrementRoom, getMaxNumber } = useRoomStore()
  const { setOrderRoom } = useOrderStore()
  const [date, setDate] = useState<DateRange | undefined>(() => {
    const from = addDays(new Date(), 1)
    from.setHours(0, 0, 0, 0)

    const to = addDays(new Date(), 2)
    to.setHours(0, 0, 0, 0)

    return { from, to }
  })
  const [price, setPrice] = useState(0)
  const [adults, setAdults] = useState(2)
  const [children, setChildren] = useState(0)
  const [addons, setAddons] = useState([
    { name: t('from_price.breakfast'), checked: true, count: 1, price: 20 },
    { name: t('from_price.bed'), checked: false, count: 0, price: 5 }
  ])
  const totalRoom = rooms.reduce((sum, r) => sum + r.count * r.price_discount, 0)
  const totalAddon = addons.reduce((sum, a) => sum + (a.checked ? a.count * a.price : 0), 0)

  useEffect(() => {
    if (data) {
      const night = date?.to && date?.from ? (date.to.getTime() - date.from.getTime()) / (1000 * 60 * 60 * 24) : 1
      setPrice(data?.cost * night + children * (data?.cost / 2) + totalRoom + totalAddon)
    }
  }, [adults, children, data, totalRoom, totalAddon, date])

  const handleClearDate = () => {
    setDate(undefined)
  }

  const handleAddonCheck = (idx: number) => {
    setAddons((prev) =>
      prev.map((addon, i) => (i === idx ? { ...addon, checked: !addon.checked, count: !addon.checked ? 1 : 0 } : addon))
    )
  }

  const handleAddonCount = (idx: number, delta: number) => {
    setAddons((prev) =>
      prev.map((addon, i) =>
        i === idx
          ? {
              ...addon,
              count: Math.max(0, addon.count + delta) > adults ? adults : Math.max(0, addon.count + delta),
              checked: addon.count + delta > 0
            }
          : addon
      )
    )
  }

  const handleSubmitForm = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    if (!date) return toastConfig.error(t('from_price.errorDate'))

    const { from, to } = date

    if (adults > getMaxNumber())
      return toastConfig.error(t('from_price.errorRoom.heading'), t('from_price.errorRoom.desc'))

    if (from && to) {
      const timeCheckin = (to.getTime() - from.getTime()) / (1000 * 60 * 60 * 24)

      if (timeCheckin < 1) return toastConfig.error(t('from_price.errorDate2'))

      setOrderRoom({
        name: data?.name || '',
        cost: data?.cost || 0,
        total: price,
        location: data?.location || '',
        from,
        to,
        adults,
        children,
        rooms: rooms.reduce<Array<{ name: string; id: number; cost: number; quantity: number }>>(
          (arr, item) =>
            item.count > 0
              ? [
                  ...arr,
                  {
                    name: item.name,
                    id: item.id,
                    cost: item.price,
                    quantity: item.count
                  }
                ]
              : arr,
          []
        ),
        adds: addons.reduce<Array<{ name: string; cost: number; quantity: number }>>(
          (acc, cur) =>
            cur.checked && cur.count > 0 ? [...acc, { name: cur.name, cost: cur.price, quantity: cur.count }] : acc,
          []
        )
      })

      nav('/checkout/hotel')
    }
  }

  return (
    <>
      <form className={cn('grid gap-2')}>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              id='date'
              variant={'outline'}
              className={cn(
                'w-full justify-start text-left font-normal py-7 px-3 rounded-none mb-5',
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
                <span>{t('from_price.placeholder')}</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className='w-auto p-0' align='start'>
            <DayPicker
              initialFocus
              mode='range'
              defaultMonth={date?.from}
              selected={date || undefined}
              showOutsideDays={true}
              onSelect={setDate}
              numberOfMonths={2}
              disabled={{ before: new Date() }}
              locale={language === 'vi' ? vi : undefined}
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
              <Label htmlFor='adults'>{t('from_price.adult')}</Label>
              <Input
                id='adults'
                type='number'
                min={1}
                value={adults}
                onChange={(e) => {
                  setAdults(parseInt(e.target.value) || 1)
                  setAddons((prev) =>
                    prev.map((a) => {
                      if (a.count > Number(e.target.value)) {
                        return {
                          ...a,
                          checked: Number(e.target.value) > 0,
                          count: Number(e.target.value)
                        }
                      }
                      return a
                    })
                  )
                }}
                className='w-20 text-center'
              />
            </div>
            <div className='flex justify-between items-center'>
              <Label htmlFor='children'>{t('from_price.child')} </Label>
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
      </form>

      {rooms &&
        rooms.map((room) => (
          <div
            key={room.name}
            className={`items-center justify-between grid grid-cols-[2fr_2fr_1fr] my-5 ${
              !room.isAvailable && 'line-through opacity-50'
            }`}
          >
            <span className='font-semibold min-w-[120px]'>{room.name}</span>
            <div className='flex items-center gap-2'>
              <button
                className='bg-[#E4E4E4] dark:bg-background text-xl rounded-full px-2 font-semibold cursor-pointer select-none'
                onClick={() => decrementRoom(room.name)}
                type='button'
                disabled={room.count === 0 || !room.isAvailable}
              >
                -
              </button>
              <span className='mx-2'>{room.count}</span>
              <button
                className='bg-[#E4E4E4] dark:bg-background text-xl rounded-full px-2 font-semibold cursor-pointer select-none'
                onClick={() => incrementRoom(room.name)}
                type='button'
                disabled={!room.isAvailable}
              >
                +
              </button>
            </div>
            <span className='font-bold text-[#04316A] dark:text-[#FFB573] justify-self-end'>
              ${room.price_discount.toFixed(2)}
            </span>
          </div>
        ))}

      <hr className='my-3' />

      <div>
        <h3 className='font-semibold mb-2'>{t('from_price.add')}</h3>
        {addons.map((addon, idx) => (
          <div key={addon.name} className='grid grid-cols-[2fr_2fr_1fr] my-2'>
            <div className='flex items-center'>
              <Checkbox
                checked={addon.checked}
                onCheckedChange={() => handleAddonCheck(idx)}
                className='data-[state=checked]:bg-[#04316A] data-[state=checked]:border-none mr-2'
                id={`addon-${idx}`}
              />
              <label htmlFor={`addon-${idx}`} className='font-bold select-none cursor-pointer'>
                {addon.name}
              </label>
            </div>
            <div className='flex items-center gap-2'>
              <button
                className='bg-[#E4E4E4] dark:bg-background text-xl rounded-full px-2 font-semibold cursor-pointer select-none'
                onClick={() => handleAddonCount(idx, -1)}
                type='button'
                disabled={!addon.checked || addon.count === 0}
              >
                -
              </button>
              <span className='mx-2'>{addon.count}</span>
              <button
                className='bg-[#E4E4E4] dark:bg-background text-xl rounded-full px-2 font-semibold cursor-pointer select-none'
                onClick={() => {
                  handleAddonCount(idx, 1)
                }}
                type='button'
              >
                +
              </button>
            </div>
            <span className='font-bold text-[#04316A] dark:text-[#FFB573] justify-self-end'>
              {addon.checked && addon.count > 0 ? `$${(addon.price * addon.count).toFixed(2)}` : '0'}
            </span>
          </div>
        ))}
      </div>

      <hr className='my-3' />

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

export default React.memo(FormPriceHotel)
