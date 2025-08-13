import { createClient } from "@/lib/supabase/client";
import { IUser } from "@/types/User";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { redirect } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";

const schema = z
  .object({
    fullname: z.string().min(1, { message: "Nama lengkap harus diisi" }),
    username: z.string().min(1, { message: "Username harus diisi" }),
    email: z
      .email({ message: "Email tidak valid" })
      .min(1, { message: "Email harus diisi" }),
    password: z.string().min(8, { message: "Password minimal 8 karakter" }),
    confirmPassword: z
      .string()
      .min(1, { message: "Konfirmasi password harus diisi" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type RegisterFormData = {
  fullname: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const useRegister = () => {
  const supabase = createClient();
  const [progress, setProgress] = useState(0);

  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<RegisterFormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      fullname: "",
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const register = async (data: RegisterFormData) => {
    setProgress(20);
    const { error } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
      options: {
        data: {
          fullname: data.fullname,
          username: data.username,
        },
        emailRedirectTo: `http://localhost:3000/auth/login`,
      },
    });

    setProgress(100);

    return true;
  };

  const { mutate, isPending } = useMutation({
    mutationFn: register,
    onSuccess: () => {
      reset();
      redirect("/");
    },
  });

  const onSubmit = (data: RegisterFormData) => {
    mutate(data);
  };

  return {
    control,
    errors,
    handleSubmit,
    onSubmit,
    isPending,
    progress,
  };
};

export default useRegister;
