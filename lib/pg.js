// lib/db.js
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: "postgresql://neondb_owner:f7U4cvWpVXai@ep-polished-wave-a5zsab6c.us-east-2.aws.neon.tech/neondb?sslmode=require", 
});


export const query = (text, params) => pool.query(text, params);
