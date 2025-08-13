"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import PasswordInput from "@/components/ui/password-input";
import { createClient } from "@/lib/supabase/client";
import { redirect, useRouter } from "next/navigation";
import { Controller } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import useLogin from "./useLogin";
import { PuffLoader } from "react-spinners";
import Link from "next/link";

const Login = () => {
  const { control, errors, handleSubmit, handleLogin, isLoginPending } =
    useLogin();

  const supabase = createClient();
  const handleOauthLogin = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `http://localhost:3000/api/auth/callback`, // sesuai dengan yang ada di Supabase dashboard
      },
    });

    if (data.url) {
      redirect(data.url);
    }
    if (error) {
      console.error(error);
    }
  };

  return (
    <Card className='w-[400px]'>
      <CardHeader>
        <CardTitle className='text-2xl'>Login to Montrack</CardTitle>
        <CardDescription>
          Doesn't have an account?{" "}
          <Link
            className='underline text-zinc-500 hover:text-zinc-900'
            href='/auth/register'
          >
            Sign up
          </Link>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className='flex flex-col gap-4'>
          <Button
            onClick={() => handleOauthLogin()}
            className='w-full cursor-pointer bg-zinc-900'
          >
            <FcGoogle />
            Sign in with Google
          </Button>
          <div className='relative flex items-center py-2'>
            <div className='flex-grow border-t border-zinc-200' />
            <span className='mx-4 text-sm text-zinc-500'>Or</span>
            <div className='flex-grow border-t border-zinc-200' />
          </div>
          <form onSubmit={handleSubmit(handleLogin)}>
            <div className='flex flex-col gap-4'>
              <div className='flex flex-col gap-2'>
                <Controller
                  name='email'
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      label='Email'
                      isInvalid={!!errors.email}
                      errorMessage={errors.email?.message}
                      className='w-full h-10'
                    />
                  )}
                ></Controller>
              </div>
              <div className='flex flex-col gap-2'>
                <Controller
                  name='password'
                  control={control}
                  render={({ field }) => (
                    <PasswordInput
                      {...field}
                      isInvalid={!!errors.password}
                      errorMessage={errors.password?.message}
                      className='w-full h-10'
                    />
                  )}
                ></Controller>
              </div>
              <div className='flex flex-col gap-2'>
                <Button className='cursor-pointer w-full bg-zinc-900'>
                  {isLoginPending ? (
                    <PuffLoader size={30} color='#fff' />
                  ) : (
                    "Login"
                  )}
                </Button>
              </div>
            </div>
          </form>
        </div>
      </CardContent>
    </Card>
  );
};

export default Login;
