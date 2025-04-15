import * as z from "zod";

export const registerSchema = z.object({
  f_name: z.string().min(2, "Tên không được để trống"),
  l_name: z.string().min(2, "Họ không được để trống"),
  email: z.string().email("Phải là một email hợp lệ"),
  password: z
    .string()
    .min(6, "Mật khẩu phải tối thiểu 6 ky tự")
    .regex(/[a-z]/, "Mật khẩu phải có ít nhất một chữ thường")
    .regex(/[0-9]/, "Mật khẩu phải có ít nhất một số")
    .regex(/[!@#$%^&.,/*]/, "Mật khẩu phải có ít nhất một ký tự đặc biệt"),
});

export const loginSchema = z.object({
  email: z.string().email("Phải là một email hợp lệ"),
  password: z
    .string()
    .min(6, "Mật khẩu phải tối thiểu 6 ky tự")
    .regex(/[a-z]/, "Mật khẩu phải có ít nhất một chữ thường")
    .regex(/[0-9]/, "Mật khẩu phải có ít nhất một số")
    .regex(/[!@#$%^&.,/*]/, "Mật khẩu phải có ít nhất một ký tự đặc biệt"),
});

export const emailSchema = z.object({
  email: z.string().email("Phải là một email hợp lệ"),
});

export const resetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(6, "Mật khẩu phải tối thiểu 6 ký tự")
      .regex(/[a-z]/, "Mật khẩu phải có ít nhất một chữ thường")
      .regex(/[0-9]/, "Mật khẩu phải có ít nhất một số")
      .regex(/[!@#$%^&.,/*]/, "Mật khẩu phải có ít nhất một ký tự đặc biệt"),

    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Mật khẩu xác nhận không khớp",
    path: ["confirmPassword"],
  });

export type LoginFormValues = z.infer<typeof loginSchema>;
export type ResetPasswordFormValues = z.infer<typeof resetPasswordSchema>;
