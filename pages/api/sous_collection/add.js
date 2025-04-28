// import pool from '../../../lib/db';
import { pool } from '@/lib/db';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Méthode non autorisée' });
  }

  const { nom, description, categorie_id } = req.body;

  if (!nom || !description || !categorie_id) {
    return res.status(400).json({ error: 'Tous les champs sont requis.' });
  }

  try {
    const [result] = await pool.execute(
      `INSERT INTO sous_catégorie (nom, description, catégorie_id)
       VALUES (?, ?, ?)`,
      [nom, description, categorie_id]
    );

    res.status(200).json({ message: "Sous-collection ajoutée avec succès", id: result.insertId });
  } catch (error) {
    console.error('Erreur ajout sous_collection:', error);
    res.status(500).json({ error: "Erreur lors de l'ajout" });
  }
}