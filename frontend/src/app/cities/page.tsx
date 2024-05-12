"use client";

import { listCities } from "@/repositories/cities/listCities";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { CitiesTable } from "@/components/cities/table";
import { CitiesColumns } from "@/components/cities/columns";
import { useState } from "react";
import NavBar from "@/components/navigation/NavBar";
import CityModal from "@/components/cities/modal";

export default function Cities() {
  const [currentPage, setCurrentPage] = useState<number>(1);

  const { data } = useQuery({
    queryKey: ["listCities", currentPage],
    queryFn: () => listCities({ page: currentPage }),
  });

  return (
    <div>
      <NavBar />

      <main className="bg-white h-screen mt-4 p-16">
        <div className="flex justify-end my-4">
          <CityModal />
        </div>

        {data ? (
          <CitiesTable
            columns={CitiesColumns}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            data={data}
          />
        ) : null}
      </main>
    </div>
  );
}
