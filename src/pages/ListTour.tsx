import { useAppDispatch, useAppSelector } from '@/hooks/app'
import { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

//asset
import '@/style/homepage.css'

// shadCnUI
import { Button } from '@components/ui/button'
import { X } from 'lucide-react'
import { toast } from 'sonner'

import FormSearchBanner from '@/components/FormSearchBanner'
import Card from '@/components/listTour/Card'
import Filter from '@/components/listTour/Filter'
import Pagination from '@/components/Pagination'

// redux
import CardSkeleton from '@/components/CardSkeleton'
import { getFilterTour, getTours } from '@/features/tour/tourAction'
import { Trans, useTranslation } from 'react-i18next'

const ListTour = () => {
  const { t } = useTranslation('tours')
  const [date, setDate] = useState<Date | undefined>()
  const [page, setPage] = useState(1)

  const [click, setClick] = useState(false)
  const [rangeFilter, setRangeFilter] = useState([100, 1000])

  const [isSearch, setIsSearch] = useState(false)
  const [request, setRequest] = useState('')
  const { pathname } = useLocation()
  const listRef = useRef<HTMLInputElement>(null)

  const { tours, isLoading, total, type, range } = useAppSelector((state) => state.tours)
  const dispatch = useAppDispatch()

  const { search } = useLocation()
  useEffect(() => {
    const hasVisited = sessionStorage.getItem(`visited-${pathname}`)

    if (!hasVisited) {
      window.scrollTo({ top: 0, behavior: 'smooth' })
      sessionStorage.setItem(`visited-${pathname}`, 'true')
    } else {
      if (listRef.current) {
        listRef.current.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }, [page, pathname, request])

  useEffect(() => {
    setRequest(search.slice(1, search.length))
  }, [search, setRequest])

  useEffect(() => {
    const fetchTour = async () => {
      try {
        dispatch(getTours({ page, request }))
        dispatch(getFilterTour())

        if (!isSearch) {
          setRangeFilter(() => [0, range[1]])
        } else {
          setClick(false)
        }
      } catch (error) {
        toast.error('Failed to fetch tours:', {
          duration: 3000,
          description: (error as Error).message,
          action: {
            label: 'Undo',
            onClick: () => {
              return
            }
          }
        })
        return
      }
    }

    fetchTour()
  }, [page, isSearch, request, dispatch, range])

  return (
    <>
      {/* Banner */}
      <section className='text-center grid sm:grid-cols-12 grid-col-2 xl:gap-0 gap-5 banner_tour max-w-[2000px] mx-auto xl:px-0 px-10'>
        {/* ================= first col ================= */}
        <div className='lg:col-span-7 sm:col-span-5 flex flex-col justify-end '>
          <div className='my-auto xl:pl-40 sm:block hidden'>
            <p className='text-[#FFF2CF] text-left'>{t('banner.desc')}</p>
            <h1 className=' text-[#ffffff] font-medium xl:text-6xl text-3xl top-1/2 mt-5 text-left'>
              <Trans i18nKey='banner.heading' ns={'tours'}>
                Attractive tour and <br className='md:block hidden' />
                interesting <br className='lg:block hidden' /> experiences
              </Trans>
            </h1>
          </div>

          <div className='w-full h-20 bg-white dark:bg-background pb-5 pt-10 relative xl:block hidden'></div>
        </div>

        {/* ================= second col ================= */}
        <div className='sm:col-span-5 self-end justify-self-start w-full'>
          <FormSearchBanner date={date} setDate={setDate} />
        </div>
      </section>

      {/* navigation */}
      <section className='max-w-[1200px] mx-auto my-5 text-content xl:px-0 px-10'>
        <p className='flex justify-start gap-5'>
          <Link to={'/'} className='hover:underline'>
            {t('bread.home')}
          </Link>
          <span className='text-[#C4C4C4] text-lg'>•</span>
          <Link to={'/tours'} className='hover:underline'>
            {t('bread.tours')}
          </Link>
        </p>
      </section>

      {/* ================== List ====================== */}
      <section className='max-w-[1200px] mx-auto my-5' ref={listRef}>
        <div className='flex justify-between items-center relative xl:px-0 px-10'>
          <h2 className='text-heading md:text-[40px] text-2xl font-medium'>
            <Trans i18nKey='heading' ns={'tours'}>
              Attractive tour and interesting <br /> experiences
            </Trans>
          </h2>
          <Button
            variant={'ghost'}
            className={`transition-all cursor-pointer ${click ? 'w-25 justify-between text-black bg-white' : 'w-fit'}`}
            onClick={() => setClick((prev) => !prev)}
          >
            {t('filter.button')}
            <X className={`w-5 h-5 ${click ? 'block' : 'hidden'}`} />
          </Button>

          {click && (
            <Filter
              range={rangeFilter}
              setRangeFilter={setRangeFilter}
              uniqueTypes={type}
              setIsSearch={setIsSearch}
              setRequest={setRequest}
              setPage={setPage}
            />
          )}
        </div>
      </section>

      <section className='max-w-[1200px] mx-auto xl:px-0 sm:px-5 px-7'>
        {isLoading ? (
          <CardSkeleton />
        ) : tours?.length > 0 ? (
          <div className='grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-10'>
            {tours.map((item) => (
              <Card data={item} key={item.id} />
            ))}
          </div>
        ) : (
          <div className='flex flex-col gap-3'>
            <p className='text-center mt-5 text-3xl font-bold text-red-500'>{t('result')}</p>
            <Link
              className=' text-center text-sub-color-primary underline hover:text-[#3e3e3e] cursor-pointer mb-20'
              onClick={() => {
                setIsSearch(false)
              }}
              to={'/tours'}
            >
              {t('return')}
            </Link>
          </div>
        )}

        {tours?.length > 0 && <Pagination page={page} setPage={setPage} total={total} />}
      </section>
    </>
  )
}

export default ListTour
