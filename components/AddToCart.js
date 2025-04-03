import { useState } from 'react';

export default function AddToCart({ produitId, clientId }) {
  // const [quantite, setQuantite] = useState(1);
  const [loading, setLoading] = useState(false);
  // const [message, setMessage] = useState('');

  const handleAddToCart = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/panier?clientId=${clientId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ produitId, quantite }),
      });

      if (response.ok) {
        setMessage('Produit ajouté au panier!');
      } else {
        setMessage('Erreur lors de l\'ajout');
      }
    } catch (error) {
      setMessage('Erreur réseau');
    } finally {
      setLoading(false);
    }

    // Router.reload();
    
  };

  return (
    <div className="mt-2">
      <button
        onClick={handleAddToCart}
        disabled={loading}
        className="text-black px-1 text-sm py-2 rounded hover:bg-green-900 hover:text-white transition-colors duration-400" 
      >
        {loading ? 'Ajout...' : 'Ajouter au panier'}
      </button>
    </div>
  );
}