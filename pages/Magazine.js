// import React, { useState } from 'react';
import Layout from '../components/Layout';
import Image from 'next/image';


const products = [
    {
      id: 1,
      name: "Sac à dos élégant",
      price: 49.99,
      image: "/images/i2.jpg",
      rating: 4.5,
      reviews: 120,
      isNew: true, // Ajout d'une propriété pour les nouveaux produits
    },
    {
      id: 2,
      name: "Chaussures de sport",
      price: 89.99,
      image: "/images/i3.jpg",
      rating: 4.7,
      reviews: 95,
      isNew: false, // Ajout d'une propriété pour les nouveaux produits
    },
    {
      id: 3,
      name: "Montre connectée",
      price: 129.99,
      image: "/images/i3.jpg",
      rating: 4.2,
      reviews: 80,
      isNew: true, // Ajout d'une propriété pour les nouveaux produits
    },
    {
      id: 4,
      name: "Casque audio sans fil",
      price: 59.99,
      image: "/images/i2.jpg",
      rating: 4.8,
      reviews: 150,
      isNew: true, // Ajout d'une propriété pour les nouveaux produits
    },
    {
      id: 5,
      name: "Lunettes de soleil",
      price: 29.99,
      image: "/images/i2.jpg",
      rating: 4.0,
      reviews: 60,
      isNew: true, // Ajout d'une propriété pour les nouveaux produits
    },
    {
      id: 6,
      name: "T-shirt en coton",
      price: 19.99,
      image: "/images/i3.jpg",
      rating: 4.6,
      reviews: 200,
      isNew: false, // Ajout d'une propriété pour les nouveaux produits
    },
    {
        id: 7,
        name: "Sac à dos élégant",
        price: 49.99,
        image: "/images/i2.jpg",
        rating: 4.5,
        reviews: 120,
        isNew: true, // Ajout d'une propriété pour les nouveaux produits
      },
      {
        id: 8,
        name: "Chaussures de sport",
        price: 89.99,
        image: "/images/i3.jpg",
        rating: 4.7,
        reviews: 95,
        isNew: false, // Ajout d'une propriété pour les nouveaux produits
      },
      {
        id: 9,
        name: "Montre connectée",
        price: 129.99,
        image: "/images/i3.jpg",
        rating: 4.2,
        reviews: 80,
        isNew: true, // Ajout d'une propriété pour les nouveaux produits
      },
      {
        id: 10,
        name: "Casque audio sans fil",
        price: 59.99,
        image: "/images/i2.jpg",
        rating: 4.8,
        reviews: 150,
        isNew: true, // Ajout d'une propriété pour les nouveaux produits
      },
      {
        id: 11,
        name: "Lunettes de soleil",
        price: 29.99,
        image: "/images/i2.jpg",
        rating: 4.0,
        reviews: 60,
        isNew: true, // Ajout d'une propriété pour les nouveaux produits
      },
      {
        id: 12,
        name: "T-shirt en coton",
        price: 19.99,
        image: "/images/i3.jpg",
        rating: 4.6,
        reviews: 200,
        isNew: false, // Ajout d'une propriété pour les nouveaux produits
      },
  ];  


export default function Magazine() {
  // const [selectedProduct, setSelectedProduct] = useState(null);
  // const [isModalOpen, setIsModalOpen] = useState(false);

/*
  const handleAddToCart = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };
*/
  const titre = "Magazine";

  return (
    <Layout>

        <div className="bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
                <div className='bg-gray-200 p-2 w-full top-0 z-50 mb-8'>
                  <h2 className="ml-10">Garden  / {titre}</h2> 
                </div>
            <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 lg:m-5 lg:p-5 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <div key={product.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <div className="relative">
                <Image
                  width={3000} 
                  height={1000}
                  src={product.image}
                  alt={product.name}
                  className="w-full h-64 object-cover"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>

    </Layout>

  );
}