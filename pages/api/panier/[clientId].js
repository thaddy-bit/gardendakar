import pool from '../../../lib/db';

export default async function handler(req, res) {
  const { produitId, quantite } = req.body;
  const client_id = req.query.client_id || req.body.client_id; // Récupérer `client_id` correctement

  console.log("Utilisateur connecté en ID panier :", client_id);

  if (!client_id) {
    return res.status(400).json({ error: "Client requis" });
  }

  if (req.method === 'GET') {
    try {
      // Si `count=true`, renvoyer le nombre total d'articles
      if (req.query.count === "true") {
        const [[{ total }]] = await pool.query(
          "SELECT SUM(quantite) AS total FROM panier WHERE client_id = ?",
          [client_id]
        );
        return res.status(200).json({ total: total || 0 });
      }

      // Sinon, récupérer le panier complet
      const [items] = await pool.query(`
        SELECT p.*, pr.nom, pr.prix, pr.image_url 
        FROM panier p
        JOIN produits pr ON p.produit_id = pr.id
        WHERE p.client_id = ?
      `, [client_id]);
      
      return res.status(200).json(items || []); // Renvoie un tableau même si vide
    } catch (error) {
      console.error('Erreur:', error);
      return res.status(500).json({ error: "Erreur serveur" });
    }
  }

  if (req.method === 'POST') {
    try {
      // Vérifier si le produit est déjà dans le panier
      const [existing] = await pool.query(
        'SELECT * FROM panier WHERE client_id = ? AND produit_id = ?',
        [client_id, produitId]
      );

      if (existing && existing.length > 0) {
        // Mettre à jour la quantité si déjà présent
        await pool.query(
          'UPDATE panier SET quantite = quantite + ? WHERE client_id = ? AND produit_id = ?',
          [quantite, client_id, produitId]
        );
      } else {
        // Ajouter un nouvel item
        await pool.query(
          'INSERT INTO panier (client_id, produit_id, quantite) VALUES (?, ?, ?)',
          [client_id, produitId, quantite]
        );
      }
      
      return res.status(200).json({ success: true });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Erreur serveur' });
    }
  }

  if (req.method === 'DELETE') {
    try {
      await pool.query(
        'DELETE FROM panier WHERE client_id = ? AND produit_id = ?',
        [client_id, produitId]
      );
      return res.status(200).json({ success: true });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Erreur serveur' });
    }
  }

  return res.status(405).json({ message: 'Méthode non autorisée' });
}
