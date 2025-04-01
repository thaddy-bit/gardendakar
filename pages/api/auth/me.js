
import jwt from "jsonwebtoken";
import cookie from "cookie";
import pool from "../../../lib/db"; // Assure-toi d'avoir ton fichier de connexion MySQL

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Méthode non autorisée" });
  }

  const cookies = cookie.parse(req.headers.cookie || "");
  const token = cookies.token;

  if (!token) {
    return res.status(401).json({ message: "Non autorisé" });
  }

  try {
    const decoded = jwt.verify(token, "secret_key");
    const [rows] = await pool.query("SELECT id, email FROM client WHERE id = ?", [decoded.id]);

    if (rows.length === 0) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }

    res.status(200).json(rows);

  } catch (error) {
    res.status(401).json({ message: "Token invalide" });
  }
}

/////////////////////

