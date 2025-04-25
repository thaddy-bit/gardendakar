import { pool } from "@/lib/db"; 

export default async function handler(req, res) {
  try {
    const [rows] = await pool.query(`
      SELECT id, nom, description, prix, quantite, image_url 
      FROM produits 
      WHERE quantite < 3
    `);
    res.status(200).json(rows);
  } catch (error) {
    console.error("Erreur API stock faible:", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
}