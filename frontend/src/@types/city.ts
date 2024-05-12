export type CityPayload = {
  name: string;
  state: string;
  foundation_date: string;
};

export type City = {
  name: string;
  id: number;
  state: string;
  foundation_date: string;
};

export type ListCitiesResponse = {
  current_page: number;
  data: City[];
  last_page: number;
  per_page: number;
  total: number;
};
