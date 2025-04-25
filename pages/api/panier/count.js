// import pool from "../../../lib/db";
import { pool } from '@/lib/db'; 
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]"; // Assurez-vous que le chemin est correct

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Méthode non autorisée" });
  }

  try {
    const session = await getServerSession(req, res, authOptions);

    if (!session || !session.user) {
      return res.status(401).json({ message: "Non autorisé" });
    }

    const userId = session.user.id;

    const [result] = await pool.query(
      "SELECT SUM(quantite) as total FROM panier WHERE client_id = ?",
      [userId]
    );

    res.status(200).json({ total: result[0].total || 0 });
  } catch (error) {
    console.error("Erreur API /panier/count :", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
}
