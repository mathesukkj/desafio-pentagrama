import { City, ListCitiesResponse } from "@/@types/city";
import { handleError } from "@/components/error/ErrorToast";

export const showCity = async (id: number) => {
  try {
    let token;
    if (typeof window !== "undefined") {
      token = localStorage.getItem("token");
    }

    let url = `http://localhost:80/api/cities/${id}`;

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

    return response as City;
  } catch (error) {
    handleError(error as Error);
  }
};
