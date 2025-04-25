// pages/commandes.js
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Loader2 } from 'lucide-react';
import Layout from '../../components/Layout';

export default function CommandesPage() {
  const [commandes, setCommandes] = useState([]);
  const [filtre, setFiltre] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCommandes = async () => {
      try {
        const res = await axios.get('/api/commandes-client');
        setCommandes(res.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };
    fetchCommandes();
  }, []);

  const getBadgeStyle = (statut) => {
    switch (statut) {
      case 'en cours':
        return 'animate-pulse bg-yellow-500 text-white';
      case 'livré':
        return 'bg-green-500 text-white';
      case 'annulé':
        return 'bg-red-500 text-white';
      default:
        return 'bg-gray-400 text-white';
    }
  };

  const commandesFiltrées = filtre
    ? commandes.filter((c) => c.statut === filtre)
    : commandes;

  return (
    <Layout>
      <div className="px-4 lg:px-10 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold mb-4 mt-5">Mes Commandes</h1>
      <div className="mb-8 flex mt-3 gap-2 items-center">
        <label>Filtrer par statut:</label>
        <select
          className="border rounded px-4 py-1"
          value={filtre}
          onChange={(e) => setFiltre(e.target.value)}
        >
          <option value="">Tous</option>
          <option value="en cours">En cours</option>
          <option value="livré">Livré</option>
          <option value="annulé">Annulé</option>
        </select>
      </div>
      {loading ? (
        <div className="flex justify-center py-20">
          <Loader2 className="animate-spin w-8 h-8 text-gray-500" />
        </div>
      ) : commandesFiltrées.length === 0 ? (
        <p>Aucune commande trouvée.</p>
      ) : (
        <div className="grid gap-6">
          {commandesFiltrées.map((commande) => (
            <div
              key={commande.id}
              className="border rounded-2xl p-4 shadow-lg bg-white"
            >
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-lg font-semibold">
                  Commande #{commande.id} - {new Date(commande.date_commande).toLocaleDateString()}
                </h2>
                <Badge className={getBadgeStyle(commande.statut)}>
                  {commande.statut}
                </Badge>
              </div>
              <p className="text-sm text-gray-600 mb-2">
                Livraison: {commande.adresse_livraison} | Paiement: {commande.methode_paiement}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                {commande.produits.map((produit) => (
                  <div
                    key={produit.id}
                    className="border rounded-lg p-2 flex items-center gap-4"
                  >
                    <img
                      src={produit.image_url}
                      alt={produit.nom}
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div>
                      <p className="font-medium">{produit.nom}</p>
                      <p className="text-sm text-gray-500">
                        {produit.quantite} x {produit.prix.toLocaleString('fr-FR')} FCFA
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 justify-between items-center">
                <div className="">
                <p className="font-semibold mb-4">
                  Total: {(commande.montant_total.toLocaleString('fr-FR'))} FCFA
                </p>
                <Button className="" onClick={() => window.open(`/api/commandes/${commande.id}/facture`, '_blank')}>
                  Télécharger la facture
                </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
    </Layout>
  );
}