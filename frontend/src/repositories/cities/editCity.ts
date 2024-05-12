import { AuthResponse } from "@/@types/auth";
import { CityPayload } from "@/@types/city";
import { handleError } from "@/components/error/ErrorToast";

export const editCity = async (payload: CityPayload, id: string) => {
  try {
    let token;
    if (typeof window !== "undefined") {
      token = localStorage.getItem("token");
    }

    const res = await fetch(`http://localhost:80/api/cities/${id}`, {
      method: "PUT",
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

    return response as AuthResponse;
  } catch (error) {
    handleError(error as Error);
  }
};
