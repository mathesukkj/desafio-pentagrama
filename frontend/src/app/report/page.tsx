"use client";

import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import NavBar from "@/components/navigation/NavBar";
import { listNeighborhoods } from "@/repositories/neighborhoods/listNeighborhoods";
import { NeighborhoodsColumns } from "@/components/neighborhoods/columns";
import { NeighborhoodsTable } from "@/components/neighborhoods/table";
import NeighborhoodModal from "@/components/neighborhoods/modal";
import { useRouter } from "next/navigation";
import { getReport } from "@/repositories/report/getReport";
import { ReportTable } from "@/components/report/table";
import { ReportColumns } from "@/components/report/columns";
import { Input } from "@/components/ui/input";
import { DatePicker } from "@/components/ui/datepicker";
import { formatDate } from "date-fns";

export default function Report() {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [cityName, setCityName] = useState("");
  const [neighborhoodName, setNeighborhoodName] = useState("");
  const [roadName, setRoadName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const { data } = useQuery({
    queryKey: [
      "getReport",
      currentPage,
      cityName,
      neighborhoodName,
      roadName,
      startDate,
      endDate,
    ],
    queryFn: () =>
      getReport(
        currentPage,
        cityName,
        neighborhoodName,
        roadName,
        startDate,
        endDate
      ),
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
        <h1 className="text-2xl text-center mb-6 font-extrabold tracking-tight lg:text-4xl">
          Relatório das cidades, bairros e ruas
        </h1>

        <div className="flex gap-5 mt-4 mb-5">
          <Input
            placeholder="Filtro de nome da cidade"
            className="w-1/5"
            value={cityName}
            onChange={(e) => setCityName(e.target.value)}
          />
          <Input
            placeholder="Filtro de nome do bairro"
            className="w-1/5"
            value={neighborhoodName}
            onChange={(e) => setNeighborhoodName(e.target.value)}
          />
          <Input
            placeholder="Filtro de nome da rua"
            className="w-1/5"
            value={roadName}
            onChange={(e) => setRoadName(e.target.value)}
          />
          <DatePicker
            date={startDate}
            className="w-1/5"
            placeholder="Data de fundacão inicial"
            setDate={(value) => setStartDate(formatDate(value, "yyyy-MM-dd"))}
          />
          <DatePicker
            date={endDate}
            className="w-1/5"
            placeholder="Data de fundacão final"
            setDate={(value) => setEndDate(formatDate(value, "yyyy-MM-dd"))}
          />
        </div>

        {data ? (
          <ReportTable
            columns={ReportColumns}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            data={data}
          />
        ) : null}
      </main>
    </div>
  );
}
