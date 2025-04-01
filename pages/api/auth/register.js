import pool from '../../../lib/db';
import bcrypt from "bcryptjs"; // Import de bcrypt pour hasher le mot de passe

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end(); // Vérifie que la requête est un POST

  const { nom, prenom, telephone, email, password } = req.body; // Récupération des données envoyées par le formulaire

  // Vérification des champs obligatoires
  if (!nom || !prenom || !telephone || !email || !password) {
    return res.status(400).json({ message: "Tous les champs sont requis." });
  }

  const hashedPassword = await bcrypt.hash(password, 10); // Hash du mot de passe avec bcrypt

  try {
    // Insertion du client dans la base de données
    await pool.query(
      "INSERT INTO client (nom, prenom, telephone, email, password) VALUES (?, ?, ?, ?, ?)",
      [nom, prenom, telephone, email, hashedPassword]
    );

    res.status(201).json({ message: "Inscription réussie. Connectez-vous !" }); // Retourne une confirmation
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur." }); // Gestion des erreurs serveur
  }
}
