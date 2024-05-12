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
import React, { useState } from "react";
import { createNeighborhood } from "@/repositories/neighborhoods/createNeighborhood";
import { editNeighborhood } from "@/repositories/neighborhoods/editNeighborhood";
import { ComboBox } from "../ui/combobox";
import { useQuery } from "@tanstack/react-query";
import { listCities } from "@/repositories/cities/listCities";

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
  const [searchedValue, setSearchedValue] = useState("");

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const response = formId
      ? await editNeighborhood(values, formId)
      : await createNeighborhood(values);
  };

  const { data } = useQuery({
    queryKey: ["listCities", searchedValue],
    queryFn: () =>
      listCities({
        itemsPerPage: 9999,
      }),
  });

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
              <ComboBox
                value={field.value}
                setValue={(val) => form.setValue("city_id", val as number)}
                list={
                  data
                    ? data.data.map((e) => ({
                        value: e.id,
                        label: e.name,
                      }))
                    : []
                }
              />
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
