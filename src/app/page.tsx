"use client";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";
import { redirect } from "next/navigation";

export default function Home() {
  const supabase = createClient();
  const handleLogout = async () => {
    await supabase.auth.signOut();
    redirect("/auth/login");
  };
  return (
    <div className='h-screen flex items-center justify-center'>
      <Button onClick={handleLogout} className='cursor-pointer'>
        Logout
      </Button>
    </div>
  );
}
