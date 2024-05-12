"use client";

import { listCities } from "@/repositories/cities/listCities";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { CitiesTable } from "@/components/cities/table";
import { CitiesColumns } from "@/components/cities/columns";
import { useState } from "react";
import NavBar from "@/components/navigation/NavBar";
import { Button } from "@/components/ui/button";
import CityModal from "@/components/cities/modal";
import { DatePicker } from "@/components/ui/datepicker";

export default function Cities() {
  const router = useRouter();

  const handleSubmit = (token: string) => {
    localStorage.setItem("token", token);
    // router.push("/dashboard");
  };

  const [currentPage, setCurrentPage] = useState<number>(1);

  const { data } = useQuery({
    queryKey: ["listCities", currentPage],
    queryFn: () => listCities(currentPage),
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
