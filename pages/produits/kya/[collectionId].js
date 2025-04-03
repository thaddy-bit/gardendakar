// pages/categories/[categoryId].js
import Master from '../../../components/Master';
import Image from 'next/image';

import Link from 'next/link'; // Pour gérer les liens
import { useRouter } from "next/router";
import {useEffect, useState, useContext} from 'react';
import { CartContext } from "../../../context/CartContext";


export default function CategoryProducts() {
  const { setCartCount } = useContext(CartContext);
  const router = useRouter();
  const { collectionId } = router.query;
  const [products, setProducts] = useState([]); // Store fetched products
  const [categoryName, setCategoryName] = useState("Loading..."); // Store category name
  const [categoryDescription, setCategoryDescription] = useState(""); // Store category name
  const [loading, setLoading] = useState(true); // Track loading state
  // const [error, setError] = useState(null); // Handle errors
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [favorites, setFavorites] = useState([]); // État pour les favoris
  const [likes, setLikes] = useState([]); // État pour les likes
  // const [quantite, setQuantite] = useState(1);
  // const [message, setMessage] = useState('');
  // const [productId, setProductId] = useState('');
  const [user, setUser] = useState(null);
  
  // // Vérifie si l'utilisateur est connecté
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("/api/auth/me");
        if (!res.ok) throw new Error("Non connecté");
        const data = await res.json();
        setUser(data); // Stocker l'utilisateur
      } catch (error) {
        setUser(null);
      }
    };

    fetchUser();
  }, []);
 
    // Fonction pour ajouter un produit au panier avec une quantité
  const ajouterAuPanier = async (produit) => {
    if (!user) return;
        const clientId = user[0];
        const ID = clientId.id;

    try {
      const res = await fetch("/api/panier/ajouter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ produitId: produit.id, userId: ID, quantite: 1 }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      alert(data.message); // Affiche le message de succès
    } catch (error) {
      console.error("Erreur :", error);
    }
  };
    /////////////////////////////////////////

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
    if (!collectionId) return; // Ensure categoryId is available before fetching

    const fetchData = async () => {
      try {
        setLoading(true);

        // Fetch products for the category
        const resProducts = await fetch(`/api/products/kya/${collectionId}`);
        const productsData = await resProducts.json();

        /*
        // Fetch category list to get the category name
        const resCategories = await fetch(`/api/categories`);
        const categoriesData = await resCategories.json();

        // Find the specific category name
        const category = categoriesData.find((cat) => cat.id === parseInt(categoryId));
        const categoryName = category ? category.nom : "Catégorie inconnue";
        const categoryDescription = category ? category.description : " Aucune description trouvé";

        */
        // Update state
        setProducts(productsData);
        // setCategoryName(categoryName);
        // setCategoryDescription(categoryDescription);

      } catch (err) {
        console.error("Erreur lors de la récupération des produits :", err);
        setError("Une erreur est survenue.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [collectionId]);


  return (
    <Master>
      
      <div className="bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
          <div className='bg-gray-200 p-2 w-full top-0 z-50'>
            <h2 className="ml-10">KYA / COLLECTIONS AFRICAINES</h2>
          </div>
            <div className="max-w-7xl mx-auto">

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 lg:m-15 lg:pl-2 lg:pr-2  xl:grid-cols-4 gap-6">
                    {products.map((product) => (
                    <div key={product.id} className="bg-white overflow-hidden hover:shadow-xl transition-shadow duration-300">
                        
                        <div className="relative">
                          <div>
                            <Link href="#" onClick={() => handleAddToCart(product)}>
                              <Image
                                width={3000} 
                                height={1000}
                                src={product.image_url}
                                alt={product.nom}
                                className="w-full h-64 object-cover"
                              />
                            </Link>
                              
                              {/* Badge "New" */}
                              {product.isNew && (
                              <div className="absolute top-2 right-2 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                                  New
                              </div>
                              )}
                          </div>
                        </div>

                        <div className="p-2">
                            <h3 className="text-xl font-semibold mb-2">{product.nom}</h3>
                            <div className="flex items-center mb-4">
                            {/* Affichage des étoiles */}
                            {[...Array(5)].map((_, i) => (
                                <svg
                                key={i}
                                className={`h-5 w-5 ${
                                    i < Math.round(product.rating)
                                    ? "text-yellow-400"
                                    : "text-gray-300"
                                }`}
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                                >
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                            ))}
                            <span className="ml-2 text-gray-600">({product.reviews} avis)</span>
                            </div>
                            <p className="text-1xl font-bold text-gray-900 mb-4">FCFA {product.prix.toFixed(0)}</p>
                            
                            <div className='flex w-full'>
                            <button
                              onClick={() => ajouterAuPanier(product)}
                              disabled={loading}
                              className="text-black px-1 text-sm py-2 rounded hover:bg-amber-50 hover:text-black transition-colors duration-400" 
                            >
                              {loading ? 'Ajout...' : 'Ajouter au panier'}
                            </button>

                               

                              {/* Boutons Favori et Like */}
                              <div className="flex ml-15 lg:ml-3 space-x-3 mb-2">
                                  <button
                                    onClick={() => handleFavorite(product.id)}
                                    className="p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors duration-300"
                                  >
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      className={`h-6 w-6 ${
                                        favorites.includes(product.id) ? "text-red-500" : "text-gray-500"
                                      }`}
                                      fill={favorites.includes(product.id) ? "currentColor" : "none"}
                                      viewBox="0 0 24 24"
                                      stroke="currentColor"
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                                      />
                                    </svg>
                                  </button>
                                  <button
                                    onClick={() => handleLike(product.id)}
                                    className="p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors duration-300"
                                  >
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      className={`h-6 w-6 ${
                                        likes.includes(product.id) ? "text-blue-500" : "text-gray-500"
                                      }`}
                                      fill={likes.includes(product.id) ? "currentColor" : "none"}
                                      viewBox="0 0 24 24"
                                      stroke="currentColor"
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"
                                      />
                                    </svg>
                                  </button>
                              </div>
                              
                            </div>
                        </div>
                    </div>
                    ))}
                </div>
            </div>
      </div>

        {isModalOpen && selectedProduct && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg shadow-lg w-11/12 md:w-1/2 lg:w-1/3 p-2">
                <div>
                    <Image
                    width={3000} 
                    height={1000}
                    src={selectedProduct.image_url}
                    alt={selectedProduct.nom}
                    className="w-full h-60 object-cover mb-4"
                    />
                </div>
                <div className='mb-9'>
                    <h2 className="font-bold mb-4">{selectedProduct.nom}</h2>
                    <p className="text-gray-700 mb-4">{selectedProduct.description}</p>
                </div>
                <div className='flex mb-9'>
                  <p className="font-bold text-gray-900 mb-4 mt-1">FCFA {selectedProduct.prix.toFixed(0)}</p>
                  <div className="flex items-center ml-9 pl-9 mb-5">
                    <button
                      onClick={() => handleQuantityChange("decrease")}
                      className="px-3 py-1 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors duration-300"
                    >
                      -
                    </button>
                    <span className="mx-4 text-xl font-semibold">{quantity}</span>
                    <button
                      onClick={() => handleQuantityChange("increase")}
                      className="px-3 py-1 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors duration-300"
                    >
                      +
                    </button>
                </div>
                </div>
              
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-1 mt-12 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors duration-300"
                >
                  Fermer
                </button>
                
              </div>
          </div>
        </div>
      )}

    </Master>
  );
}