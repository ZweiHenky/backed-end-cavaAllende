// import { neon, Pool } from '@neondatabase/serverless';
// export const sql = neon(`${process.env.DATABASE_URL}`);
// export const pool = new Pool({ connectionString: process.env.DATABASE_URL });


import pg from 'pg';
const { Pool } = pg;

// ✅ Asegúrate de tener esta variable en tu .env
const DATABASE_URL = process.env.DATABASE_URL;

// ✅ Crear el pool
export const pool = new Pool({ connectionString: DATABASE_URL });
