import { pool } from "@/lib/db";
import PDFDocument from "pdfkit";
import fs from "fs";
import path from "path";

export default async function handler(req, res) {
  if (req.method !== "GET") return res.status(405).end();

  const { id } = req.query;

  if (!id) {
    return res.status(400).json({ error: "ID de la commande manquant" });
  }

  const connection = await pool.getConnection();

  try {
    // Récupérer la commande
    const [commandes] = await connection.query(
      `SELECT * FROM commandes WHERE id = ?`,
      [id]
    );

    if (commandes.length === 0) {
      return res.status(404).json({ error: "Commande non trouvée" });
    }

    const commande = commandes[0];

    // Récupérer les détails de la commande
    const [details] = await connection.query(
      `SELECT * FROM commande_details WHERE commande_id = ?`,
      [id]
    );

    const produits = await Promise.all(
      details.map(async (detail) => {
        const [produit] = await connection.query(
          `SELECT * FROM produits_kya WHERE id = ?`,
          [detail.produit_id]
        );
        return { ...produit[0], ...detail };
      })
    );

    // Générer le PDF de la facture
    const doc = new PDFDocument();
    const filePath = path.join(process.cwd(), 'public', 'factures', `facture_${id}.pdf`);
    doc.pipe(fs.createWriteStream(filePath));

    // Titre de la facture
    doc.fontSize(20).text(`Facture - Commande #${id}`, { align: 'center' }).moveDown();

    // Détails de la commande
    doc.fontSize(12).text(`Client: ${commande.client_id}`);
    doc.text(`Date de commande: ${commande.date_commande}`);
    doc.text(`Adresse de livraison: ${commande.adresse_livraison}`);
    doc.text(`Méthode de paiement: ${commande.methode_paiement}`);
    doc.moveDown();

    // Liste des produits
    doc.text("Produits:", { underline: true }).moveDown();
    produits.forEach((produit) => {
      doc.text(`${produit.nom} - ${produit.quantite} x ${produit.prix} FCFA`);
    });
    doc.moveDown();

    // Total
    doc.fontSize(14).text(`Montant total: ${commande.montant_total} FCFA`, { align: 'right' });

    // Finaliser le PDF
    doc.end();

    // Retourner le chemin du fichier généré
    res.status(200).json({ message: "Facture générée avec succès", filePath: `/factures/facture_${id}.pdf` });
  } catch (error) {
    console.error("Erreur génération facture:", error);
    res.status(500).json({ error: "Erreur lors de la génération de la facture." });
  } finally {
    connection.release();
  }
}