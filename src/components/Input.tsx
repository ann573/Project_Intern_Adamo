import React from 'react'
import { FieldErrors, FieldValues, Path, UseFormRegister } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
type TInputProps<T extends FieldValues> = {
  label: string
  name: Path<T>
  register: UseFormRegister<T>
  errors: FieldErrors<T>
  type?: string
  required?: boolean
} & React.InputHTMLAttributes<HTMLInputElement>

const Input = <T extends FieldValues>({
  label,
  name,
  register,
  type = 'text',
  required = false,
  errors,
  ...rest
}: TInputProps<T>) => {
  const [isFocused, setIsFocused] = React.useState(false)
  const [hasValue, setHasValue] = React.useState(false)
  const [isShowPassword, setIsShowPassword] = React.useState(false)

  const { t } = useTranslation('schema_auth')
  return (
    <div className='flex flex-col mb-8'>
      <div className='relative'>
        <label
          htmlFor={name}
          className={`absolute text-gray-500 transition-all duration-250 z-50 cursor-text bg-transparent select-none
            ${
              isFocused || hasValue
                ? 'text-xs -top-5  bg-background text-sub-color-primary font-semibold'
                : 'text-base top-3'
            }`}
        >
          {label}
        </label>

        <input
          type={name.includes('assword') ? (isShowPassword ? 'text' : 'password') : type}
          {...register(name, { required })}
          onFocus={() => setIsFocused(true)}
          onBlur={(e) => {
            setIsFocused(false)
            setHasValue(e.target.value !== '')
          }}
          className='w-full py-2 border-b border-sub-color-second focus:outline-none focus:border-b autofill:shadow-none autofill:text-black autofill:bg-transparent'
          id={name}
          {...rest}
        />

        {name.includes('assword') && (
          <i
            className={`${
              isShowPassword ? 'ri-eye-off-line' : 'ri-eye-line'
            } absolute top-1/2 -translate-y-1/2 right-3 text-xl text-color-content-second cursor-pointer`}
            onClick={() => setIsShowPassword(!isShowPassword)}
          ></i>
        )}
      </div>
      {errors[name] && typeof errors[name]?.message === 'string' && (
        <p className='text-red-500 md:text-sm text-xs mt-1'>{t((errors[name]?.message as string) || '')}</p>
      )}
    </div>
  )
}

export default Input
