import { pool } from '@/lib/db';

export default async function handler(req, res) {
  const { categorie_id } = req.query;

  if (!categorie_id) {
    return res.status(400).json({ error: "categorie_id manquant dans la requête" });
  }

  try {
    const [rows] = await pool.query(
      'SELECT * FROM sous_catégorie WHERE catégorie_id = ?',
      [categorie_id]
    );
    res.status(200).json(rows);
  } catch (error) {
    console.error("Erreur lors de la récupération des sous-catégories :", error);
    res.status(500).json({ error: "Erreur serveur lors du chargement des sous-catégories" });
  }
}