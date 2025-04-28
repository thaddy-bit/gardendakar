import { pool } from '@/lib/db';

export default async function handler(req, res) {
  
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Méthode non autorisée" });
  }

  const { produitId, userId, quantite } = req.body;

  if (!produitId || !userId || quantite <= 0) {
    return res.status(400).json({ message: "Données invalides" });
  }

  try {
    // Vérifier si le produit est déjà dans le panier
    const [existant] = await pool.query(
      "SELECT id, quantite FROM panier WHERE client_id = ? AND produit_id = ?",
      [userId, produitId]
    );

    if (existant.length > 0) {
      // Si le produit existe déjà, on met à jour la quantité
      const nouvelleQuantite = existant[0].quantite + quantite;
      await pool.query("UPDATE panier SET quantite = ? WHERE id = ?", [nouvelleQuantite, existant[0].id]);

      return res.status(200).json({ message: "Quantité mise à jour dans le panier" });
    } else {
      // Sinon, on ajoute un nouveau produit
      await pool.query(
        "INSERT INTO panier (client_id, produit_id, quantite) VALUES (?, ?, ?)",
        [userId, produitId, quantite]
      );

      return res.status(200).json({ message: "Produit ajouté au panier" });
    }
  } catch (error) {
    console.error("Erreur MySQL :", error);
    return res.status(500).json({ message: "Erreur serveur" });
  }
}
