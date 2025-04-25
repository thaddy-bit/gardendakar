import { pool } from '@/lib/db';

export default async function handler(req, res) {
  
  const [rows] = await pool.execute(
    "SELECT COUNT(*) AS count FROM produits WHERE quantite < 3"
  );

  return res.status(200).json({ count: rows[0].count });
}