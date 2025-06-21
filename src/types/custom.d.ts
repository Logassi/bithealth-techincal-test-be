export type User = {
  id: number; // or string, depending on your user ID type
  email?: string;
  role_id?: string;
  iat?: number;
  exp?: number;
};

declare global {
  namespace Express {
    export interface Request {
      user?: User;
    }
  }
}
