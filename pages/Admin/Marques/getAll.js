// pages/categories/[categoryId].js

import Layout from '../../../components/Admin/Layout';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from "next/router";
import { useEffect, useState } from 'react';

export default function CategoryProducts() {
  const router = useRouter();
  const [categories, setCategories] = useState([]);
  const [collection, setCollection] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { categoryId } = router.query;

  // Charger les catégories au montage
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('/api/categories');
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error("Erreur lors du chargement des catégories :", error);
        setCategories([]);
      }
    }
    fetchData();
  }, []);

  // Récupérer les sous-collections pour une catégorie donnée
  const ListeSousCollection = async (IdCat) => {
    try {
      setLoading(true);
      const res = await fetch(`/api/sous_collection/${IdCat}`);
      const data = await res.json();
      console.log("Sous-collections reçues :", data); // <- Ajoute ça
      setCollection(data);
      setError(null);
    } catch (err) {
      console.error("Erreur lors de la récupération des sous-collections :", err);
      setError("Impossible de charger les sous-catégories.");
      setCollection([]);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = (categorie) => {
    console.log("Collection sélectionnée :", categorie); // <- Ajoute ça
    ListeSousCollection(categorie.id);
    setSelectedProduct(categorie);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
    setCollection([]);
  };

  return (
    <Layout>
      <div className="bg-white sm:px-6 lg:px-8 mb-12">
        <div className='bg-gray-50 flex w-full space-x-10'>
          <h2 className="ml-10 text-center text-2xl font-semibold py-6">Liste des Collections</h2>
        </div>

        <div className='flex w-full'>
          <Link
            href="/Admin/Marques/add"
            className="px-4 py-2 ml-9 mt-4 text-sm bg-amber-200 hover:bg-amber-300 transition duration-400 rounded-lg"
          >
            NOUVELLE COLLECTION
          </Link>
        </div>

        <div className="max-w-7xl mx-auto mt-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 px-4">
            {categories.map((item) => (
              <div key={item.id} className="bg-white overflow-hidden hover:shadow-xl transition-shadow duration-300 rounded-md">
                <div className="relative cursor-pointer" onClick={() => handleAddToCart(item)}>
                  <Image
                    width={3000}
                    height={1000}
                    src={item.image_url}
                    alt={item.nom}
                    className="w-full h-64 object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-xl text-center font-medium">{item.nom}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && selectedProduct && (
        <div className="fixed inset-0 flex items-center justify-center w-full bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg shadow-lg w-11/12 md:w-2/3 lg:w-3/4 p-6 relative">
            <button onClick={closeModal} className="absolute top-4 right-4 text-gray-500 hover:text-red-500 text-2xl font-bold">
              &times;
            </button>

            <h2 className="text-2xl font-semibold mb-4 text-center">Sous-collections de {selectedProduct.nom}</h2>

            {loading && <p className="text-center text-gray-500">Chargement...</p>}
            {error && <p className="text-red-500 text-center">{error}</p>}

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {collection.map((sousCat) => (
                <div key={sousCat.id} className="bg-gray-100 p-4 rounded shadow">
                  <h4 className="font-semibold text-lg mb-1">{sousCat.nom}</h4>
                  <p className="text-sm text-gray-600">{sousCat.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}