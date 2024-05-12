"use client";

import { Neighborhood } from "@/@types/neighborhood";
import { ColumnDef } from "@tanstack/react-table";

export const NeighborhoodsColumns: ColumnDef<Neighborhood>[] = [
  {
    accessorKey: "name",
    header: "Nome",
  },
  {
    accessorKey: "city.name",
    header: "Cidade",
  },
];
