import React, { useEffect, useState } from "react";
import Layout from "../../../components/Admin/Layout";
import Image from "next/image";
import axios from "axios";

export default function StockFaible() {
  const [produits, setProduits] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduits = async () => {
      try {
        const res = await axios.get("/api/produits/stock-faible");
        setProduits(res.data.produits);
      } catch (err) {
        console.error("Erreur lors du chargement des produits :", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduits();
  }, []);

  return (
    <Layout>
      <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Produits en Stock Faible</h1>

      {loading ? (
        <p>Chargement...</p>
      ) : produits.length === 0 ? (
        <p className="text-green-600">Tous les produits ont un stock suffisant 👌</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {produits.map((produit) => (
            <div
              key={produit.id}
              className="bg-white shadow-md rounded-xl overflow-hidden border border-red-200"
            >
              <div className="relative w-full h-48">
                <Image
                  src={produit.image_url || "/images/placeholder.png"}
                  alt={produit.nom}
                  layout="fill"
                  objectFit="cover"
                />
              </div>
              <div className="p-4 space-y-2">
                <h2 className="text-lg font-semibold text-gray-800">{produit.nom}</h2>
                <p className="text-sm text-gray-500">Prix : {produit.prix} €</p>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-red-600 font-semibold">
                    Stock : {produit.quantite}
                  </span>
                  <span className="bg-red-100 text-red-600 text-xs px-2 py-1 rounded-full animate-pulse">
                    Stock critique
                  </span>
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