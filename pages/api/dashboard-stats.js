// pages/api/dashboard/stats.js
import { pool } from '@/lib/db';

export default async function handler(req, res) {
  try {
    const conn = await pool.getConnection();

    // Total commandes
    const [commandes] = await conn.query('SELECT COUNT(*) AS total FROM commandes');
    
    // Total produits
    const [produits] = await conn.query('SELECT COUNT(*) AS total FROM produits');

    // Total ventes (somme des montants)
    const [ventes] = await conn.query('SELECT SUM(montant_total) AS total FROM commandes');

    // Répartition des produits par catégorie
    const [categories] = await conn.query(`
      SELECT c.nom AS name, COUNT(p.id) AS value
      FROM produits p
      JOIN catégorie c ON p.catégorie_id = c.id
      GROUP BY p.catégorie_id
    `);

    // Ventes par mois (12 derniers mois)
    const [ventesParMois] = await conn.query(`
      SELECT DATE_FORMAT(date_commande, '%b') AS mois, SUM(montant_total) AS ventes
      FROM commandes
      WHERE date_commande >= DATE_SUB(CURDATE(), INTERVAL 12 MONTH)
      GROUP BY MONTH(date_commande)
      ORDER BY MONTH(date_commande)
    `);

    conn.release();

    const stats = [
      {
        title: 'Commandes',
        value: commandes[0].total,
        color: 'bg-blue-600',
      },
      {
        title: 'Produits',
        value: produits[0].total,
        color: 'bg-green-600',
      },
      {
        title: 'Total Ventes',
        value: ventes[0].total + ' FCFA',
        color: 'bg-amber-600',
      },
    ];

    res.status(200).json({ stats, ventesParMois, categories });
  } catch (error) {
    console.error('Erreur API dashboard:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
}
