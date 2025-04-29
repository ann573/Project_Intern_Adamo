import Pagination from '@/components/Pagination'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from '@/components/ui/alert-dialog'
import { addCommentTour } from '@/features/tour/tourAction'
import { useAppDispatch, useAppSelector } from '@/hooks/app'
import { useAuthStore } from '@/zusTand/authStore'
import { Button } from '@components/ui/button'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Trans, useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { toast } from 'sonner'
import ReviewItem from './ReviewItem'
import StarRating from './StarRating'

const Reviews = () => {
  const { t } = useTranslation('tour')
  const { tour } = useAppSelector((state) => state.tours)
  const [page, setPage] = useState(1)
  const [rating, setRating] = useState(0)
  const { user } = useAuthStore()
  const dispatch = useAppDispatch()
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<{ comments: string }>()

  const rateCount: Record<string, number> = {}
  let totalRating = 0

  if (tour) {
    totalRating = tour?.rating.reduce((acc, cur) => acc + cur.rate, 0) / tour?.rating.length

    for (const review of tour?.rating || []) {
      const rate = review.rate.toString()
      rateCount[rate] = (rateCount[rate] || 0) + 1
    }
  }

  const count = tour?.rating.length

  const handleSubmitReview = ({ comments }: { comments: string }) => {
    if (rating === 0) {
      toast.error('Please fill the star', {
        duration: 1000,
        style: {
          background: 'red',
          color: 'white'
        }
      })
      return
    }
    if (tour) {
      const day = new Date()

      const dataBody = {
        title: user?.name || '',
        rate: rating,
        heading: 'The best experience ever!',
        time: Math.floor(day.getTime() / 1000),
        avatar: 'https://kenh14cdn.com/cPLqMkXoPs3Tkua5x0JnElZd2udVtV/Image/2015/03/updates/150330dep03-7ef68.jpg',
        comments
      }
      const dataPatch = {
        ...tour,
        rating: [dataBody, ...(tour?.rating || [])]
      }

      dispatch(addCommentTour(dataPatch))

      reset()
      setRating(0)
    }
  }
  return (
    <>
      <section className='bg-secondary grid sm:grid-cols-5 grid-cols-1 items-center md:gap-5 xs:gap-2 gap-y-5 my-10 rounded-2xl py-8 px-2 xs:px-0'>
        {/* ==================== first col ============================== */}
        <div className='center flex-col gap-5 col-span-2 px-5 sm:border-r border-none mx-auto'>
          <h2 className='text-heading-second text-5xl font-bold'>{totalRating.toFixed(1)}/5</h2>
          <div className='flex gap-1 md:gap-3'>
            {Array.from({ length: 5 }).map((_, index) => (
              <span key={index} className='text-heading-second text-3xl font-bold'>
                <i
                  className={`ri-star-fill ${totalRating && index < totalRating ? 'text-[#FFB13C]' : 'text-[#888888]'}`}
                ></i>
              </span>
            ))}
          </div>
          <p className='text-center'>
            <Trans i18nKey={'rev.base'} ns='tour' count={count}>
              Based on
              <span className='text-[#2d2c2c] dark:text-white font-bold'>{count} reviews</span>
            </Trans>
          </p>
        </div>

        {/* ==================== second col ============================== */}
        <div className='col-span-3 md:px-5 sm:pr-2 flex flex-col-reverse gap-y-3'>
          {Array.from({ length: 5 }).map((_, index) => {
            const width = tour && `${(rateCount[index + 1] / tour?.rating.length || 0) * 100}%`
            return (
              <div className='center sm:gap-5 gap-2' key={index}>
                <div className='flex items-center gap-2'>
                  <span className='w-4 text-right font-semibold text-lg'>{index + 1}</span>
                  <svg className='w-4 h-4 text-[#C4C4C4]' fill='currentColor' viewBox='0 0 20 20'>
                    <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.966a1 1 0 00.95.69h4.175c.969 0 1.371 1.24.588 1.81l-3.38 2.455a1 1 0 00-.364 1.118l1.287 3.965c.3.922-.755 1.688-1.538 1.118l-3.38-2.455a1 1 0 00-1.176 0l-3.38 2.455c-.782.57-1.837-.196-1.538-1.118l1.287-3.965a1 1 0 00-.364-1.118L2.05 9.393c-.783-.57-.38-1.81.588-1.81h4.175a1 1 0 00.95-.69l1.286-3.966z' />
                  </svg>
                </div>
                <div className='sm:w-1/2 w-1/3 h-2 bg-[#E5E5E5] rounded-4xl relative'>
                  <div className={`h-2 bg-[#FFB13C] rounded-4xl`} style={{ width: width || '0%' }}></div>
                </div>
                <p className='flex gap-2 justify-end text-right'>
                  <span className='md:min-w-5 min-w-3'>{rateCount[index + 1] || 0}</span> {t('rev.reviews')}
                </p>
              </div>
            )
          })}
        </div>
      </section>

      <hr />

      <div className='my-10 px-5 '>
        <StarRating rating={rating} setRating={setRating} />
        <form onSubmit={handleSubmit(handleSubmitReview)}>
          <div className='flex md:gap-7 gap-3'>
            <img
              src='https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_640.png'
              className='max-w-20 md:w-20 w-15 h-fit rounded-full'
            />
            <div className='w-full'>
              <textarea
                className={`resize-none w-full border md:p-5 p-3 focus:outline-none  ${
                  errors.comments
                    ? 'border-red-400 focus-visible:ring-red-500/50 focus-visible:ring-2 '
                    : 'focus-visible:ring-ring/50 focus-visible:ring-[3px]'
                }`}
                rows={5}
                {...register('comments', {
                  required: { value: true, message: 'Comments is required' }
                })}
              ></textarea>
              {errors.comments && typeof errors.comments.message === 'string' && (
                <p className='text-red-500 italic pl-3'>{errors.comments.message}</p>
              )}
            </div>
          </div>

          <div className='flex'>
            {user?.name ? (
              <Button className='md:px-10 py-5 rounded-none ml-auto mt-5 cursor-pointer'>Comment</Button>
            ) : (
              <AlertDialog>
                <AlertDialogTrigger className='md:px-9 py-3 rounded-none ml-auto mt-5 cursor-pointer bg-primary text-white font-medium'>
                  {t('rev.comment')}
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>{t('rev.warning')}</AlertDialogTitle>
                    <AlertDialogDescription>{t('rev.warning_content')}</AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>{t('rev.cancel')}</AlertDialogCancel>
                    <AlertDialogAction>
                      <Link to='/auth/login'>{t('rev.login')}</Link>
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            )}
          </div>
        </form>
      </div>

      <hr />

      <section>
        {tour &&
          tour?.rating.slice((page - 1) * 2, page * 2).map((item, index) => {
            return <ReviewItem key={index} data={item} />
          })}

        {tour && <Pagination page={page} setPage={setPage} limit={2} total={tour?.rating.length} />}
      </section>
    </>
  )
}

export default Reviews
