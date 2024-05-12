"use client";

import { AuthForm } from "@/components/form/auth-form";
import { Card, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function City() {
  const router = useRouter();

  const handleSubmit = (token: string) => {
    localStorage.setItem("token", token);
    router.push("/cities");
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      router.push("/login");
    }
  });

  return (
    <main className="bg-blue-950 h-screen flex p-16">
      <Card className="p-16 flex flex-col w-full lg:w-1/2 justify-center gap-6 lg:rounded-r-none">
        <CardTitle className="text-4xl flex flex-col">
          Olá,
          <span className="font-bold text-[40px] text-slate-700">
            bem-vindo!
          </span>
        </CardTitle>
        <AuthForm handleSubmit={handleSubmit} />
      </Card>
      <div className="hidden lg:block w-1/2">
        <Image
          src="/bg-auth.jpg"
          className="w-full object-cover max-h-full rounded-r-lg"
          width={500}
          height={500}
          alt="Picture"
        />
      </div>
    </main>
  );
}
