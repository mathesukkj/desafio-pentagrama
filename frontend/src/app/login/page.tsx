"use client";

import { CityForm } from "@/components/form/city-form";
import { Card, CardTitle } from "@/components/ui/card";
import Image from "next/image";

export default function City() {
  return (
    <main className="bg-blue-950 h-screen flex p-16">
      <Card className="p-16 flex flex-col w-full lg:w-1/2 justify-center gap-6 lg:rounded-r-none">
        <CardTitle className="text-4xl flex flex-col">
          Olá,
          <span className="font-bold text-[40px] text-slate-700">
            bem-vindo!
          </span>
        </CardTitle>
        <CityForm />
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
