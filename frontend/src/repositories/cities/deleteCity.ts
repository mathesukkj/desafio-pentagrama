import { City, CityPayload } from "@/@types/city";
import { handleError } from "@/components/error/ErrorToast";

export const deleteCity = async (id: number) => {
  try {
    let token;
    if (typeof window !== "undefined") {
      token = localStorage.getItem("token");
    }

    const res = await fetch(`http://localhost:80/api/cities/${id}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      throw new Error("Erro desconhecido");
    }
  } catch (error) {
    handleError(error as Error);
  }
};
