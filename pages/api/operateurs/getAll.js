import pool from '../../../lib/db';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      // Récupérer les opérateurs depuis la base de données
      const [rows] = await pool.query('SELECT * FROM operateur');
      res.status(200).json(rows);
    } catch (error) {
      console.error('Erreur lors de la récupération des opérateurs :', error);
      res.status(500).json({ message: 'Erreur serveur' });
    }
  } else {
    res.status(405).json({ message: 'Méthode non autorisée' });
  }
}