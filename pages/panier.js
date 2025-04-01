import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Layout from '../components/Layout';
import { Delete } from 'lucide-react';
import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { ShoppingCart, Ticket, CreditCard } from 'lucide-react';
import Link from 'next/link';

// import { ShoppingCartIcon, TicketIcon } from '@heroicons/react/24/outline';
// import { CreditCardIcon, DevicePhoneMobileIcon, CurrencyDollarIcon } from '@heroicons/react/24/solid';


export default function Panier() {
  const { setCartCount } = useContext(CartContext);
  const [user, setUser] = useState(null);
  const [Id, setId] = useState(null);
  const [panier, setPanier] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const shippingCost = 0; // Frais de livraison fixes
  const subtotal = panier.reduce((total, item) => total + (item.prix * item.quantite), 0).toFixed(0);
  const [discount, setDiscount] = useState(0);
  const [couponCode, setCouponCode] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');

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
    const clientId = user[0];
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

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* Section Articles */}
        <div className="lg:col-span-2">
          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
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
                        <img
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
                            {(item.prix * item.quantite).toFixed(0)} FCFA
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
                            Supprimer
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
                Total: FCFA {panier.reduce((total, item) => total + (item.prix * item.quantite), 0).toFixed(0)}
              </p>
              <div className='space-x-4'>
                <button className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600">
                  Passer la commande
                </button>
                <button onClick={() => router.push('/')} className="mt-6 text-blue-500">
                  ← Continuer vos achats
                </button>
              </div>
              
          </div>
        </div>

        {/* Section Récapitulatif */}
        <div className="space-y-6">
          {/* Code promo */}
          <div className="bg-white shadow overflow-hidden sm:rounded-lg p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
              <Ticket className="h-5 w-5 mr-2 text-purple-600" />
              Code promo
            </h3>
            <div className="flex">
              <input
                type="text"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                placeholder="Entrez votre code"
                className="flex-1 rounded-l-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 border p-2"
              />
              <button
                onClick={applyCoupon}
                className="bg-purple-600 text-white px-4 py-2 rounded-r-md hover:bg-purple-700 transition-colors"
              >
                Appliquer
              </button>
            </div>
            {discount > 0 && (
              <p className="mt-2 text-green-600 text-sm">
                Réduction de {(discount / subtotal * 100).toFixed(0)}% appliquée !
              </p>
            )}
          </div>

          {/* Paiement */}
          <div className="bg-white shadow overflow-hidden sm:rounded-lg p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Mode de paiement
            </h3>
            <div className="space-y-4">
              <div className="flex items-center">
                <input
                  id="credit-card"
                  name="payment"
                  type="radio"
                  checked={paymentMethod === 'credit-card'}
                  onChange={() => setPaymentMethod('credit-card')}
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                />
                <label htmlFor="credit-card" className="ml-3 flex items-center">
                  <CreditCard className="h-5 w-5 text-gray-500 mr-2" />
                  <span className="block text-sm font-medium text-gray-700">
                    Carte de crédit
                  </span>
                </label>
              </div>

              <div className="flex items-center">
                <input
                  id="orange-money"
                  name="payment"
                  type="radio"
                  checked={paymentMethod === 'orange-money'}
                  onChange={() => setPaymentMethod('orange-money')}
                  className="h-4 w-4 text-orange-500 focus:ring-orange-500 border-gray-300"
                />
                <label htmlFor="orange-money" className="ml-3 flex items-center">
                  <CreditCard className="h-5 w-5 text-orange-500 mr-2" />
                  <span className="block text-sm font-medium text-gray-700">
                    Orange Money
                  </span>
                </label>
              </div>

              <div className="flex items-center">
                <input
                  id="wave"
                  name="payment"
                  type="radio"
                  checked={paymentMethod === 'wave'}
                  onChange={() => setPaymentMethod('wave')}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                />
                <label htmlFor="wave" className="ml-3 flex items-center">
                  <CreditCard className="h-5 w-5 text-blue-600 mr-2" />
                  <span className="block text-sm font-medium text-gray-700">
                    Wave
                  </span>
                </label>
              </div>

              <div className="flex items-center">
                <input
                  id="kpay"
                  name="payment"
                  type="radio"
                  checked={paymentMethod === 'kpay'}
                  onChange={() => setPaymentMethod('kpay')}
                  className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300"
                />
                <label htmlFor="kpay" className="ml-3 flex items-center">
                  <CreditCard className="h-5 w-5 text-green-600 mr-2" />
                  <span className="block text-sm font-medium text-gray-700">
                    KPay
                  </span>
                </label>
              </div>
            </div>
          </div>

          {/* Récapitulatif de commande */}
          <div className="bg-white shadow overflow-hidden sm:rounded-lg p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Récapitulatif
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Sous-total</span>
                <span className="font-medium">{subtotal} FCFA</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Livraison</span>
                <span className="font-medium">{shippingCost} FCFA</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Réduction</span>
                  <span className="text-green-600 font-medium">-{discount} FCFA</span>
                </div>
              )}
              <div className="border-t border-gray-200 pt-3 mt-3 flex justify-between">
                <span className="text-lg font-medium">Total</span>
                <span className="text-lg font-bold">{subtotal} FCFA</span>
              </div>
            </div>

            <button
              disabled={!paymentMethod || panier.length === 0}
              className={`mt-6 w-full flex justify-center items-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white ${!paymentMethod || panier.length === 0 ? 'bg-gray-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700'}`}
            >
              Payer maintenant
            </button>
          </div>
         </div>

      </div>
      </div>
    </Layout>
  );
}
