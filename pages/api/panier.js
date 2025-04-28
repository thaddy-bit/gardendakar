// import pool from '../../lib/db';
import { pool } from '@/lib/db';

export default async function handler(req, res) {
  const { produitId, quantite } = req.body;
  const client_id = req.query.client_id || req.body.client_id; // Récupérer `client_id` correctement

  if (!client_id) {
    return res.status(400).json({ error: "Client requis" });
  }

  if (req.method === 'GET') {
    try {
      const [items] = await pool.query(`
        SELECT p.*, pr.nom, pr.prix, pr.image_url 
        FROM panier p
        JOIN produits pr ON p.produit_id = pr.id
        WHERE p.client_id = ?
      `, [client_id]);

      return res.status(200).json(items || []); // Renvoie un tableau même si vide
    } catch (error) {
      console.error('Erreur:', error);
      return res.status(500).json({ error: "Erreur serveur" });
    }
  }

  if (req.method === 'POST') {
    try {
      const [existing] = await pool.query(
        'SELECT * FROM panier WHERE client_id = ? AND produit_id = ?',
        [client_id, produitId]
      );

      if (existing.length > 0) {
        await pool.query(
          'UPDATE panier SET quantite = quantite + ? WHERE client_id = ? AND produit_id = ?',
          [quantite, client_id, produitId]
        );
      } else {
        await pool.query(
          'INSERT INTO panier (client_id, produit_id, quantite) VALUES (?, ?, ?)',
          [client_id, produitId, quantite]
        );
      }

      return res.status(200).json({ success: true });
    } catch (error) {
      return res.status(500).json({ message: 'Erreur serveur' });
    }
  }

  if (req.method === 'DELETE') {
    try {
      await pool.query(
        'DELETE FROM panier WHERE client_id = ? AND produit_id = ?',
        [client_id, produitId]
      );
      return res.status(200).json({ success: true });
    } catch (error) {
      return res.status(500).json({ message: 'Erreur serveur' });
    }
  }

  return res.status(405).json({ message: 'Méthode non autorisée' });
}
