import { useHotels } from '@/hooks/hotels'
import { IHotel } from '@/interfaces/IHotel'
import CardSkeleton from '@components/CardSkeleton'
import FormSearchBanner from '@components/FormSearchBanner'
import Pagination from '@components/Pagination'
import CardHotel from '@components/hotel/CardHotel'
import FilterHotel from '@components/hotel/FilterHotel'
import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

import bannerHotel from '@assets/images/banner_hotel.png' // Đường dẫn tương đối từ file hiện tại
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@components/ui/select'
import { Trans, useTranslation } from 'react-i18next'

import '@/style/homepage.css'
const HotelPage = () => {
  const { t } = useTranslation('hotels')

  const [date, setDate] = useState<Date | undefined>()
  const [page, setPage] = useState(1)
  const [dataFilter, setDataFilter] = useState<IHotel[] | undefined>(undefined)
  const [desc, setDesc] = useState<string>()
  const { search } = useLocation()
  const params = new URLSearchParams(search)
  const minPrice = parseInt(params.get('minPrice') || '0', 10)
  const maxPrice = parseInt(params.get('maxPrice') || '9999', 10)
  const stars = params.get('stars') || ''
  const typeRoomParams =
    stars &&
    stars
      .split(',')
      .map((star) => `typeroom=${star}`)
      .join('&')
  const reviewScore = params.get('reviewScore') || ''
  const order = desc === '0' ? 'asc' : desc === '1' ? 'desc' : ''

  const queryString = `cost_gte=${minPrice}&cost_lte=${maxPrice}${
    typeRoomParams && `&${typeRoomParams}`
  }${order ? `&_sort=cost&_order=${order}` : ''}`

  const { data, isLoading } = useHotels(page, 9, queryString)
  const [filteredCount, setFilteredCount] = useState<number>(0)

  useEffect(() => {
    if (search) {
      const dataFilter =
        data &&
        data.filter((item) => {
          let isReviewScoreValid = true

          if (reviewScore) {
            const averageRating =
              item.description.reviews.reduce((sum, review) => sum + review.rating, 0) / item.description.reviews.length

            isReviewScoreValid = averageRating > parseFloat(reviewScore)
          }

          return isReviewScoreValid
        })

      setDataFilter(dataFilter)
      setFilteredCount(dataFilter?.length || 0)
    } else {
      setDataFilter(data && data)
      setFilteredCount(Number(20))
    }
  }, [data, reviewScore, search, stars])

  useEffect(() => {
    window.scrollTo({ top: 550, behavior: 'smooth' })
  }, [page])
  return (
    <>
      <section
        className=' text-center grid sm:grid-cols-12 grid-col-2 xl:gap-0 gap-5  max-w-[2000px] mx-auto xl:px-0 px-10 banner_hotel'
        style={{ backgroundImage: `url(${bannerHotel})` }}
      >
        <div className='lg:col-span-7 sm:col-span-5 flex flex-col justify-end '>
          <div className='my-auto xl:pl-40 sm:block hidden'>
            <p className='text-[#FFF2CF] text-left'>{t('banner.sub_head')}</p>
            <h1 className=' text-[#ffffff] font-medium xl:text-6xl text-3xl top-1/2 mt-5 text-left'>
              <Trans ns={'hotels'} i18nKey={'banner.head'}>
                From cozy country <br className='md:block hidden' /> homes to funky city{' '}
                <br className='lg:block hidden' /> apartments
              </Trans>
            </h1>
          </div>

          <div className='w-full h-20 bg-white dark:bg-background pb-5 pt-10 relative xl:block hidden'></div>
        </div>

        {/* ================= second col ================= */}
        <div className='lg:col-span-5 sm:col-span-7 self-end lg:justify-self-start w-full'>
          <FormSearchBanner date={date} setDate={setDate} />
        </div>
      </section>

      <div className='max-w-[1200px] mx-auto my-5 text-content xl:px-0 px-10'>
        <p className='flex justify-start gap-5'>
          <Link to={'/'} className='hover:underline'>
            {t('breadCum.home')}
          </Link>
          <span className='text-[#C4C4C4] text-lg'>•</span>
          <Link to={'/hotels'} className='hover:underline'>
            {t('breadCum.hotel')}
          </Link>
        </p>
      </div>

      <section className='max-w-[1200px] mx-auto my-5'>
        <div className='justify-between flex flex-wrap gap-y-3 items-center relative xl:px-0 px-10'>
          <h2 className='text-heading md:text-[40px] text-2xl font-medium w-fit'>{t('heading')}</h2>
          <div className='flex items-center xl:gap-20 gap-10 justify-between w-full sm:w-fit'>
            <div className='center sm:gap-5 gap-1'>
              <span>{t('sortBy')}</span>
              <Select
                value={desc}
                onValueChange={(value) => {
                  setDesc(value)
                  setPage(1)
                }}
              >
                <SelectTrigger className='w-[130px] border-none shadow-none focus-visible:border-none py-0'>
                  <SelectValue placeholder={t('price')} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='2' className='cursor-pointer'>
                    {t('option.default')}
                  </SelectItem>
                  <SelectItem value='0' className='cursor-pointer'>
                    {t('option.lowToHigh')}
                  </SelectItem>
                  <SelectItem value='1' className='cursor-pointer'>
                    {t('option.highToLow')}
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            <FilterHotel />
          </div>
        </div>
      </section>

      <section className='max-w-[1200px] mx-auto xl:px-0 sm:px-5 px-7'>
        {isLoading ? (
          <CardSkeleton />
        ) : dataFilter && dataFilter.length > 0 ? (
          <div className='grid xl:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-10'>
            {dataFilter.map((item) => (
              <CardHotel data={item} key={item.id} />
            ))}
          </div>
        ) : (
          <div className='flex flex-col gap-3'>
            <p className='text-center mt-5 text-3xl font-bold text-red-500'>{t('result')}</p>
            <Link
              className=' text-center text-sub-color-primary underline hover:text-[#3e3e3e] cursor-pointer mb-20'
              onClick={() => {}}
              to={'/hotels'}
            >
              {t('return')}
            </Link>
          </div>
        )}

        {dataFilter && dataFilter.length > 0 && <Pagination page={page} setPage={setPage} total={filteredCount} />}
      </section>
    </>
  )
}

export default HotelPage
