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

export default function Report() {
  const [currentPage, setCurrentPage] = useState<number>(1);

  const { data } = useQuery({
    queryKey: ["getReport", currentPage],
    queryFn: () => getReport(currentPage),
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
