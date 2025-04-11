import React from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword, confirmPasswordReset } from "firebase/auth";
import { auth } from "@/utils/firebase";

// assets
import fbAuth from "@assets/icons/fb_auth.svg";

// zod
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, resetPasswordSchema } from "@/schema/authSchema";
import Input from "@components/Input";
import Cookies from "js-cookie";
import { toast } from "sonner";
import { ClipLoader } from "react-spinners";

const LoginForm = () => {
  const [isLoading, setIsLoading] = React.useState(false);

  const nav = useNavigate();
  const { pathname, search } = useLocation();
  const isLogin = pathname.includes("login");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(isLogin ? loginSchema : resetPasswordSchema),
  });

  const onSubmitLogin = async (data) => {
    setIsLoading(true);
    try {
      const { email, password } = data;
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      Cookies.set("access_token", userCredential.user.accessToken);
      Cookies.set("name", userCredential.user.displayName);
      Cookies.set("refresh_token", userCredential._tokenResponse.refreshToken);
      toast.success("Đăng nhập thành công", {
        duration: 1000,
      });
      setIsLoading(false);
      nav("/");
    } catch (err) {
      setIsLoading(false);
      toast.error("Đăng nhập thất bại", {
        description: "Email hoặc mật khẩu không đúng",
        duration: 3000,
        action: {
          label: "Undo",
        },
      });
      console.log(err);
    }
  };

  const onSubmitForgotPassword = async (data) => {
    try {
      setIsLoading(true)
      const code = search.split("=")[2].split("&")[0];
      confirmPasswordReset(auth, code, data.password)
      
      setIsLoading(false)
      toast.success("Đặt lại mật khẩu thành công", {
        duration: 1000,
      });

      reset();
      nav("/auth/login");
      return
    } catch (err) {
      toast.error("Đặt lại mật khẩu thất bại", {
        description: "Mã không hợp lệ hoặc đã hết hạn",
        duration: 3000,
      })
      console.log(err);
      return null;
    }
  };
  
  return (
    <>
      <div className="flex items-center md:static absolute w-11/12 bg-white top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 md:translate-y-0 md:translate-x-0 rounded-3xl p-3">
        <form
          onSubmit={handleSubmit(
            isLogin ? onSubmitLogin : onSubmitForgotPassword
          )}
          className="md:w-md w-full max-w-md mx-auto p-4"
        >
          <h1 className="text-heading text-4xl font-semibold">
            {isLogin ? "Sign In" : "New Password"}
          </h1>
          <p className="mb-10 mt-5">
            {isLogin ? "Welcome to NgaoduVietnam" : "Create your new password"}
          </p>

          {isLogin ? (
            <>
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
            </>
          ) : (
            <>
              <Input
                name="password"
                register={register}
                required
                label="Password"
                type="password"
                errors={errors}
              />

              <Input
                name="confirmPassword"
                register={register}
                required
                label="Confirm Password"
                type="password"
                errors={errors}
              />
            </>
          )}

          {isLogin && (
            <p className="text-right text-xs font-medium my-2">
              <Link
                to="/auth/forgot-password"
                className="text-sub-color-primary hover:underline"
              >
                Forgot password?
              </Link>
            </p>
          )}

          <button
            type="submit"
            className="w-full bg-orange text-white py-4 mt-4 font-semibold cursor-pointer transition-colors hover:bg-orange/80"
          >
            {isLoading ? <ClipLoader color="white" /> : "Sign In"}
          </button>
          <button
            type="button"
            className="w-full bg-[#4E86DB] text-white py-5 mt-4 font-semibold center gap-3 cursor-pointer transition-colors hover:bg-[#4E86DB]/80"
          >
            <img src={fbAuth} alt="logo_facebook" />
            Sign in with Facebook
          </button>

          <p className="text-sub-color-primary mt-5">
            Don't have an account{" "}
            <Link to="/auth/register" className="text-orange">
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </>
  );
};

export default LoginForm;
