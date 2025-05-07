import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { Link, useNavigate } from 'react-router-dom'

import { ContactFormData, contactSchema } from '@/schema/contactSchema'
import { instance } from '@/service'
import { useAuthStore } from '@/zusTand/authStore'
import hero from '@assets/images/hero_1.png'
import { Button } from '@components/ui/button'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'

import '@/style/homepage.css'
import { StyledInput, StyledTextArea } from '@components/styled/StyledInput'

const ContactPage = () => {
  const { t } = useTranslation('contact')
  const nav = useNavigate()
  const { user } = useAuthStore()
  const contactItems = [
    {
      icon: 'ri-home-4-line',
      title: t('address_title'),
      content: t('address_content')
    },
    {
      icon: 'ri-phone-line',
      title: t('phone_title'),
      content: t('phone_content')
    },
    {
      icon: 'ri-mail-line',
      title: t('email_title'),
      content: t('email_content')
    }
  ]
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: user?.name || '',
      email: user?.email || '',
      telephone: ''
    }
  })

  const handleSubmitForm = async (data: ContactFormData) => {
    try {
      await instance.post('/contact', data)
      toast.success(t('success_message'), {
        style: {
          background: 'green',
          color: 'white'
        },
        description: t('success_description')
      })
      reset()
      nav('/')
    } catch (error) {
      toast.error((error as Error).message, {
        style: {
          background: 'red',
          color: 'white'
        }
      })
    }
  }

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  return (
    <>
      <section className='banner_contact '>
        <div className='flex h-full items-center justify-start max-w-[1200px] mx-auto'>
          <h1 className='font-semibold text-white text-5xl pl-5 xl:pl-0'>{t('banner_title')}</h1>
        </div>
      </section>

      <section className='max-w-[1200px] mx-auto my-5 xl:px-0 px-10'>
        <p className='flex justify-start gap-5'>
          <Link to={'/'} className='hover:underline'>
            {t('breadcrumb_home')}
          </Link>
          <span className='text-[#C4C4C4] text-lg'>•</span>
          {t('breadcrumb_contact')}
        </p>
      </section>

      <section className='max-w-[1200px] mx-auto grid lg:grid-cols-2 xl:gap-20 gap-10 mt-10 my-20 xl:px-0 px-5 '>
        <form onSubmit={handleSubmit(handleSubmitForm)} data-aos='fade-right'>
          <h2 className='font-bold text-4xl'>{t('form_title')}</h2>
          <p className='mt-5 mb-10'>{t('form_description')}</p>

          <div className='flex flex-col gap-5'>
            <div>
              <StyledInput type='name' placeholder={t('placeholder_name')} {...register('name')} />
              {errors.name && <p className='text-red-500 italic'>{t(errors.name.message as keyof ContactFormData)}</p>}
            </div>

            <div>
              <StyledInput placeholder={t('placeholder_email')} {...register('email')} />
              {errors.email && (
                <p className='text-red-500 italic'>{t(errors.email.message as keyof ContactFormData)}</p>
              )}
            </div>

            <div>
              <StyledInput placeholder={t('placeholder_phone')} {...register('telephone')} />
              {errors.telephone && (
                <p className='text-red-500 italic'>{t(errors.telephone.message as keyof ContactFormData)}</p>
              )}
            </div>

            <div>
              <StyledTextArea
                placeholder={t('placeholder_message')}
                className='resize-none bg-[#F5F5F5] dark:bg-[#1C2526] p-3 focus:outline-none w-full'
                rows={5}
                {...register('message')}
              ></StyledTextArea>
              {errors.message && (
                <p className='text-red-500 italic'>{t(errors.message.message as keyof ContactFormData)}</p>
              )}
            </div>

            <Button className='w-fit rounded-none py-5 px-10 ml-auto cursor-pointer'>{t('button_send')}</Button>
          </div>
        </form>

        {/* ================================ Second Col========================================= */}
        <div className='relative' data-aos='fade-left'>
          <img src={hero} className='w-full' alt='hero' />

          <div className='absolute bg-[#1c1c1e]  p-5 bottom-0 left-0 sm:w-2/3 w-11/12'>
            <h3 className='text-white text-3xl mb-5'>{t('office_title')}</h3>

            <div>
              {contactItems.map((item, index) => (
                <div key={index} className='flex gap-5 mb-5 last:mb-0'>
                  <div className='max-h-[50px] bg-primary rounded-full center'>
                    <i className={`${item.icon} text-white  text-2xl px-3 center  `}></i>
                  </div>
                  <div>
                    <h4 className='text-primary font-bold'>{item.title}</h4>
                    <p className='text-white text-sm'>{item.content}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default ContactPage
