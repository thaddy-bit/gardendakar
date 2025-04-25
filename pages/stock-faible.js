import { useEffect, useState } from "react";
import Layout from "../components/Admin/Layout";

export default function StockFaible() {
  const [produits, setProduits] = useState([]);

  useEffect(() => {
    fetch("/api/stock-faible")
      .then((res) => res.json())
      .then((data) => setProduits(data))
      .catch((err) => console.error("Erreur fetch:", err));
  }, []);

  return (
    <Layout>
      <div className="min-h-screen p-6 bg-gray-100">
      <h1 className="text-2xl font-bold mb-6 text-red-600">Produits en Stock Faible</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {produits.map((prod) => (
          <div key={prod.id} className="bg-white rounded-xl shadow p-4">
            <img src={prod.imae_url} alt={prod.nom} className="w-full h-40 object-cover rounded-md" />
            <h2 className="text-lg font-semibold mt-2">{prod.nom}</h2>
            <p className="text-sm text-gray-500">{prod.description}</p>
            <div className="mt-2 flex justify-between items-center">
              <span className="text-green-700 font-bold">{prod.prix} €</span>
              <span className="bg-red-100 text-red-700 text-xs px-2 py-1 rounded">
                Stock : {prod.quantite}
              </span>
            </div>
          </div>
        ))}
      </div>
      </div>
    </Layout>
  );
}