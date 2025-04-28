// import pool from '../../../lib/db';
import { pool } from '@/lib/db';
import bcrypt from 'bcryptjs';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { nom, prenom, telephone, email, password } = req.body;

    // Vérification des champs obligatoires
    if (!nom || !prenom || !telephone || !email || !password) {
      return res.status(400).json({ message: 'Tous les champs sont obligatoires' });
    }

    // Cryptage du mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insertion dans la base de données
    const [result] = await pool.execute(
      'INSERT INTO client (nom, prenom, telephone, email, password) VALUES (?, ?, ?, ?, ?)',
      [nom, prenom, telephone, email, hashedPassword]
    );

    res.status(201).json({ 
      success: true, 
      message: 'Client ajouté avec succès',
      clientId: result.insertId 
    });
  } catch (error) {
    console.error('Erreur lors de l\'ajout du client:', error);
    
    // Gestion des erreurs de contrainte unique
    if (error.code === 'ER_DUP_ENTRY') {
      if (error.message.includes('telephone')) {
        return res.status(400).json({ message: 'Ce numéro de téléphone est déjà utilisé' });
      }
      if (error.message.includes('email')) {
        return res.status(400).json({ message: 'Cet email est déjà utilisé' });
      }
    }
    
    res.status(500).json({ message: 'Erreur lors de l\'ajout du client' });
  }
}