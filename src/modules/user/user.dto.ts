export interface RegisterDto {
  name: string;
  email: string;
  password: string;
  role_id: number;
}

export interface LoginDto {
  email: string;
  password: string;
}
