import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "default_secret"; // Replace in production
const JWT_EXPIRES_IN = "1d"; // Token validity duration

interface JwtPayload {
  id: number; // or string, depending on your user ID type
  email?: string;
  role?: string;
}

export function signToken(payload: JwtPayload): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
}

export function verifyToken(token: string) {
  return jwt.verify(token, JWT_SECRET) as JwtPayload;
}

export function decodeToken(token: string) {
  return jwt.decode(token) as JwtPayload;
}
