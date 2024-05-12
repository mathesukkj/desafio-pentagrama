"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Dispatch, FC, SetStateAction, useEffect } from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ReportResponse } from "@/@types/report";
import { NeighborhoodsTable } from "../neighborhoods/table";
import { NeighborhoodsColumns } from "../neighborhoods/columns";
import { Button } from "../ui/button";
import ReportModal from "./editDeleteCityModal";
import { Road } from "@/@types/road";

interface RoadsProps {
  data: ReportResponse;
  columns: ColumnDef<any, any>[];
  setCurrentPage: Dispatch<SetStateAction<number>>;
  currentPage: number;
}

export const ReportTable: FC<RoadsProps> = ({
  data,
  columns,
  currentPage,
  setCurrentPage,
}) => {
  const table = useReactTable({
    data: data.data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  const handleNextPage = () => {
    if (currentPage < data.last_page) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  function chunkNeighborhoods(array: any[], chunkSize: number) {
    const chunks = [];
    for (let i = 0; i < array.length; i += chunkSize) {
      chunks.push(array.slice(i, i + chunkSize));
    }
    return chunks;
  }

  return (
    <div className="w-full">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead className="w-1/3" key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row, i) => {
              return (
                <>
                  <TableRow
                    key={row.id}
                    onClick={() => row.toggleSelected(!row.getIsSelected())}
                    data-state={row.getIsSelected() && "selected"}
                    className="border-t-4"
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id} onClick={() => {}}>
                        {cell.column.id != "actions" ? (
                          flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )
                        ) : (
                          <ReportModal id={row.original.id as number} />
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                  {chunkNeighborhoods(row.original.neighborhoods, 3).map(
                    (chunk, i) => (
                      <>
                        <TableRow key={i}>
                          {chunk.map((e) => (
                            <>
                              <TableCell key={e}>
                                <div className="text-md pb-2 mb-2 border-b">
                                  <span className="font-bold">Bairro</span>:{" "}
                                  {e.name}
                                </div>
                                <span className="font-bold text-md">
                                  Ruas:{" "}
                                </span>
                                {e.roads.map((road: Road, i: number) => (
                                  <span
                                    key={i}
                                    className="inline-block pr-3 py-2"
                                  >
                                    {road.name}
                                  </span>
                                ))}
                              </TableCell>
                            </>
                          ))}
                        </TableRow>
                      </>
                    )
                  )}
                </>
              );
            })
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                Nenhum resultado encontrado.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <div className="mt-4 flex justify-between">
        <button onClick={handlePrevPage} disabled={currentPage === 1}>
          {"<"}
        </button>
        <span>
          Página {currentPage} de {data.last_page}
        </span>
        <button
          onClick={handleNextPage}
          disabled={currentPage === data.last_page}
        >
          {">"}
        </button>
      </div>
    </div>
  );
};
