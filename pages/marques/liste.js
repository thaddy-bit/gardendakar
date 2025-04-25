// pages/categories/[categoryId].js
import Layout from '../../components/Layout';
import Image from 'next/image';

import Link from 'next/link'; // Pour gérer les liens
import { useRouter } from "next/router";
import { useEffect, useState } from 'react';


export default function CategoryProducts() {

const router = useRouter();
const [categories, setCategories] = useState([]);


// Liste des catégories
useEffect(() => {
    // afficher les catégories
    try {
        async function fetchData() {
        const response = await fetch('/api/categories');
        const data = await response.json();
        setCategories(data);
        }
        fetchData();

    } catch (error) {
        setCategories(null);
    }
    
}, []);

const handleAddToCart = (product) => {
  setSelectedProduct(product);
  setIsModalOpen(true);
  };

  const kya = async () => {
    
  };


  return (
    <Layout>
      <div className="bg-white py-12 px-4 sm:px-6 lg:px-8">
          <div className='bg-white p-2 w-full top-0 z-50'>
            <h2 className="ml-10">KYA / Découvrez ici nos marques Africaines et internationale </h2>
          </div>
          
            <div className="max-w-7xl mx-auto mt-10">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 lg:m-15 lg:pl-2 lg:pr-2  xl:grid-cols-4 gap-6">
                    {categories.map((item) => (
                    <div key={item.id} className="bg-white overflow-hidden hover:shadow-xl transition-shadow duration-300">
                        <div className="relative">
                        <div>
                          <Link href={`/produits/${item.id}`} passHref legacyBehavior>
                            <a className="block">
                              <Image
                                width={3050}
                                height={2000}
                                src={item.image_url || '/fallback-image.jpg'}
                                alt={item.nom || 'Produit sans nom'}
                                className="w-full h-64 object-cover cursor-pointer hover:opacity-90 transition-opacity"
                                onError={(e) => {
                                  e.currentTarget.src = '/fallback-image.jpg';
                                }}
                              />
                            </a>
                          </Link>
                        </div>
                        </div>
                        <div className="p-2">
                            <h3 className="text-xl text-center mb-2">{item.nom}</h3>
                        </div>
                    </div>
                    ))}
                </div>
            </div>
      </div>
    </Layout>
  );
}
