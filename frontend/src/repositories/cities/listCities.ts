import { ListCitiesResponse } from "@/@types/city";
import { handleError } from "@/components/error/ErrorToast";

export const listCities = async (page: number) => {
  try {
    const token = localStorage.getItem("token");

    const res = await fetch(`http://localhost:80/api/cities?page=${page}`, {
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

    return response as ListCitiesResponse;
  } catch (error) {
    handleError(error as Error);
  }
};
