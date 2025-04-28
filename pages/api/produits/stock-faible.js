import { pool } from '@/lib/db';

export default async function handler(req, res) {
  try {

    const [rows] = await pool.execute(
      "SELECT id, nom, image_url, prix, quantite FROM produits WHERE quantite < 3"
    );

    return res.status(200).json({ produits: rows });
  } catch (error) {
    console.error("Erreur API stock-faible :", error);
    return res.status(500).json({ error: "Erreur serveur" });
  }
}