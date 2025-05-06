import { useInfiniteHotels } from '@/hooks/hotels'
import CardSkeleton from '@components/CardSkeleton'
import FormSearchBanner from '@components/FormSearchBanner'

import CardHotel from '@components/hotel/CardHotel'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import bannerHotel from '@assets/images/banner_hotel.png' // Đường dẫn tương đối từ file hiện tại
import { Trans, useTranslation } from 'react-i18next'

import '@/style/homepage.css'
import { useInView } from 'react-intersection-observer'
const HotelPageInfinity = () => {
  const { t } = useTranslation('hotels')

  const [date, setDate] = useState<Date | undefined>()

  const { data, fetchNextPage, hasNextPage, isLoading } = useInfiniteHotels()

  const hotel = data?.pages.flatMap((page) => page.hotels) || []
  const { ref, inView } = useInView()

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage()
    }
  }, [inView, hasNextPage, fetchNextPage])
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

      {/* Infinity Scroll */}
      <section className='max-w-[1200px] mx-auto xl:px-0 sm:px-5 px-7'>
        {isLoading ? (
          <CardSkeleton />
        ) : hotel && hotel.length > 0 ? (
          <div className='grid xl:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-10'>
            {hotel.map((item) => {
              return <CardHotel data={item} key={item.id} />
            })}
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
      </section>

      <div className='my-5 text-center text-3xl' ref={ref}>
        {hasNextPage ? 'Đang tải đợi một tí' : ' '}
      </div>
    </>
  )
}

export default HotelPageInfinity
