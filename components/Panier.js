import { useEffect, useState } from "react";

export default function Panier({ clientId }) {
  const [panier, setPanier] = useState([]); // Initialiser comme un tableau vide
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPanier = async () => {
      try {
        const response = await fetch(`/api/panier?client_id=${clientId}`);
        const data = await response.json();

        if (Array.isArray(data)) {
          setPanier(data);
        } else {
          setPanier([]); // Si l'API ne retourne pas un tableau, on met un tableau vide
        }
      } catch (err) {
        console.error("Erreur lors de la récupération du panier :", err);
        setError("Erreur lors de la récupération du panier.");
      } finally {
        setLoading(false);
      }
    };

    fetchPanier();
  }, [clientId]);

  if (loading) return <p>Chargement du panier...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="p-4 border rounded-lg shadow-lg">
      <h2 className="text-xl font-bold mb-2">Votre Panier</h2>
      {panier.length === 0 ? (
        <p className="text-gray-500">Votre panier est vide.</p>
      ) : (
        <ul className="space-y-2">
          {panier.map((item) => (
            <li key={item.id} className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <img src={item.image_url} alt={item.nom} className="w-12 h-12 object-cover" />
                <div>
                  <p className="font-semibold">{item.nom}</p>
                  <p className="text-gray-600">{item.prix}€ x {item.quantite}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
