"use client";

import { City } from "@/@types/city";
import { ColumnDef } from "@tanstack/react-table";

export const ReportColumns: ColumnDef<City>[] = [
  {
    accessorKey: "name",
    header: "Nome",
  },
  {
    accessorKey: "state",
    header: "Estado",
  },
  {
    accessorKey: "foundation_date",
    header: "Data de fundacao",
  },
];
