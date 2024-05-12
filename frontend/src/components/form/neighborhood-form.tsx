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
import { createNeighborhood } from "@/repositories/neighborhoods/createNeighborhood";
import { editNeighborhood } from "@/repositories/neighborhoods/editNeighborhood";

interface NeighborhoodFormProps {
  formId?: string;
}

const formSchema = z.object({
  name: z
    .string()
    .min(3, { message: "O estado deve ter no minimo 3 caracteres!" }),
  city_id: z.coerce.number(),
});

export const NeighborhoodForm: React.FC<NeighborhoodFormProps> = ({
  formId,
}) => {
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const response = formId
      ? await editNeighborhood(values, formId)
      : await createNeighborhood(values);
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
          name="city_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Id da cidade:</FormLabel>
              <FormControl>
                <Input placeholder="1" type="number" {...field} />
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
