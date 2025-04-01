import pool from '../../../lib/db';

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Méthode non autorisée" });
  }

  try {
    const [result] = await pool.query("SELECT SUM(quantite) AS total FROM panier");
    return res.status(200).json({ total: result[0].total || 0 });
  } catch (error) {
    console.error("Erreur MySQL :", error);
    return res.status(500).json({ message: "Erreur serveur" });
  }
}
