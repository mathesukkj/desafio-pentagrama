import { City, CityPayload } from "@/@types/city";
import { handleError } from "@/components/error/ErrorToast";

export const createCity = async (payload: CityPayload) => {
  try {
    const token = localStorage.getItem("token");

    const res = await fetch(`http://localhost:80/api/cities`, {
      method: "POST",
      body: JSON.stringify(payload),
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
