export type RoadPayload = {
  name: string;
  neighborhood_id: number;
};

export type Road = {
  name: string;
  id: number;
  neighborhood_id: number;
};

export type ListRoadsResponse = {
  current_page: number;
  data: Road[];
  last_page: number;
  per_page: number;
  total: number;
};
