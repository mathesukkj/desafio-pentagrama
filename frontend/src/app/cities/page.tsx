"use client";

import { listCities } from "@/repositories/cities/listCities";

import { useQuery } from "@tanstack/react-query";
import { CitiesTable } from "@/components/cities/table";
import { CitiesColumns } from "@/components/cities/columns";
import { useEffect, useState } from "react";
import NavBar from "@/components/navigation/NavBar";
import CityModal from "@/components/cities/modal";
import { useRouter } from "next/navigation";

export default function Cities() {
  const [currentPage, setCurrentPage] = useState<number>(1);

  const { data } = useQuery({
    queryKey: ["listCities", currentPage],
    queryFn: () => listCities({ page: currentPage }),
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
            Cidades cadastradas
          </h1>
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
