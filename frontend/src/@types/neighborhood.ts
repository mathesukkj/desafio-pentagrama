export type NeighborhoodPayload = {
  name: string;
  city_id: number;
};

export type Neighborhood = {
  name: string;
  id: number;
  city_id: number;
};

export type ListNeighborhoodsResponse = {
  current_page: number;
  data: Neighborhood[];
  last_page: number;
  per_page: number;
  total: number;
};
