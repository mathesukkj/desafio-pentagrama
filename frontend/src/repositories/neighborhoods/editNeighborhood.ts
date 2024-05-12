import { AuthResponse } from "@/@types/auth";
import { NeighborhoodPayload } from "@/@types/neighborhood";
import { handleError } from "@/components/error/ErrorToast";

export const editNeighborhood = async (
  payload: NeighborhoodPayload,
  id: string
) => {
  try {
    let token;
    if (typeof window !== "undefined") {
      token = localStorage.getItem("token");
    }

    const res = await fetch(`http://localhost:80/api/login/${id}`, {
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
