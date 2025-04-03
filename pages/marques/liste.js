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
      <div className="bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
          <div className='bg-white p-2 w-full top-0 z-50'>
            <h2 className="ml-10">Garden / Store Découvrez ici nos marques Africaines et internationale </h2>
          </div>
          <div className="relative w-full h-[500px]  mt-10 overflow-hidden mb-30">
          <div className="relative h-[500px] w-full">
            {/* Image de fond */}
            <div className="absolute inset-0">
              <Image
                src="/images/kya.jpg" 
                priority 
                alt="Hero Image 1"
                fill
                className="object-cover"
              />
              <div className=" inset-0 bg-black bg-opacity-50"></div>
            </div>
            
            {/* Contenu superposé */}
            <div className="relative z-10 flex flex-col items-start justify-center h-full px-8 sm:px-16 lg:px-24 text-white">
              <h2 className="text-4xl sm:text-5l text-white lg:text-5xl font-bold mb-4 animate-fadeIn">
                DECOUVREZ LA MARQUE KYA LIFE STYLE
              </h2>
              <p className="text-xl sm:text-2xl text-white mb-9 max-w-lg animate-fadeIn delay-100">
                description
              </p>
              <Link 
                href={`/kya`}
                className="px-8 py-3 bg-green-900 hover:bg-green-800 rounded-md text-lg font-medium transition-colors animate-fadeIn delay-200">
                Découvrir
              </Link>
            </div>
          </div>
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
                                width={3000}
                                height={1000}
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
