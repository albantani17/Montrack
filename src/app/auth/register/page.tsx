import Register from "@/components/views/auth/register/";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Register",
  description: "Register to Montrack",
};

const RegisterPage = () => {
  return <Register />;
};

export default RegisterPage;
