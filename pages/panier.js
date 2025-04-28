import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Layout from '../components/Layout';
import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { ShoppingCart, Ticket, CreditCard, Delete } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import axios from 'axios';

export default function Panier() {
  const { setCartCount } = useContext(CartContext);
  const [user, setUser] = useState(null);
  const [Id, setId] = useState(null);
  const [panier, setPanier] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const shippingCost = 0; // Frais de livraison fixes
  const subtotal = panier.reduce((total, item) => total + (item.prix * item.quantite), 0);
  const [discount, setDiscount] = useState(0);
  const [couponCode, setCouponCode] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [livraison, setLivraison] = useState(0);
  const [adresse, setAdresse] = useState('Adresse du client');
  const totalFinal = subtotal;
  const [message, setMessage] = useState('');
  // + parseFloat(livraison || 0)
  

  const applyCoupon = () => {
    // Logique de vérification du coupon
    const validCoupons = {
      'REDUC10': 0.1,
      'SOLDES20': 0.2,
      'WELCOME15': 0.15
    };
    
    if (validCoupons[couponCode]) {
      setDiscount(validCoupons[couponCode] * subtotal);
    } else {
      alert('Code promo invalide');
    }
  };

  // Vérifie si l'utilisateur est connecté
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("/api/auth/me");
        if (!res.ok) return router.push("/login");

        const data = await res.json();
        setUser(data);
      } catch (error) {
        router.push("/login");
      }
    };

    fetchUser();
  }, []);

  const rafraichirPanier = async () => {
    try {
      const res = await fetch("/api/panier/count");
      const data = await res.json();
      setCartCount(data.total || 0);
    } catch (error) {
      console.error("Erreur lors de la mise à jour du panier :", error);
    }
  };

  // Récupérer le panier du client connecté
  useEffect(() => {
    if (!user) return;

    const clientId = user;
    setId(clientId.id);
    const ID = clientId.id;
    
    const fetchPanier = async () => {
      try {
        const res = await fetch(`/api/panier?client_id=${ID}`);
        const data = await res.json();
        setPanier(data);
      } catch (error) {
        console.error('Erreur:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPanier();
  }, [user]);

  // Supprimer un produit du panier
  const removeFromCart = async (produitId) => {
    try {
      await fetch(`/api/panier`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ client_id: Id, produitId }),
      });
      setPanier(panier.filter(item => item.produit_id !== produitId));

      rafraichirPanier(); // Met à jour le compteur

    } catch (error) {
      console.error('Erreur:', error);
    }
  };

  // Fonction pour passer la commande
  const handleCommande = async () => {
    if (panier.length === 0) {
      setMessage('Veuillez remplir tous les champs correctement.');
      return;
    }

    try {
      const res = await axios.post('/api/commandes', {
        client_id: Id,
        livraison,
        panier,
        total: totalFinal,
        adresse,
        mode_paiement: paymentMethod,
      });

      if (res.status === 200) {

        localStorage.removeItem('panier');
        setMessage('✅ Commande enregistrée avec succès !');
        setTimeout(() => {
          router.push('/'); // rediriger ailleurs si besoin
        }, 2000);
      }
    } catch (error) {
      console.error(error);
      setMessage('❌ Une erreur est survenue.');
    }
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* Section Articles */}
        <div className="lg:col-span-2">
          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
              {message && (
                <div className="mb-4 text-sm text-center p-2 rounded bg-green-100 text-green-700">
                  {message}
                </div>
              )}
              
              <h2 className="text-lg font-medium text-gray-900 flex items-center">
                <ShoppingCart className="h-5 w-5 mr-2" />
                Votre panier ({panier.length} {panier.length > 1 ? 'articles' : 'article'})
              </h2>
            </div>
            {loading ? (
              <p>Chargement...</p>
            ) : panier.length === 0 ? (
                <div className="p-6 text-center">
                  <p className="text-gray-500">Votre panier est vide</p>
                  <Link
                    href="/"
                    className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
                  >
                    Continuer vos achats
                  </Link>
                </div>
            ) : (
              <ul className="divide-y divide-gray-200">
                {panier.map((item) => (
                  <li key={item.id} className="p-4 sm:p-6">
                    <div className="flex flex-col sm:flex-row">

                      <div className="flex-shrink-0 mb-4 sm:mb-0">
                        <Image
                          width={3000} 
                          height={1000}
                          className="w-20 h-20 rounded-md object-cover"
                          src={item.image_url} 
                          alt={item.nom}
                        />
                      </div>

                      <div className="ml-0 sm:ml-6 flex-1">
                        <div className="flex flex-col sm:flex-row sm:justify-between">
                          <h3 className="text-lg font-medium text-gray-900">
                            {item.nom}
                          </h3>
                          <p className="mt-1 sm:mt-0 text-lg font-semibold text-gray-900">
                            {(item.prix * item.quantite).toLocaleString('fr-FR')} FCFA
                          </p>
                        </div>
                        <div className="mt-2 flex items-center">
                          <span className="text-gray-500 mr-4">
                            Qté: {item.quantite}
                          </span>
                          <button
                            className="text-red-600 hover:text-red-800 text-sm font-medium"
                            onClick={() => removeFromCart(item.produit_id)}
                          >
                            <Delete className="h-8 w-6 mr-2 text-red-500 hover:text-red-700"/>
                          </button>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className="mt-6 border-t pt-4">
              <p className="text-xl font-semibold mb-10">
                Total: FCFA {panier.reduce((total, item) => total + (item.prix * item.quantite), 0).toLocaleString('fr-FR')}
              </p>
              <div className='space-x-4'>
                <button 
                  className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600"
                  onClick={handleCommande} // Ajouter cette fonction pour passer la commande
                >
                  Passer la commande
                </button>
                <button onClick={() => router.push('/')} className="mt-6 text-blue-500">
                  ← Continuer vos achats
                </button>
              </div>
          </div>
        </div>

        {/* Récapitulatif */}
        <div className="space-y-6">
          {/* Code promo */}
          <div className="bg-white shadow overflow-hidden sm:rounded-lg p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
              <Ticket className="h-5 w-5 mr-2 text-purple-600" />
              Code promo
            </h3>
            <div className="flex space-x-2">
              <input
                type="text"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                className="border border-gray-300 rounded-md px-4 py-2 w-full"
                placeholder="Entrez votre code promo"
              />
              <button
                onClick={applyCoupon}
                className="bg-indigo-600 text-white px-4 py-2 rounded-md"
              >
                Appliquer
              </button>
            </div>
          </div>

          {/* Méthodes de paiement */}
          <div className="bg-white shadow overflow-hidden sm:rounded-lg p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
              <CreditCard className="h-5 w-5 mr-2 text-blue-600" />
              Méthode de paiement
            </h3>
            <select
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="border border-gray-300 rounded-md px-4 py-2 w-full"
            >
              <option value="">Choisissez une méthode</option>
              <option value="Carte bancaire">Carte bancaire</option>
              <option value="Orange Money">Orange Money</option>
              <option value="Wave">Wave</option>
              <option value="Kpay">Kpay</option>
            </select>
          </div>
        </div>

      </div>
      </div>
    </Layout>
  );
}