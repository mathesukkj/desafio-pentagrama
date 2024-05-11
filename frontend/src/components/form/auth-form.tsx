"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { login } from "@/repositories/login";
import React from "react";
import Link from "next/link";
import { signup } from "@/repositories/signup";

interface AuthFormProps {
  handleSubmit: (token: string) => void;
  option?: "login" | "signup";
}

const formSchema = z.object({
  email: z
    .string({
      required_error: "Digite seu email!",
    })
    .email({
      message: "Email inválido!",
    }),
  password: z
    .string({
      required_error: "Digite sua senha!",
    })
    .min(8, {
      message: "A senha deve ter no mínimo 8 caracteres!",
    }),
  name: z.string(),
});

export const AuthForm: React.FC<AuthFormProps> = ({
  handleSubmit,
  option = "login",
}) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const response =
      option == "login" ? await login(values) : await signup(values);

    if (response) handleSubmit(response.token);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {option == "signup" ? (
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome:</FormLabel>
                <FormControl>
                  <Input placeholder="Nome" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        ) : null}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email:</FormLabel>
              <FormControl>
                <Input placeholder="Email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Senha:</FormLabel>
              <FormControl>
                <Input placeholder="Senha" type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {option == "login" ? (
          <Link className="mt-4 text-sm text-slate-500 block" href="/signup">
            Criar uma conta
          </Link>
        ) : (
          <Link className="mt-4 text-sm text-slate-500 block" href="/login">
            Fazer login
          </Link>
        )}
        <Button type="submit" className="block">
          Enviar
        </Button>
      </form>
    </Form>
  );
};
