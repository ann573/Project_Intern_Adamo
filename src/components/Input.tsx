import React from "react";
import { UseFormRegister, FieldErrors, FieldValues } from "react-hook-form";

type TInputProps<T extends FieldValues> = {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  register: UseFormRegister<T>;
  errors: FieldErrors<T>;
} & React.InputHTMLAttributes<HTMLInputElement>;

const Input = <T extends FieldValues>({
  label,
  name,
  register,
  type = "text",
  required = false,
  errors,
  ...rest
}: TInputProps<T>) => {
  const [isFocused, setIsFocused] = React.useState(false);
  const [hasValue, setHasValue] = React.useState(false);
  const [isShowPassword, setIsShowPassword] = React.useState(false);

  return (
    <div className="flex flex-col mb-5">
      <div className="relative">
        <label
          htmlFor={name}
          className={`absolute text-gray-500 transition-all duration-250 cursor-text bg-transparent select-none
            ${
              isFocused || hasValue
                ? "text-xs -top-2  bg-white text-sub-color-primary font-semibold"
                : "text-base top-3"
            }`}
        >
          {label}
        </label>

        <input
          type={
            name.includes("assword")
              ? isShowPassword
                ? "text"
                : "password"
              : type
          }
          {...register(name, { required })}
          onFocus={() => setIsFocused(true)}
          onBlur={(e) => {
            setIsFocused(false);
            setHasValue(e.target.value !== "");
          }}
          className="w-full py-2 border-b border-sub-color-second focus:outline-none focus:border-b"
          id={name}
          {...rest}
        />

        {name.includes("assword") && (
          <i
            className={`${
              isShowPassword ? "ri-eye-off-line" : "ri-eye-line"
            } absolute top-1/2 -translate-y-1/2 right-3 text-xl text-[#4F4F4F] cursor-pointer`}
            onClick={() => setIsShowPassword(!isShowPassword)}
          ></i>
        )}
      </div>
      {errors[name] && (
        <p className="text-red-500 md:text-sm text-xs mt-1">
          {(errors[name] as any)?.message}
        </p>
      )}
    </div>
  );
};

export default Input;
