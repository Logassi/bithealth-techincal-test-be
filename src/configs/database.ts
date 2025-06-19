// src/configs/db.ts
import { Pool } from "pg";
import { DATABASE_URL } from ".";

export const db = new Pool({
  connectionString: DATABASE_URL,
});
