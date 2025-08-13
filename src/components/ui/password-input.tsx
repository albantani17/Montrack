"use client";
import { useState } from "react";
import { Input } from "./input";
import { Eye, EyeClosed } from "lucide-react";

interface PasswordInputProps
  extends Omit<React.ComponentProps<typeof Input>, "type"> {
  errorMessage?: string;
  isInvalid?: boolean;
}

const PasswordInput = (props: PasswordInputProps) => {
  const { errorMessage, isInvalid } = props;
  const [visible, setVisible] = useState(false);
  const endContent = visible ? (
    <Eye
      className='cursor-pointer'
      onClick={() => setVisible(false)}
      size={20}
    />
  ) : (
    <EyeClosed
      className='cursor-pointer'
      onClick={() => setVisible(true)}
      size={20}
    />
  );
  return (
    <Input
      type={visible ? "text" : "password"}
      endContent={endContent}
      isInvalid={isInvalid}
      errorMessage={errorMessage}
      label='Password'
      {...props}
    />
  );
};

export default PasswordInput;
