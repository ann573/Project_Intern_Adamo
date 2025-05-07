import { auth } from '@/utils/firebase'
import Input from '@components/Input'
import { zodResolver } from '@hookform/resolvers/zod'
import { emailSchema } from '@schema/authSchema'
import { sendPasswordResetEmail } from 'firebase/auth'
import React from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { ClipLoader } from 'react-spinners'
import { toast } from 'sonner'

const EmailForgotForm = () => {
  const { t } = useTranslation('auth')
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(emailSchema)
  })

  const [isLoading, setIsLoading] = React.useState(false)
  type FormData = {
    email: string
  }
  const onSubmit = async (data: FormData) => {
    try {
      setIsLoading(true)
      await sendPasswordResetEmail(auth, data.email)
      setIsLoading(false)

      toast.success(t('email.successMessage'), {
        duration: 1500,
        style: {
          background: 'green',
          color: '#fff'
        }
      })
    } catch (error) {
      setIsLoading(false)
      toast.error((error as Error).message)
    }
  }

  return (
    <div className='form_auth'>
      <form onSubmit={handleSubmit(onSubmit)} className='md:w-md w-full max-w-md mx-auto p-4'>
        <h1 className='text-heading sm:text-4xl text-3xl font-semibold'>{t('email.forgotPasswordTitle')}</h1>
        <p className='mb-10 mt-5'>{t('email.forgotPasswordDescription')}</p>

        <Input name='email' register={register} required label={t('email.emailLabel')} type='text' errors={errors} />

        <button
          type='submit'
          className='w-full bg-orange text-white h-15 py-4 mt-4 font-semibold cursor-pointer transition-colors hover:bg-orange/80'
        >
          {isLoading ? <ClipLoader size={20} color='#fff' /> : t('email.sendRequestButton')}
        </button>
        <Link
          to={'/auth/login'}
          className='inline-block text-center relative overflow-hidden group w-full border  border-orange text-orange py-4 mt-4 font-semibold cursor-pointer'
        >
          {t('email.backToSignIn')}
          <span className='absolute left-0 top-0 w-full h-full bg-gradient-to-r from-orange/30 to-orange/80 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500'></span>
        </Link>

        <p className='text-sub-color-primary mt-5'>
          {t('email.noAccount')}{' '}
          <Link to='/auth/register' className='text-orange'>
            {t('email.signUp')}
          </Link>
        </p>
      </form>
    </div>
  )
}

export default EmailForgotForm
