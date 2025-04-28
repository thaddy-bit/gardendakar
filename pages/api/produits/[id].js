// pages/api/produits/[id].js
import { pool } from "@/lib/db";

export default async function handler(req, res) {
  const { id } = req.query;

  if (req.method !== "GET") {
    return res.status(405).json({ message: "Méthode non autorisée" });
  }

  try {
    const [rows] = await pool.query(
      `SELECT 
        p.*, 
        c.nom AS catégorie_nom, 
        sc.nom AS sous_catégorie_nom
      FROM produits p
      LEFT JOIN catégorie c ON p.catégorie_id = c.id
      LEFT JOIN sous_catégorie sc ON p.sous_catégorie_id = sc.id
      WHERE p.id = ?`,
      [id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: "Produit non trouvé" });
    }

    res.status(200).json(rows[0]);
  } catch (error) {
    console.error("Erreur API produit par ID:", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
}