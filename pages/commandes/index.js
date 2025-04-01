import { getSession } from 'next-auth/react';
import Layout from '../../components/Layout';
import CommandesList from '../../components/CommandesList';
import pool from '../../lib/db';

export default function CommandesPage({ initialCommandes, totalCommandes }) {
  return (
    <Layout title="Mes Commandes">
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Mes Commandes
            </h1>
            <p className="mt-3 text-xl text-gray-500">
              Retrouvez l'historique de toutes vos commandes
            </p>
          </div>
          
          <CommandesList 
            commandes={initialCommandes} 
            totalCommandes={totalCommandes} 
          />
        </div>
      </div>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);

  

  try {
    // Requête initiale (première page, tri par défaut)
    const [rows] = await pool.query(
      'SELECT * FROM commandes WHERE client_id = ? ORDER BY date_commande DESC LIMIT 5',
      [session.user.id]
    );
    
    // Nombre total de commandes
    const [countRows] = await pool.query(
      'SELECT COUNT(*) as total FROM commandes WHERE client_id = ?',
      [session.user.id]
    );
    
    // Convertir les dates en string pour la sérialisation
    const initialCommandes = rows.map(commande => ({
      ...commande,
      date_commande: commande.date_commande.toISOString(),
    }));

    return {
      props: { 
        initialCommandes,
        totalCommandes: countRows[0].total,
      },
    };
  } catch (error) {
    console.error('Erreur lors de la récupération des commandes:', error);
    return {
      props: { 
        initialCommandes: [],
        totalCommandes: 0,
      },
    };
  }
}