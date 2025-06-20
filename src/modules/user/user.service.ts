import { compare, genSalt, hash } from "bcrypt";
import { db } from "../../configs/database";
import { Request } from "express";
import { CustomError } from "../../types/error";
import { signToken } from "../../utils/jwt";
import { LoginDto, RegisterDto } from "./user.dto";

async function TestService() {
  return {
    message: "Test Service",
  };
}

async function GetAllUserData() {
  const result = await db.query("SELECT * FROM users");

  return result.rows;
}

async function Register(req: Request) {
  const { name, email, password, role_id }: RegisterDto = req.body;

  const existingUser = await db.query("SELECT * FROM users WHERE email = $1", [
    email,
  ]);

  if (existingUser.rows.length > 0) {
    const error = new Error("Email already registered") as CustomError;
    error.status = 409;
    throw error;
  }

  const salt = await genSalt(10);
  const hashedPassword = await hash(password, salt);

  const registerQuery = `
    INSERT INTO users (name, email, password)
    VALUES ($1, $2, $3)
    RETURNING id
  `;

  const userResult = await db.query(registerQuery, [
    name,
    email,
    hashedPassword,
  ]);

  const userId = userResult.rows[0].id;

  const assignRoleQuery = `
    INSERT INTO user_role (user_id, role_id)
    VALUES ($1, $2)
  `;

  await db.query(assignRoleQuery, [userId, role_id]);

  return {
    message: `Register Success`,
  };
}

async function Login(req: Request) {
  const { email, password }: LoginDto = req.body;

  const userQuery = `
    SELECT 
      u.id, u.name, u.email, u.password,
      r.role_name AS role
    FROM users u
    JOIN user_role ur ON ur.user_id = u.id
    JOIN roles r ON r.id = ur.role_id
    WHERE u.email = $1
  `;

  const result = await db.query(userQuery, [email]);

  if (result.rows.length === 0) {
    const error = new Error("User not found") as CustomError;
    error.status = 404;
    throw error;
  }

  const user = result.rows[0];

  const isMatch = await compare(password, user.password);
  if (!isMatch) {
    const error = new Error("Invalid credentials") as CustomError;
    error.status = 401;
    throw error;
  }

  const payload = {
    id: user.id,
    email: user.email,
    role: user.role,
  };

  const token = signToken(payload);

  return {
    message: "Login successful",
    token,
    // user: {
    //   id: user.id,
    //   name: user.name,
    //   email: user.email,
    //   role: user.role,
    // },
  };
}

export { TestService, GetAllUserData, Register, Login };
