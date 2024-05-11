export type LoginPayload = {
  email: string;
  password: string;
};

export type AuthResponse = {
  token: string;
};

export type SignupPayload = {
  name: string;
  email: string;
  password: string;
};
