import { ReportResponse } from "@/@types/report";
import { handleError } from "@/components/error/ErrorToast";

export const getReport = async (
  page: number,
  cityName: string,
  neighborhoodName: string,
  roadName: string,
  startDate: string,
  endDate: string
) => {
  try {
    let token;
    if (typeof window !== "undefined") {
      token = localStorage.getItem("token");
    }

    let url = `http://localhost:80/api/report?page=${page}&city_name=${cityName}&neighborhood_name=${neighborhoodName}&road_name=${roadName}`;
    if (startDate) {
      url += `&start_foundation_date=${startDate}`;
    }
    if (endDate) {
      url += `&end_foundation_date=${endDate}`;
    }

    const res = await fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
    });

    const response = await res.json();

    if (!res.ok) {
      throw new Error(response.message);
    }

    return response as ReportResponse;
  } catch (error) {
    handleError(error as Error);
  }
};
