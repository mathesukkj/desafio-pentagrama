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
import { createRoad } from "@/repositories/roads/createRoad";
import { editRoad } from "@/repositories/roads/editRoad";
import { CepResponse } from "@/@types/utils";

interface RoadFormProps {
  formId?: string;
}

const formSchema = z.object({
  name: z
    .string()
    .min(3, { message: "O estado deve ter no minimo 3 caracteres!" }),
  neighborhood_id: z.coerce.number(),
});

export const RoadForm: React.FC<RoadFormProps> = ({ formId }) => {
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const response = formId
      ? await editRoad(values, formId)
      : await createRoad(values);
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  const onChangeCEP = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length == 8) {
      const res = await fetch(
        `https://viacep.com.br/ws/${e.target.value}/json/`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
      const cepData = (await res.json()) as CepResponse;
      form.setValue("name", cepData.logradouro);
      form.setValue("neighborhood_id", 1);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormItem>
          <FormLabel>CEP: (opcional)</FormLabel>
          <FormControl>
            <Input
              placeholder="31888-220"
              onChange={onChangeCEP}
              maxLength={8}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome da rua:</FormLabel>
              <FormControl>
                <Input placeholder="R. 1" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="neighborhood_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Id do bairro:</FormLabel>
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
