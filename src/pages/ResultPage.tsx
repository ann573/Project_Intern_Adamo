import { getTours } from '@/features/tour/tourAction'
import { useAppDispatch, useAppSelector } from '@/hooks/app'
import { useHotels } from '@/hooks/hotels'
import CardSkeleton from '@components/CardSkeleton'
import CardHotel from '@components/hotel/CardHotel'
import Card from '@components/listTour/Card'
import Pagination from '@components/Pagination'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link, useLocation } from 'react-router-dom'

const ResultPage = () => {
  const location = useLocation()
  const { t } = useTranslation('result')
  const isTour = useLocation().pathname.includes('tour')
  const { data: hotels, isLoading: isLoadingHotel } = useHotels(
    1,
    9,
    location.search.split('?')[1] || '', // query
    !isTour
  )

  const { tours, isLoading, total } = useAppSelector((state) => state.tours)

  const [page, setPage] = useState(1)

  const dispatch = useAppDispatch()

  useEffect(() => {
    if (isTour) {
      dispatch(getTours({ page, request: location.search.split('?')[1] }))
    }
    window.scrollTo({ top: 550, behavior: 'smooth' })
  }, [dispatch, location.search, page, isTour])

  return (
    <main>
      {/* Banner */}
      <div className='text-center grid grid-cols-12 banner_tour max-w-[2000px] mx-auto'></div>

      <section className='max-w-[1200px] mx-auto my-5 xl:px-0 px-10'>
        <p className='flex justify-start gap-5'>
          <Link to={'/'} className='hover:underline'>
            {t('home')}
          </Link>
          <span className='text-[#C4C4C4] text-lg'>•</span>
          {t('result')}
        </p>
      </section>

      {isTour ? (
        tours && (
          <>
            <section className='max-w-[1200px] mx-auto xl:px-0 sm:px-5 px-7'>
              {isLoading ? (
                <CardSkeleton />
              ) : tours?.length > 0 ? (
                <>
                  <div className='grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-10 my-5'>
                    {tours.map((item) => (
                      <Card data={item} key={item.id} />
                    ))}
                  </div>
                </>
              ) : (
                <div className='flex flex-col gap-3'>
                  <p className='text-center mt-5 text-3xl font-bold text-red-500'>{t('heading_fail')}</p>
                  <Link
                    className=' text-center text-sub-color-primary underline hover:text-[#3e3e3e] cursor-pointer mb-20'
                    to={'/'}
                  >
                    {t('return_home')}
                  </Link>
                </div>
              )}

              {tours?.length > 0 && <Pagination page={page} setPage={setPage} total={total} />}
            </section>
          </>
        )
      ) : (
        <section className='max-w-[1200px] mx-auto xl:px-0 sm:px-5 px-7'>
          {isLoadingHotel ? (
            <CardSkeleton />
          ) : hotels && hotels?.length > 0 ? (
            <>
              <div className='grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-10 my-10'>
                {hotels.map((hotel) => (
                  <CardHotel data={hotel} key={hotel.id} />
                ))}
              </div>
            </>
          ) : (
            <div className='flex flex-col gap-3'>
              <p className='text-center mt-5 text-3xl my-5 font-bold text-red-500'>{t('heading_fail')}</p>
              <Link
                className=' text-center text-sub-color-primary underline hover:text-[#3e3e3e] cursor-pointer mb-20'
                to={'/'}
              >
                {t('return_home')}
              </Link>
            </div>
          )}
        </section>
      )}
    </main>
  )
}

export default ResultPage
