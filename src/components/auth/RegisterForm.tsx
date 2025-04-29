import React from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { ClipLoader } from 'react-spinners'
// assets
import fbAuth from '@assets/icons/fb_auth.svg'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'

// zod
import { registerSchema } from '@/schema/authSchema'
import { zodResolver } from '@hookform/resolvers/zod'

import Input from '@components/Input'
import { toast } from 'sonner'

import { auth } from '@/utils/firebase'
import { useTranslation } from 'react-i18next'

const RegisterForm = () => {
  const { t } = useTranslation('auth')
  const [isLoading, setIsLoading] = React.useState(false)
  const nav = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(registerSchema)
  })

  type FormData = {
    email: string
    password: string
    f_name: string
    l_name: string
  }
  const onSubmit = async (data: FormData) => {
    try {
      setIsLoading(true)

      const { email, password, f_name, l_name } = data
      const userCredential = await createUserWithEmailAndPassword(auth, email, password)
      await updateProfile(userCredential.user, {
        displayName: `${f_name}${l_name}`
      })

      setIsLoading(false)
      toast.success('Resgister successfully', {
        style: {
          background: 'green',
          color: '#fff'
        }
      })

      nav('/auth/login')
    } catch (error) {
      setIsLoading(false)
      toast.error((error as Error).message, {
        description: `${t('register.register_email_in_use')}`,
        duration: 3000,
        action: {
          label: `${t('register.register_undo')}`,
          onClick: () => {}
        }
      })
    }
  }

  return (
    <>
      <div className='flex items-center md:static absolute w-11/12 bg-background top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 md:translate-y-0 md:translate-x-0 rounded-3xl p-3'>
        <form onSubmit={handleSubmit(onSubmit)} className='md:w-md w-full max-w-md mx-auto p-4'>
          <h1 className='text-heading text-4xl font-semibold'>{t('register.register_title')}</h1>
          <p className='mb-10 mt-5'> {t('register.register_welcome')}</p>

          <div className='grid grid-cols-2 gap-5 '>
            <Input
              name='f_name'
              register={register}
              required
              label={t('register.register_first_name')}
              type='text'
              errors={errors}
            />
            <Input
              name='l_name'
              register={register}
              required
              label={t('register.register_last_name')}
              type='text'
              errors={errors}
            />
          </div>

          <Input
            name='email'
            register={register}
            required
            label={t('register.register_email')}
            type='email'
            errors={errors}
          />

          <Input name='password' register={register} required label='Password' type='password' errors={errors} />

          <button
            type='submit'
            className='w-full bg-orange text-white py-4 mt-4 font-semibold cursor-pointer transition-colors hover:bg-orange/80'
            disabled={isLoading}
          >
            {isLoading ? <ClipLoader color='#ffffff' size={20} /> : t('register.register_sign_up')}
          </button>
          <button
            type='button'
            className='w-full bg-[#4E86DB] text-white py-5 mt-4 font-semibold center gap-3 cursor-pointer transition-colors hover:bg-[#4E86DB]/80'
          >
            <img src={fbAuth} alt='logo_facebook' />
            {t('register.register_sign_in_facebook')}
          </button>

          <p className='text-sub-color-primary mt-5'>
            {t('register.register_member_already')}
            <Link to='/auth/login' className='text-orange'>
              {t('register.register_log_in')}
            </Link>
          </p>
        </form>
      </div>
    </>
  )
}

export default RegisterForm
