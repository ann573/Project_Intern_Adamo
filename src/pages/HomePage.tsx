import Slider from '@components/SliderComponent'
import { zodResolver } from '@hookform/resolvers/zod'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'

//asset
import '@/style/homepage.css'

// data
import dataExperience from '@/data/experience'
import experienceCul from '@/data/experienceCul'
import data from '@/data/rcm'

// component
import FormSearchBanner from '@components/FormSearchBanner'
import Hero from '@components/Hero'

// shadCnUI
import { Button } from '@components/ui/button'
import { Input } from '@components/ui/input'

// schema
import { emailSchema } from '@/schema/homePage'
import { instance } from '@/service'
import { useTranslation } from 'react-i18next'
import { toast } from 'sonner'

const HomePage = () => {
  const [date, setDate] = React.useState<Date | undefined>(undefined)
  const { t } = useTranslation()
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({
    resolver: zodResolver(emailSchema)
  })

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  const onSubmitEmail = async ({ email }: { email: string }) => {
    try {
      await instance.post('/emails', { email })
      toast.success('Register successfully', {
        description: 'We will send you an email to verify your account',
        style: {
          background: 'green',
          color: '#fff'
        }
      })

      reset()
    } catch (error) {
      toast.error('Have an error, please try again!!!', {
        description: (error as Error).message
      })
    }
  }
  return (
    <>
      {/* Banner */}
      <div className='text-center grid grid-cols-12 banner max-w-[2000px] mx-auto'>
        {/* ================= first col ================= */}
        <div className='lg:col-span-7 col-span-12 flex flex-col justify-end'>
          <div className='my-auto mx-auto text-left px-5 lg:px-0'>
            <p className='text-[#FFF2CF]'>{t('hero.welcome')}</p>
            <h1 className=' text-[#ffffff] font-medium text-6xl top-1/2 mt-5'>
              {t('hero.title1')} <br className='lg:block hidden' /> {t('hero.title2')}
            </h1>
          </div>

          <div className='w-full bg-white dark:bg-background pb-5 pt-10 relative'>
            <div className='flex md:gap-10 gap-5 max-w-fit mx-auto'>
              <div className='relative lg:px-0 px-5 '>
                <div className='center gap-2 absolute md:-top-2/3 -top-1/2'>
                  <i className='ri-circle-fill text-[#FF7B42] text-[10px]'></i>
                  <span className='text-sm'>{t('banner.featured')}</span>
                </div>
                <p className='center text-sub-color-primary gap-2 flex lg:flex-row flex-col items-center justify-center'>
                  <span className='text-heading lg:text-3xl font-bold text-xl'>200+</span> {t('banner.tours')}
                </p>
              </div>

              <p className='center text-sub-color-primary gap-2 flex lg:flex-row  flex-col items-center justify-center'>
                <span className='text-heading lg:text-3xl font-bold text-xl'>100+</span> {t('banner.destination')}
              </p>
              <p className='center text-sub-color-primary gap-2 flex lg:flex-row  flex-col items-center justify-center'>
                <span className='text-heading lg:text-3xl font-bold text-xl'>8+</span> {t('banner.type_of_tour')}
              </p>
            </div>
          </div>
        </div>

        {/* ================= second col ================= */}
        <div className='col-span-5 self-end justify-self-start lg:block hidden'>
          <FormSearchBanner date={date} setDate={setDate} />
        </div>
      </div>

      {/* =============================== */}
      <Hero />
      {/* =============================== recomended ===============================*/}
      <section className='relative mb-30' data-aos='fade-up'>
        <div className='flex justify-between items-center flex-wrap gap-5 max-w-[1200px] mx-auto mb-5 px-5 xl:px-0'>
          <h2 className='md:text-[40px] text-3xl xl:w-1/3 md:w-1/2 text-heading font-medium'>
            {t('recommended.title')}
          </h2>
          <Button variant={'ghost'}>
            <Link to='/tours'>{t('recommended.view_all')}</Link>
          </Button>
        </div>

        <div className='max-w-[1200px] mx-auto sm:px-10 xl:px-0'>
          <Slider data={data} show={4} isCard={false} />
        </div>
      </section>

      {/* =============================== experience tour =========================== */}
      <section className='relative my-30' data-aos='fade-up'>
        <div className='flex justify-between items-center flex-wrap gap-5 max-w-[1200px] mx-auto mb-5 px-5 xl:px-0'>
          <h2 className='md:text-[40px] text-3xl  md:w-1/2 text-heading font-medium'>
            {t('experience.title1')}
            <br className='lg:block hidden' /> {t('experience.title2')}
          </h2>
          <Button variant={'ghost'}>
            <Link to='/tours'>{t('recommended.view_all')}</Link>
          </Button>
        </div>

        <div className='max-w-[1200px] mx-auto sm:px-10 xl:px-0'>
          <Slider data={dataExperience} show={3} />
        </div>
      </section>

      {/* =============================== experience cultural =========================== */}
      <section className='relative my-15 max-w-[1500px] mx-auto' data-aos='fade-up'>
        <div className='flex justify-between items-center flex-wrap gap-5 max-w-[1200px] mx-auto mb-5 px-5 xl:px-0'>
          <h2 className='md:text-[40px] text-3xl  md:w-1/2 text-heading font-medium'>{t('culture.title')}</h2>
          <Button variant={'ghost'}>
            <Link to='/tours'>{t('recommended.view_all')}</Link>
          </Button>
        </div>

        <div className='max-w-[1200px] mx-auto sm:px-10 xl:px-0'>
          <Slider
            data={experienceCul.map((item) => ({
              ...item,
              duration: parseFloat(item.duration)
            }))}
            show={3}
          />
        </div>
      </section>

      {/* =============================== email ============================================= */}
      <section className='container_custom mx-auto xl:my-40 md:my-20 my-10 flex md:flex-row flex-col md:items-center items-start justify-between relative'>
        <h4 className='xl:text-5xl md:text-3xl text-2xl md:mb-0 mb-5' data-aos='fade-right'>
          {t('email.title1')} <br className='md:block hidden' /> {t('email.title2')}{' '}
          <span className='text-orange'>{t('email.title3')}</span>
        </h4>
        <div className='xl:w-1/3 md:w-1/2 w-full relative' data-aos='fade-left'>
          <form onSubmit={handleSubmit(onSubmitEmail)} className='flex gap-5'>
            <Input
              className={`rounded-none w-full py-5 px-10 ${
                errors.email && 'border-red-500 focus-visible:border-red-500 focus-visible:ring-red-200'
              }`}
              placeholder={t('email.placeholder')}
              {...register('email', { required: true })}
            />

            <Button variant={'ghost'} className={'py-5'} type='submit'>
              {t('email.send')}
            </Button>
          </form>
          {errors.email && <p className='text-red-500 italic pl-1 text-sm mt-1'>{errors.email.message}</p>}
          <i
            className={`ri-mail-line absolute  -translate-y-1/2 text-xl text-orange left-3 ${
              errors.email ? 'top-1/3' : 'top-1/2'
            }`}
          ></i>
        </div>
      </section>
    </>
  )
}

export default HomePage
