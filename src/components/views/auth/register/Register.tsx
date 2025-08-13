"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import PasswordInput from "@/components/ui/password-input";
import Link from "next/link";
import useRegister from "./useRegister";
import { Controller } from "react-hook-form";
import { Progress } from "@/components/ui/progress";

const Register = () => {
  const { control, errors, handleSubmit, onSubmit, isPending, progress } =
    useRegister();

  return (
    <Card className='w-[400px]'>
      <CardHeader>
        <CardTitle className='text-2xl'>Register</CardTitle>
        <CardDescription>
          Already have an account?{" "}
          <Link
            className='underline text-zinc-500 hover:text-zinc-900'
            href='/auth/login'
          >
            Login
          </Link>
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardContent>
          <div className='flex flex-col gap-4'>
            <Controller
              control={control}
              name='fullname'
              render={({ field }) => (
                <Input
                  {...field}
                  label='Nama Lengkap'
                  errorMessage={errors.fullname?.message}
                  isInvalid={!!errors.fullname}
                  className='w-full h-10'
                />
              )}
            />
            <Controller
              control={control}
              name='username'
              render={({ field }) => (
                <Input
                  {...field}
                  label='Username'
                  errorMessage={errors.username?.message}
                  isInvalid={!!errors.username}
                  className='w-full h-10'
                />
              )}
            />
            <Controller
              control={control}
              name='email'
              render={({ field }) => (
                <Input
                  {...field}
                  errorMessage={errors.email?.message}
                  isInvalid={!!errors.email}
                  type='email'
                  label='Email'
                  className='w-full h-10'
                />
              )}
            />
            <Controller
              name='password'
              control={control}
              render={({ field }) => (
                <PasswordInput
                  {...field}
                  label='Password'
                  errorMessage={errors.password?.message}
                  isInvalid={!!errors.password}
                />
              )}
            />
            <Controller
              name='confirmPassword'
              control={control}
              render={({ field }) => (
                <PasswordInput
                  {...field}
                  label='Konfirmasi Password'
                  className='w-full h-10'
                  errorMessage={errors.confirmPassword?.message}
                  isInvalid={!!errors.confirmPassword}
                />
              )}
            />
          </div>
        </CardContent>
        <CardFooter className='pt-4'>
          <Button
            variant={"default"}
            className='w-full cursor-pointer flex items-center justify-center'
            disabled={isPending}
          >
            {isPending ? (
              <Progress className='w-[50%] ' value={progress}></Progress>
            ) : (
              "Register"
            )}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default Register;
