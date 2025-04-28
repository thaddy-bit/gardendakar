// pages/api/commande.js
// import {pool} from '../../lib/db';
import { pool } from '@/lib/db';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { client_id, livraison, panier, total, adresse, mode_paiement } = req.body;

  if (!client_id || !Array.isArray(panier) || panier.length === 0 || livraison < 0) {
    return res.status(400).json({ error: 'Données invalides.' });
  }

  const connection = await pool.getConnection();

  try {
    await connection.beginTransaction();

    // 🔹 Insertion dans commandes
    const [commandeResult] = await connection.query(
      `INSERT INTO commandes (client_id, frais_livraison, montant_total, statut, adresse_livraison, methode_paiement) VALUES (?, ?, ?, 'en cours', ?, ?)`,
      [client_id, livraison, total, adresse, mode_paiement]
    );
    const commandeId = commandeResult.insertId;
    console.log(panier);
    // 🔸 Insertion des détails de commande avec nom pharmacie
    for (const item of panier) {
      const [produit] = await connection.query(
        `SELECT id FROM produits WHERE produits.id = ?`,
        [item.produit_id]
      );
      if (produit.length === 0) {
        throw new Error(`Produit avec id ${item.produit_id} introuvable.`);
      }

      await connection.query(
        `INSERT INTO commande_details (commande_id, produit_id, quantite, prix) VALUES (?, ?, ?, ?)`,
        [commandeId, item.produit_id, item.quantite, item.prix]
      );
    }

    // ✅ Vider le panier du client
    await connection.query(`DELETE FROM panier WHERE client_id = ?`, [client_id]);

    await connection.commit();
    res.status(200).json({ message: 'Commande enregistrée avec succès.' });
  } catch (error) {
    console.error('Erreur commande :', error);
    await connection.rollback();
    res.status(500).json({ error: 'Erreur lors de l’enregistrement de la commande.' });
  } finally {
    connection.release();
  }
}
