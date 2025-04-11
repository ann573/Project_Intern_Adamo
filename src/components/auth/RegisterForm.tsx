import React from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
// assets
import fbAuth from "@assets/icons/fb_auth.svg";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

// zod
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "@/schema/authSchema";

import Input from "@components/Input";
import { toast } from "sonner";

import { auth } from "@/utils/firebase";

const RegisterForm = () => {
  const [isLoading, setIsLoading] = React.useState(false);
  const nav = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data) => {
    try {
      setIsLoading(true);

      const { email, password, f_name, l_name } = data;
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await updateProfile(userCredential.user, {
        displayName: `${f_name} ${l_name}`,
      });

      setIsLoading(false);
      toast.success("Đăng ký thành công:");

      nav("/auth/login");

    } catch (error) {
      setIsLoading(false);
      toast.error("Error!!!!", {
        description: "Email already in use!!!",
        duration: 3000,
        action: {
          label: "Undo",
        },
      });
      console.dir(error.code.split("/")[1].split("-").join(" "));
      console.error("Lỗi đăng ký:", error);
    }
  };

  return (
    <>
      <div className="flex items-center md:static absolute w-11/12 bg-white top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 md:translate-y-0 md:translate-x-0 rounded-3xl p-3">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="md:w-md w-full max-w-md mx-auto p-4"
        >
          <h1 className="text-heading text-4xl font-semibold">Register</h1>
          <p className="mb-10 mt-5">Welcome to NgaoduVietnam</p>

          <div className="grid grid-cols-2 gap-5 ">
            <Input
              name="f_name"
              register={register}
              required
              label="First Name"
              type="text"
              errors={errors}
            />
            <Input
              name="l_name"
              register={register}
              required
              label="Last Name"
              type="text"
              errors={errors}
            />
          </div>

          <Input
            name="email"
            register={register}
            required
            label="Email Address"
            type="email"
            errors={errors}
          />

          <Input
            name="password"
            register={register}
            required
            label="Password"
            type="password"
            errors={errors}
          />

          <button
            type="submit"
            className="w-full bg-orange text-white py-4 mt-4 font-semibold cursor-pointer transition-colors hover:bg-orange/80"
            disabled={isLoading}
          >
            {isLoading ? <ClipLoader color="#ffffff" height={1} /> : "Sign Up"}
          </button>
          <button
            type="button"
            className="w-full bg-[#4E86DB] text-white py-5 mt-4 font-semibold center gap-3 cursor-pointer transition-colors hover:bg-[#4E86DB]/80"
          >
            <img src={fbAuth} alt="logo_facebook" />
            Sign in with Facebook
          </button>

          <p className="text-sub-color-primary mt-5">
            Member already?{" "}
            <Link to="/auth/login" className="text-orange">
              Log in
            </Link>
          </p>
        </form>
      </div>
    </>
  );
};

export default RegisterForm;
