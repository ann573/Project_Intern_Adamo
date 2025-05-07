import { auth } from '@/utils/firebase'
import { confirmPasswordReset, signInWithEmailAndPassword } from 'firebase/auth'
import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Link, useLocation, useNavigate } from 'react-router-dom'

// assets
import fbAuth from '@assets/icons/fb_auth.svg'

import Input from '@components/Input'
import { ButtonAuth } from '@components/styled/Button'

// zod
import { LoginFormValues, loginSchema, ResetPasswordFormValues, resetPasswordSchema } from '@/schema/authSchema'
import { useAuthStore } from '@/zusTand/authStore'
import { zodResolver } from '@hookform/resolvers/zod'

import Cookies from 'js-cookie'
import { useTranslation } from 'react-i18next'
import { ClipLoader } from 'react-spinners'
import { toast } from 'sonner'

const LoginForm = () => {
  const { t } = useTranslation('auth')
  const nav = useNavigate()
  const [isLoading, setIsLoading] = React.useState(false)
  const { setUser } = useAuthStore()
  const { pathname, search } = useLocation()
  const isLogin = pathname.includes('login')

  // Separate useForm instances for each form type
  const loginForm = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema)
  })

  const resetPasswordForm = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(resetPasswordSchema)
  })

  const onSubmitLogin: SubmitHandler<LoginFormValues> = async (data) => {
    setIsLoading(true)
    try {
      const { email, password } = data
      const userCredential = await signInWithEmailAndPassword(auth, email, password)

      const idToken = await userCredential.user.getIdToken()

      Cookies.set('access_token', idToken)
      setUser({
        name: userCredential.user.displayName || '',
        email: userCredential.user.email || ''
      })
      Cookies.set('refresh_token', userCredential.user.refreshToken)

      setIsLoading(false)
      nav('/')
    } catch {
      setIsLoading(false)
      toast.error(t('login.loginFailed'), {
        description: t('login.loginFailedDesc'),
        actionButtonStyle: {
          background: 'white',
          color: 'red'
        },
        action: {
          label: t('login.undo'),
          onClick: () => {}
        },
        duration: 3000,
        style: {
          background: 'red',
          color: 'white'
        }
      })
    }
  }

  const onSubmitForgotPassword: SubmitHandler<ResetPasswordFormValues> = async (data) => {
    try {
      setIsLoading(true)
      const code = search.split('=')[2].split('&')[0]
      await confirmPasswordReset(auth, code, data.password)

      setIsLoading(false)
      toast.success(t('login.resetPasswordSuccess'), {
        duration: 1000,
        style: {
          background: 'green',
          color: '#fff'
        }
      })

      resetPasswordForm.reset()
      nav('/auth/login')
    } catch {
      setIsLoading(false)
      toast.error(t('login.resetPasswordFailed'), {
        description: t('login.resetPasswordFailedDesc'),
        duration: 3000
      })
    }
  }

  return (
    <div className='form_auth'>
      {isLogin ? (
        <form onSubmit={loginForm.handleSubmit(onSubmitLogin)} className='md:w-md w-full max-w-md mx-auto p-4'>
          <h1 className='text-heading text-4xl font-semibold'>{t('login.signInTitle')}</h1>
          <p className='mb-10 mt-5'>{t('login.welcome')}</p>

          <Input
            name='email'
            register={loginForm.register}
            required
            label={t('login.emailLabel')}
            type='text'
            errors={loginForm.formState.errors}
          />
          <Input
            name='password'
            register={loginForm.register}
            required
            label={t('login.passwordLabel')}
            type='password'
            errors={loginForm.formState.errors}
          />

          <p className='text-right text-xs font-medium my-2'>
            <Link to='/auth/forgot-password' className='text-sub-color-primary hover:underline'>
              {t('login.forgotPassword')}
            </Link>
          </p>

          <ButtonAuth>{isLoading ? <ClipLoader color='white' size={18} /> : `${t('login.signInButton')}`}</ButtonAuth>
          <button
            type='button'
            className='w-full bg-[#4E86DB] text-white py-5 mt-4 font-semibold center gap-3 cursor-pointer transition-colors hover:bg-[#4E86DB]/80'
          >
            <img src={fbAuth} alt='logo_facebook' />
            {t('login.signInWithFacebook')}
          </button>

          <p className='text-sub-color-primary mt-5'>
            {t('login.noAccount')}?{' '}
            <Link to='/auth/register' className='text-orange'>
              {t('login.signUpLink')}
            </Link>
          </p>
        </form>
      ) : (
        <form
          onSubmit={resetPasswordForm.handleSubmit(onSubmitForgotPassword)}
          className='md:w-md w-full max-w-md mx-auto p-4'
        >
          <h1 className='text-heading text-4xl font-semibold'>{t('login.newPasswordTitle')}</h1>
          <p className='mb-10 mt-5'>{t('login.createNewPassword')}</p>
          <Input
            name='password'
            register={resetPasswordForm.register}
            required
            label={t('login.passwordLabel')}
            type='password'
            errors={resetPasswordForm.formState.errors}
          />
          <Input
            name='confirmPassword'
            register={resetPasswordForm.register}
            required
            label={t('login.confirmPasswordLabel')}
            type='password'
            errors={resetPasswordForm.formState.errors}
          />
          <ButtonAuth>{isLoading ? <ClipLoader color='white' /> : t('login.signInButton')}</ButtonAuth>
          <button
            type='button'
            className='w-full bg-[#4E86DB] text-white py-5 mt-4 font-semibold center gap-3 cursor-pointer transition-colors hover:bg-[#4E86DB]/80'
          >
            <img src={fbAuth} alt='logo_facebook' />
            {t('register.register_sign_in_facebook')}
          </button>
          <p className='text-sub-color-primary mt-5'>
            {t('login.noAccount')}?{' '}
            <Link to='/auth/register' className='text-orange'>
              {t('login.signUpLink')}
            </Link>
          </p>
        </form>
      )}
    </div>
  )
}

export default LoginForm
