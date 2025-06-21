"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
// src/configs/db.ts
const pg_1 = require("pg");
const _1 = require(".");
exports.db = new pg_1.Pool({
    connectionString: _1.DATABASE_URL,
});
