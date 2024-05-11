import { AuthResponse, SignupPayload } from "@/@types/auth";
import { handleError } from "@/components/error/ErrorToast";

export const signup = async (payload: SignupPayload) => {
  try {
    const res = await fetch(`http://localhost:80/api/signup`, {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        Accept: "application/json",
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
