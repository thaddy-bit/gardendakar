// pages/api/clients/index.js
// import db from '../../../lib/db';
import { pool } from '@/lib/db';

export default async function handler(req, res) {
  try {
    if (req.method === 'GET') {
      const clients = await db.query('SELECT * FROM clients');
      res.status(200).json(clients);
    } else if (req.method === 'POST') {
      const { email, password_hash, nom, prenom, telephone, adresse_ligne1, adresse_ligne2, code_postal, ville, pays, date_naissance, newsletter } = req.body;
      const result = await db.query('INSERT INTO clients (email, password_hash, nom, prenom, telephone, adresse_ligne1, adresse_ligne2, code_postal, ville, pays, date_naissance, newsletter) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [email, password_hash, nom, prenom, telephone, adresse_ligne1, adresse_ligne2, code_postal, ville, pays, date_naissance, newsletter]);
      res.status(201).json({ id: result.insertId });
    } else if (req.method === 'PUT') {
      const { id, email, nom, prenom, telephone, adresse_ligne1, adresse_ligne2, code_postal, ville, pays, date_naissance, newsletter } = req.body;
      await db.query('UPDATE clients SET email=?, nom=?, prenom=?, telephone=?, adresse_ligne1=?, adresse_ligne2=?, code_postal=?, ville=?, pays=?, date_naissance=?, newsletter=? WHERE id=?',
        [email, nom, prenom, telephone, adresse_ligne1, adresse_ligne2, code_postal, ville, pays, date_naissance, newsletter, id]);
      res.status(200).json({ message: 'Client mis à jour' });
    } else if (req.method === 'DELETE') {
      const { id } = req.body;
      await db.query('DELETE FROM clients WHERE id=?', [id]);
      res.status(200).json({ message: 'Client supprimé' });
    } else {
      res.status(405).json({ message: 'Méthode non autorisée' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error: error.message });
  }
}
