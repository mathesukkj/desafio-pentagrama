import { Road, RoadPayload } from "@/@types/road";
import { handleError } from "@/components/error/ErrorToast";

export const editRoad = async (payload: RoadPayload, id: string) => {
  try {
    let token;
    if (typeof window !== "undefined") {
      token = localStorage.getItem("token");
    }

    const res = await fetch(`http://localhost:80/api/roads/${id}`, {
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

    return response as Road;
  } catch (error) {
    handleError(error as Error);
  }
};
