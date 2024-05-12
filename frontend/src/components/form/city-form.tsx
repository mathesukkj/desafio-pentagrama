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
import React from "react";
import { createCity } from "@/repositories/cities/createCity";
import { editCity } from "@/repositories/cities/editCity";
import { DatePicker } from "../ui/datepicker";
import { formatDate } from "date-fns";

interface AuthFormProps {
  formId?: string;
}

const formSchema = z.object({
  name: z
    .string()
    .min(3, { message: "O estado deve ter no minimo 3 caracteres!" }),
  state: z
    .string()
    .min(2, { message: "O estado deve ter no minimo 2 caracteres!" }),
  foundation_date: z
    .date()
    .transform((val) => formatDate(val, "yyyy-MM-dd").toString()),
});

export const CityForm: React.FC<AuthFormProps> = ({ formId }) => {
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const response = formId
      ? await editCity(values, formId)
      : await createCity(values);
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome da cidade:</FormLabel>
              <FormControl>
                <Input placeholder="Belo Horizonte" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="state"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome do estado:</FormLabel>
              <FormControl>
                <Input placeholder="MG" type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="foundation_date"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Data de fundação do estado:</FormLabel>
              <FormControl>
                <DatePicker
                  date={field.value}
                  setDate={(value: string) =>
                    form.setValue("foundation_date", value)
                  }
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="block mx-auto">
          Enviar
        </Button>
      </form>
    </Form>
  );
};
