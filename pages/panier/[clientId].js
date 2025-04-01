import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Panier({ clientId }) {
  const [panier, setPanier] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPanier = async () => {
      try {
        const res = await fetch(`/api/panier?clientId=${clientId}`);
        const data = await res.json();
        setPanier(data);
      } catch (error) {
        console.error('Erreur:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPanier();
  }, [clientId]);

  const removeFromCart = async (produitId) => {
    try {
      await fetch(`/api/panier?clientId=${clientId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ produitId }),
      });
      setPanier(panier.filter(item => item.produit_id !== produitId));
    } catch (error) {
      console.error('Erreur:', error);
    }
  };

  if (loading) return <p>Chargement...</p>;

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">Votre Panier</h1>
      
      {panier.length === 0 ? (
        <p>Votre panier est vide</p>
      ) : (
        <div className="space-y-4">
          {panier.map((item) => (
            <div key={item.id} className="flex items-center border-b pb-4">
              <img 
                src={item.image_url} 
                alt={item.nom}
                className="w-20 h-20 object-cover mr-4"
              />
              <div className="flex-grow">
                <h3 className="font-medium">{item.nom}</h3>
                <p>Prix: ${item.prix.toFixed(2)}</p>
                <p>Quantité: {item.quantite}</p>
              </div>
              <button
                onClick={() => removeFromCart(item.produit_id)}
                className="text-red-500 hover:text-red-700"
              >
                Supprimer
              </button>
            </div>
          ))}
          
          <div className="mt-6 border-t pt-4">
            <p className="text-xl font-semibold">
              Total: $
              {panier.reduce((total, item) => 
                total + (item.prix * item.quantite), 0).toFixed(2)}
            </p>
            <button className="mt-4 bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600">
              Passer la commande
            </button>
          </div>
        </div>
      )}
      
      <Link href="/produits" className="mt-6 inline-block text-blue-500">
        ← Continuer vos achats
      </Link>
    </div>
  );
}

export async function getServerSideProps(context) {
  return {
    props: {
      clientId: context.params.clientId,
    },
  };
}