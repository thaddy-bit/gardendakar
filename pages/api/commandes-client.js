import { pool } from "@/lib/db";

export default async function handler(req, res) {
  if (req.method !== "GET") return res.status(405).end();

  const  client_id  = 3;

  if (!client_id) {
    return res.status(400).json({ error: "ID client manquant" });
  }

  const connection = await pool.getConnection();

  try {
    const [commandes] = await connection.query(
      `SELECT * FROM commandes WHERE client_id = ? ORDER BY date_commande DESC`,
      [client_id]
    );

    // Récupérer les détails de chaque commande
    const commandesAvecDetails = await Promise.all(
      commandes.map(async (commande) => {
        const [details] = await connection.query(
          `SELECT * FROM commande_details WHERE commande_id = ?`,
          [commande.id]
        );

        const produits = await Promise.all(
          details.map(async (detail) => {
            const [produit] = await connection.query(
              `SELECT * FROM produits WHERE id = ?`,
              [detail.produit_id]
            );
            return { ...produit[0], ...detail };
          })
        );

        return { ...commande, produits };
      })
    );

    res.status(200).json(commandesAvecDetails);
  } catch (error) {
    console.error("Erreur récupération des commandes:", error);
    res.status(500).json({ error: "Erreur lors de la récupération des commandes." });
  } finally {
    connection.release();
  }
}
