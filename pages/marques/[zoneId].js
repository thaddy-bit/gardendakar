// pages/categories/[categoryId].js
import Master from '../../components/Master';
import Image from 'next/image';

import Link from 'next/link'; // Pour gérer les liens
import { useRouter } from "next/router";
import {useEffect, useState, useContext} from 'react';
import { CartContext } from "../../context/CartContext";


export default function CategoryProducts() {
  const { setCartCount } = useContext(CartContext);
  const router = useRouter();
  const { zoneId } = router.query;
  const [products, setProducts] = useState([]); // Store fetched products
  const [categoryName, setCategoryName] = useState("Loading..."); // Store category name
  const [categoryDescription, setCategoryDescription] = useState(""); // Store category name
  const [loading, setLoading] = useState(true); // Track loading state
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [favorites, setFavorites] = useState([]); // État pour les favoris
  const [likes, setLikes] = useState([]); // État pour les likes
  const [collection, setCollection] = useState([]); // 

  
  const [user, setUser] = useState(null);

 

  const handleAddToCart = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
    };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
    setQuantity(1);
  };


  const handleFavorite = (productId) => {
    if (favorites.includes(productId)) {
      setFavorites(favorites.filter((id) => id !== productId)); // Retirer des favoris
    } else {
      setFavorites([...favorites, productId]); // Ajouter aux favoris
    }
  };

  const handleLike = (productId) => {
    if (likes.includes(productId)) {
      setLikes(likes.filter((id) => id !== productId)); // Retirer le like
    } else {
      setLikes([...likes, productId]); // Ajouter le like
    }
  };

  const handleQuantityChange = (action) => {
    if (action === "increase") {
      setQuantity(quantity + 1);
    } else if (action === "decrease" && quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const [quantity, setQuantity] = useState(1); // État pour la quantité

  useEffect(() => {
    if (!zoneId) return; // Ensure zoneId is available before fetching

    const fetchData = async () => {
      try {
        setLoading(true);
        // Fetch products for the category
        const resProducts = await fetch(`/api/marques/${zoneId}`);
        const productsData = await resProducts.json();
        
        setCollection(productsData);

      } catch (err) {
        console.error("Erreur lors de la récupération des produits :", err);
        setError("Une erreur est survenue.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [zoneId]);


  return (
    <Master>
        <div className="bg-white py-12 px-4 sm:px-6 lg:px-8">
            <div className='bg-[#FFFFFFFF] shadow-sm p-2 w-full top-0 z-50'>
                <h2 className="ml-10">KYA / COLLECTIONS AFRICAINES </h2>
            </div>
                <div className="max-w-7xl mx-auto mt-10">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 lg:m-15 lg:pl-2 lg:pr-2  xl:grid-cols-4 gap-6">
                        {collection.map((item) => (
                        <div key={item.id} className="bg-white overflow-hidden hover:shadow-xl transition-shadow duration-300">
                            <div className="relative">
                            <div>
                            <Link href={`/produits/kya/${item.id}`} passHref legacyBehavior>
                                <a className="block">
                                <Image
                                    width={3000}
                                    priority
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
    </Master>
  );
}