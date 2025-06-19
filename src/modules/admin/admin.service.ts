import { genSalt, hash } from "bcrypt";
import { db } from "../../configs/database";
import { Request } from "express";
import { CustomError } from "../../types/error";

async function TestService() {
  return {
    message: "Test Service",
  };
}

async function GetAllAdminData() {
  const result = await db.query("SELECT * FROM users");

  return result.rows;
}

async function Register(req: Request) {
  const { name, email, password } = req.body;

  const existingUser = await db.query("SELECT * FROM users WHERE email = $1", [
    email,
  ]);

  if (existingUser.rows.length > 0) {
    const error = new Error("Email already registered") as CustomError;
    error.status = 409; // Conflict
    throw error;
  }

  const salt = await genSalt(10);
  const hashedPassword = await hash(password, salt);

  const registerQuery = `
    INSERT INTO users (name, email, password)
    VALUES ($1,$2,$3)
    `;

  await db.query(registerQuery, [name, email, hashedPassword]);

  return {
    message: `Register Success`,
  };
}

export { TestService, GetAllAdminData, Register };
