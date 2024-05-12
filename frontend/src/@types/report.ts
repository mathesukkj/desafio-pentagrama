export type ReportResponse = {
  cities: {
    current_page: number;
    data: ReportCity[];
    last_page: number;
    per_page: number;
    total: number;
  };
};

export type ReportCity = {
  name: string;
  id: number;
  state: string;
  foundation_date: string;
  neighborhoods: {
    id: number;
    name: string;
    roads: {
      name: string;
    }[];
  }[];
};
