import { createClient } from "@/lib/supabase/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { redirect } from "next/navigation";
import { useForm } from "react-hook-form";
import z, { email } from "zod";

const validateLoginSchema = z.object({
  email: z.email().min(1, { message: "Email harus diisi" }),
  password: z.string().min(8, { message: "Password harus diisi" }),
});

const useLogin = () => {
  const supabase = createClient();
  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({
    resolver: zodResolver(validateLoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const login = async (data: { email: string; password: string }) => {
    const result = await supabase.auth.signInWithPassword({
      email: data.email,
      password: data.password,
    });

    return result;
  };

  const {
    mutate: loginMutate,
    isPending: isLoginPending,
    isSuccess: isLoginSuccess,
  } = useMutation({
    mutationFn: login,
    onSuccess() {
      reset();
      redirect("/");
    },
    onError(error) {
      console.error(error);
    },
  });

  const handleLogin = (data: { email: string; password: string }) => {
    loginMutate(data);
  };

  return {
    control,
    errors,
    handleSubmit,
    handleLogin,
    isLoginPending,
    isLoginSuccess,
  };
};

export default useLogin;
