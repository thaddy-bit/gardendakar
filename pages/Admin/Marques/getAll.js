// pages/categories/[categoryId].js
import Layout from '../../../components/Layout';
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


  return (
    <Layout>
      
      <div className="bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
          <div className='bg-gray-200 p-2 w-full top-0 z-50'>
            <h2 className="ml-10">Garden / Store </h2>
          </div>
            <div className="max-w-7xl mx-auto">
                
                    <h2 className="text-justify mb-8 mt-8">
                    OK
                    </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 lg:m-15 lg:pl-2 lg:pr-2  xl:grid-cols-4 gap-6">
                    {categories.map((item) => (
                    <div key={item.id} className="bg-white overflow-hidden hover:shadow-xl transition-shadow duration-300">
                        
                        <div className="relative">
                          <div>
                            <Link href="#">
                              <Image
                                width={3000}
                                height={1000}
                                src={item.image_url}
                                alt={item.nom}
                                className="w-full h-64 object-cover"
                              />
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
