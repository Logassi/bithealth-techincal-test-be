import { compare, genSalt, hash } from "bcrypt";

const SALT_ROUNDS = 10;

export async function hashPassword(password: string) {
  const salt = await genSalt(SALT_ROUNDS);
  return await hash(password, salt);
}

export async function comparePassword(
  password: string,
  hashedPassword: string
) {
  return await compare(password, hashedPassword);
}
