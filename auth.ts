export type LoginResponse = {
  token: string;
  user?: {
    email: string;
    username?: string;
  };
};
