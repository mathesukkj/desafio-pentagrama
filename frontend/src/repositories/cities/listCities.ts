import { ListCitiesResponse } from "@/@types/city";
import { handleError } from "@/components/error/ErrorToast";

export const listCities = async ({
  page,
  name,
  itemsPerPage,
}: {
  page?: number;
  name?: string;
  itemsPerPage?: number;
}) => {
  try {
    let token;
    if (typeof window !== "undefined") {
      token = localStorage.getItem("token");
    }

    let query = "";
    if (page) query += "page=" + page + "&";
    if (name) query += "city_name=" + name + "&";
    if (itemsPerPage) query += "items_per_page=" + itemsPerPage + "&";

    let url = `http://localhost:80/api/cities?${query}`;

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

    return response as ListCitiesResponse;
  } catch (error) {
    handleError(error as Error);
  }
};
