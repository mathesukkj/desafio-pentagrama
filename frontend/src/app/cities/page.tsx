"use client";

import { useRouter } from "next/navigation";

export default function Cities() {
  const router = useRouter();

  const handleSubmit = (token: string) => {
    localStorage.setItem("token", token);
    // router.push("/dashboard");
  };

  return <main className="bg-blue-950 h-screen flex p-16"></main>;
}
