"use client";

import { useQuery } from "@tanstack/react-query";
import { CitiesTable } from "@/components/cities/table";
import { useEffect, useState } from "react";
import NavBar from "@/components/navigation/NavBar";
import CityModal from "@/components/cities/modal";
import { listRoads } from "@/repositories/roads/listRoads";
import { RoadsColumns } from "@/components/roads/columns";
import { RoadsTable } from "@/components/roads/table";
import RoadModal from "@/components/roads/modal";
import { useRouter } from "next/navigation";

export default function Road() {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const router = useRouter();

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      router.push("/login");
    }
  });

  const { data } = useQuery({
    queryKey: ["listRoads", currentPage],
    queryFn: () => listRoads(currentPage),
  });

  return (
    <div>
      <NavBar />

      <main className="bg-white h-screen mt-4 p-16">
        <div className="flex justify-between my-4">
          <h1 className="text-1xl text-center font-extrabold tracking-tight lg:text-3xl">
            Ruas cadastradas
          </h1>
          <RoadModal />
        </div>

        {data ? (
          <RoadsTable
            columns={RoadsColumns}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            data={data}
          />
        ) : null}
      </main>
    </div>
  );
}
