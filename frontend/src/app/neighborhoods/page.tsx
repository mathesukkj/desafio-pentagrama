"use client";

import { useQuery } from "@tanstack/react-query";
import { CitiesTable } from "@/components/cities/table";
import { useEffect, useState } from "react";
import NavBar from "@/components/navigation/NavBar";
import CityModal from "@/components/cities/modal";
import { listNeighborhoods } from "@/repositories/neighborhoods/listNeighborhoods";
import { NeighborhoodsColumns } from "@/components/neighborhoods/columns";
import { NeighborhoodsTable } from "@/components/neighborhoods/table";
import NeighborhoodModal from "@/components/neighborhoods/modal";
import { useRouter } from "next/navigation";

export default function Neighborhood() {
  const [currentPage, setCurrentPage] = useState<number>(1);

  const { data } = useQuery({
    queryKey: ["listNeighborhoods", currentPage],
    queryFn: () => listNeighborhoods(currentPage),
  });

  const router = useRouter();

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      router.push("/login");
    }
  });

  return (
    <div>
      <NavBar />

      <main className="bg-white h-screen mt-4 p-16">
        <div className="flex justify-between my-4">
          <h1 className="text-1xl text-center font-extrabold tracking-tight lg:text-3xl">
            Bairros cadastrados
          </h1>

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
