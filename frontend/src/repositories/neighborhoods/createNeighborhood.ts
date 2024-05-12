import { Neighborhood, NeighborhoodPayload } from "@/@types/neighborhood";
import { handleError } from "@/components/error/ErrorToast";

export const createNeighborhood = async (payload: NeighborhoodPayload) => {
  try {
    let token;
    if (typeof window !== "undefined") {
      token = localStorage.getItem("token");
    }

    const res = await fetch(`http://localhost:80/api/neighborhoods`, {
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

    return response as Neighborhood;
  } catch (error) {
    handleError(error as Error);
  }
};
