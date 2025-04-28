// pages/api/products/[categoryId].js

import { pool } from '@/lib/db';

export default async function handler(req, res) {
  const { id } = req.query;

  console.log("Id collections reçues :", id); // <- Ajoute ça 

  try {
    const [rows] = await pool.execute(
      'SELECT id, nom, description FROM sous_catégorie WHERE catégorie_id = ?',
      [id]
    );
    res.status(200).json(rows);
  } catch (error) {
    console.error("Erreur lors de la récupération des sous-collections :", error);
    res.status(500).json({ error: 'Erreur serveur lors de la récupération des sous-collections.' });
  }
}

