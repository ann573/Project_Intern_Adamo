import { auth } from '@/utils/firebase'
import { confirmPasswordReset, signInWithEmailAndPassword } from 'firebase/auth'
import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Link, useLocation, useNavigate } from 'react-router-dom'

// assets
import fbAuth from '@assets/icons/fb_auth.svg'

// zod
import { LoginFormValues, loginSchema, ResetPasswordFormValues, resetPasswordSchema } from '@/schema/authSchema'
import { useAuthStore } from '@/zusTand/authStore'
import Input from '@components/Input'
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

      toast.success('Login successfully!!!', {
        duration: 1000,
        style: {
          background: 'green',
          color: '#fff'
        }
      })
      setIsLoading(false)
      nav('/')
    } catch (err) {
      setIsLoading(false)
      toast.error((err as Error).message, {
        description: 'Email or your password is incorrect',
        actionButtonStyle: {
          background: 'white',
          color: 'red'
        },
        action: {
          label: 'Undo',
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
      toast.success('Reset your password successfully', {
        duration: 1000,
        style: {
          background: 'green',
          color: '#fff'
        }
      })

      resetPasswordForm.reset()
      nav('/auth/login')
    } catch (err) {
      setIsLoading(false)
      toast.error((err as Error).message, {
        description: 'Your code is invalid or expired',
        duration: 3000
      })
    }
  }

  return (
    <div className='flex items-center md:static absolute w-11/12 bg-background top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 md:translate-y-0 md:translate-x-0 rounded-3xl p-3'>
      {isLogin ? (
        <form onSubmit={loginForm.handleSubmit(onSubmitLogin)} className='md:w-md w-full max-w-md mx-auto p-4'>
          <h1 className='text-heading text-4xl font-semibold'>{t('login.signInTitle')}</h1>
          <p className='mb-10 mt-5'>{t('login.welcome')}</p>

          <Input
            name='email'
            register={loginForm.register}
            required
            label={t('login.emailLabel')}
            type='email'
            errors={loginForm.formState.errors}
          />
          <Input
            name='password'
            register={loginForm.register}
            required
            label='Password'
            type={t('login.passwordLabel')}
            errors={loginForm.formState.errors}
          />

          <p className='text-right text-xs font-medium my-2'>
            <Link to='/auth/forgot-password' className='text-sub-color-primary hover:underline'>
              {t('login.forgotPassword')}
            </Link>
          </p>

          <button
            type='submit'
            className='w-full bg-orange text-white py-4 mt-4 font-semibold cursor-pointer transition-colors hover:bg-orange/80'
          >
            {isLoading ? <ClipLoader color='white' /> : `${t('login.signInButton')}`}
          </button>
          <button
            type='button'
            className='w-full bg-[#4E86DB] text-white py-5 mt-4 font-semibold center gap-3 cursor-pointer transition-colors hover:bg-[#4E86DB]/80'
          >
            <img src={fbAuth} alt='logo_facebook' />
            {t('login.signInWithFacebook')}
          </button>

          <p className='text-sub-color-primary mt-5'>
            {t('login.noAccount')}
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
          <h1 className='text-heading text-4xl font-semibold'>New Password</h1>
          <p className='mb-10 mt-5'>Create your new password</p>

          <Input
            name='password'
            register={resetPasswordForm.register}
            required
            label='Password'
            type='password'
            errors={resetPasswordForm.formState.errors}
          />
          <Input
            name='confirmPassword'
            register={resetPasswordForm.register}
            required
            label='Confirm Password'
            type='password'
            errors={resetPasswordForm.formState.errors}
          />

          <button
            type='submit'
            className='w-full bg-orange text-white py-4 mt-4 font-semibold cursor-pointer transition-colors hover:bg-orange/80'
          >
            {isLoading ? <ClipLoader color='white' /> : 'Sign In'}
          </button>
          <button
            type='button'
            className='w-full bg-[#4E86DB] text-white py-5 mt-4 font-semibold center gap-3 cursor-pointer transition-colors hover:bg-[#4E86DB]/80'
          >
            <img src={fbAuth} alt='logo_facebook' />
            Sign in with Facebook
          </button>

          <p className='text-sub-color-primary mt-5'>
            Don't have an account{' '}
            <Link to='/auth/register' className='text-orange'>
              Sign up
            </Link>
          </p>
        </form>
      )}
    </div>
  )
}

export default LoginForm
