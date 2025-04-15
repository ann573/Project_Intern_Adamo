import React from "react";
import { emailSchema } from "@schema/authSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValues, useForm, UseFormRegister } from "react-hook-form";
import { Link } from "react-router-dom";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "@/utils/firebase";
import Input from "@components/Input";
import { toast } from "sonner";
import { ClipLoader } from "react-spinners";

const EmailForgotForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(emailSchema),
  });

  const [isLoading, setIsLoading] = React.useState(false);
  type FormData = {
    email: string;
  };
  const onSubmit = async (data: FormData) => {
    try {
      setIsLoading(true);
      await sendPasswordResetEmail(auth, data.email);
      setIsLoading(false);

      toast.success("Vui lòng kiểm tra email của bạn để đặt lại mật khẩu", {
        duration: 1500,
      });
    } catch (error) {
      setIsLoading(false);
      toast.error("Có lỗi xảy ra vui lòng thử lại sau");
      console.log(error);
    }
  };

  return (
    <div className="flex items-center md:static absolute w-11/12 bg-white top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 md:translate-y-0 md:translate-x-0 rounded-3xl p-3">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="md:w-md w-full max-w-md mx-auto p-4"
      >
        <h1 className="text-heading sm:text-4xl text-3xl font-semibold">
          Forgot Password
        </h1>
        <p className="mb-10 mt-5">
          Enter the e-mail address associated with the account. We'll e-mail a
          link to reset your password.
        </p>

        <Input
          name="email"
          register={register as UseFormRegister<FieldValues>}
          required
          label="Email Address"
          type="email"
          errors={errors}
        />

        <button
          type="submit"
          className="w-full bg-orange text-white h-15 py-4 mt-4 font-semibold cursor-pointer transition-colors hover:bg-orange/80"
        >
          {isLoading ? <ClipLoader size={20} color="#fff" /> : "Send Request"}
        </button>
        <Link
          to={"/auth/login"}
          className="inline-block text-center relative overflow-hidden group w-full border  border-orange text-orange py-4 mt-4 font-semibold cursor-pointer"
        >
          Back to sign in
          <span className="absolute left-0 top-0 w-full h-full bg-gradient-to-r from-orange/30 to-orange/80 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500"></span>
        </Link>

        <p className="text-sub-color-primary mt-5">
          Don't have an account{" "}
          <Link to="/auth/register" className="text-orange">
            Sign up
          </Link>
        </p>
      </form>
    </div>
  );
};

export default EmailForgotForm;
