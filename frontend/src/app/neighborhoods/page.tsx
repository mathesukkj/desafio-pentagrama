"use client";

import { useQuery } from "@tanstack/react-query";
import { CitiesTable } from "@/components/cities/table";
import { useState } from "react";
import NavBar from "@/components/navigation/NavBar";
import CityModal from "@/components/cities/modal";
import { listNeighborhoods } from "@/repositories/neighborhoods/listNeighborhoods";
import { NeighborhoodsColumns } from "@/components/neighborhoods/columns";
import { NeighborhoodsTable } from "@/components/neighborhoods/table";
import NeighborhoodModal from "@/components/neighborhoods/modal";

export default function Neighborhood() {
  const [currentPage, setCurrentPage] = useState<number>(1);

  const { data } = useQuery({
    queryKey: ["listNeighborhoods", currentPage],
    queryFn: () => listNeighborhoods(currentPage),
  });

  return (
    <div>
      <NavBar />

      <main className="bg-white h-screen mt-4 p-16">
        <div className="flex justify-end my-4">
          <NeighborhoodModal />
        </div>

        {data ? (
          <NeighborhoodsTable
            columns={NeighborhoodsColumns}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            data={data}
          />
        ) : null}
      </main>
    </div>
  );
}
