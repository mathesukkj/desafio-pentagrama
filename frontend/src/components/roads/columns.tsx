"use client";

import { Road } from "@/@types/road";
import { ColumnDef } from "@tanstack/react-table";

export const RoadsColumns: ColumnDef<Road>[] = [
  {
    accessorKey: "name",
    header: "Nome",
  },
  {
    accessorKey: "neighborhood_id",
    header: "Bairro",
  },
];
