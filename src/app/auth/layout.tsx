import Image from "next/image";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='relative z-0'>
      <div className='absolute top-0 left-0 w-full h-full -z-10 blur-lg'>
        <Image
          src='/illustration/coin.png'
          fill
          alt=''
          className='object-cover'
        />
      </div>
      <div className='w-full min-h-screen px-2 flex items-center justify-center'>
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
