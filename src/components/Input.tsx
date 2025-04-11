import React from "react";

const Input = ({ label, name, register, type, required, errors, ...rest }) => {
  const [isFocused, setIsFocused] = React.useState(false);
  const [hasValue, setHasValue] = React.useState(false);

  const [isShowPassword, setIsShowPassword] = React.useState(false);
  return (
    <>
      <div className="flex flex-col mb-5 ">
        <div className="relative">
          <label
            className={`absolute text-gray-500 transition-all duration-250 cursor-text bg-transparent select-none
          ${
            isFocused || hasValue
              ? "text-xs -top-2  bg-white text-sub-color-primary font-semibold"
              : "text-base top-3"
          }`}
            htmlFor={name}
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
            className="w-full py-2 border-b border-sub-color-second focus:outline-none focus:border-b "
            id={name}
            {...rest}
          />

          {name.includes("assword") && (
            <i
              className={`${
                isShowPassword ? "ri-eye-off-line" : "ri-eye-line"
              } absolute top-1/2 -translate-y-1/2 right-3 text-xl text-[#4F4F4F] cursor-pointer`}
              onClick={() => setIsShowPassword(!isShowPassword)} // Toggle mật khẩu
            ></i>
          )}
        </div>
        {errors[name] && (
          <p className="text-red-500 md:text-sm text-xs mt-1">{errors[name].message}</p>
        )}
      </div>
    </>
  );
};

export default Input;
