import pool from '../../lib/db';
import { getSession } from 'next-auth/react';

export default async function handler(req, res) {
  const session = await getSession({ req });
  
  if (!session) {
    return res.status(401).json({ message: 'Non autorisé' });
  }
  
  try {
    const { statut, dateFrom, dateTo, sort, page = 1 } = req.query;
    const itemsPerPage = 5;
    const offset = (page - 1) * itemsPerPage;
    
    // Construction de la requête de base
    let query = 'SELECT * FROM commandes WHERE client_id = ?';
    const params = [session.user.id];
    
    // Ajout des filtres
    if (statut) {
      query += ' AND statut = ?';
      params.push(statut);
    }
    
    if (dateFrom) {
      query += ' AND date_commande >= ?';
      params.push(dateFrom);
    }
    
    if (dateTo) {
      query += ' AND date_commande <= ?';
      params.push(dateTo + ' 23:59:59');
    }
    
    // Ajout du tri
    let orderBy = 'ORDER BY ';
    switch (sort) {
      case 'date_asc':
        orderBy += 'date_commande ASC';
        break;
      case 'montant_desc':
        orderBy += 'montant_total DESC';
        break;
      case 'montant_asc':
        orderBy += 'montant_total ASC';
        break;
      default: // date_desc par défaut
        orderBy += 'date_commande DESC';
    }
    query += ' ' + orderBy;
    
    // Requête pour le nombre total (pour la pagination)
    const countQuery = query.replace('SELECT *', 'SELECT COUNT(*) as total');
    const [countRows] = await pool.query(countQuery, params);
    const total = countRows[0].total;
    
    // Ajout de la pagination
    query += ' LIMIT ? OFFSET ?';
    params.push(itemsPerPage, offset);
    
    // Exécution de la requête principale
    const [rows] = await pool.query(query, params);
    
    // Convertir les dates en string pour la sérialisation
    const commandes = rows.map(commande => ({
      ...commande,
      date_commande: commande.date_commande.toISOString(),
    }));
    
    res.status(200).json({
      commandes,
      totalCommandes: total,
    });
  } catch (error) {
    console.error('Erreur API commandes:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
}