import { useState, useEffect } from 'react';
import { getSession } from 'next-auth/react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import Layout from '../../components/Layout';
import { Delete } from 'lucide-react';
import Router from 'next/router';

import { useRouter } from "next/router";

export default function Panier() {
  const [user, setUser] = useState(null);
  const [panier, setPanier] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  // // Vérifie si l'utilisateur est connecté
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("/api/auth/me");
        if (!res.ok) router.push("/login");
        const data = await res.json();
        setUser(data); // Stocker l'utilisateur
      } catch (error) {
        router.push("/login"); 
        //setUser(null);
      }
    };
    fetchUser();

    if(user){
      console.log(" le numero du client est : ",user.id);
    }
  }, []);
  /////////////////////

  useEffect(() => {
    if (!user) return; // Attendre que `user` soit défini

    // console.log("Utilisateur connecté :", user);
    const clientId = user[0];

    // console.log("Utilisateur connecté en ID :", clientId.id);

    const ID = clientId.id;
    const fetchPanier = async () => {
      try {
        const res = await fetch(`/api/panier?clientId=${ID}`);
        const data = await res.json();
        setPanier(data);
      } catch (error) {
        console.error('Erreur:', error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchPanier();
  }, [user]); // Se réexécute quand `user` change

  // vérification du coupon
  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Coupon valide`);
  };

  const [formData, setFormData] = useState({
          name: "",
          email: "",
          date: "",
          time: "",
    });

    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
    };


  const removeFromCart = async (produitId) => {
    try {
      await fetch(`/api/panier?clientId=${user.id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ produitId }),
      });
      setPanier(panier.filter(item => item.produit_id !== produitId));
    } catch (error) {
      console.error('Erreur:', error);
    }
    Router.reload();
  };
  

  return user ? (
    <Layout>
    <div className="bg-gray-100 py-2 px-4 sm:px-6 lg:px-8">
      <div className='p-2 w-full top-0 z-50'>
        <h1 className="text-2xl text-center font-bold mb-6 border-b pb-5"> Mon Panier</h1>
        {panier.length === 0 ? (
          <p>Votre panier est encore vide</p>
        ) : (
          <div className="space-y-4">
            {panier.map((item) => (
              <div key={item.id} className="lg:ml-50 lg:mr-50 bg-gray-200 p-2 flex transition-shadow rounded items-center">
                <img 
                  src={item.image_url} 
                  alt={item.nom}
                  className="w-30 h-30 object-cover mr-4"
                />
                <div className="flex-grow">
                  <h3 className="font-medium text-bold lg:text-2xl">{item.nom}</h3>
                  <p>Prix: FCFA {item.prix.toFixed(0)}</p>
                  <p>Quantité: {item.quantite}</p>
                </div>
                <div className='fex'>
                  {/* Panier */}
                <Link href="" onClick={() => removeFromCart(item.produit_id)} className="relative">
                  <Delete className="w-8 h-8 text-red-500 hover:text-red-400" />
                </Link>
                </div>
              </div>
            ))}
            
            <div className="mt-6 border-t pt-4 lg:ml-50 lg:mr-50">
              <p className="text-xl font-semibold mb-10">
                Total: FCFA
                {panier.reduce((total, item) => 
                  total + ( item.prix * item.quantite), 0).toFixed(0)}
              </p>
              <div>
                {/* Formulaire de rendez-vous */}
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className='flex space-x-3 lg:space-x-8 mb-5'>
                    <div>
                      <label htmlFor="name" className="block text-sm lg:text-sm font-medium">
                        Numéro du coupon
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-900"
                        required
                      />
                    </div>
                    <div className='flex'>
                      <div className="justify-end space-x-2 pt-5">
                        <button
                          type="submit"
                          className="pl-2 pr-2 pt-3 pb-3 py-2 bg-green-900 text-white text-xs lg:text-sm rounded-lg hover:bg-green-800 transition-colors duration-300"
                        >
                          Vérifier le coupon
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
                <div>
                  <p className="lg:text-xs text-xs  font-semibold mb-10">
                      Réduction appliqué : FCFA <span className='text-red-500 text-sm'> 0 </span>
                  </p>
                </div>

                <div className='flex space-x-4'>
                  <div>
                    <p className="lg:text-xl text-xs  font-semibold mb-10">
                        Mode de paiement : 
                    </p>
                  </div>
                  <div>
                    <select id="countries" className="text-sm rounded-lg w-full p-2 dark:bg-green-900 dark:placeholder-green-900 dark:text-white">
                      <option selected>
                        Sélectionner un mode de paiement
                      </option>
                    </select>
                </div>
                </div>
                
              </div>

              <button className="mt-4 bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600">
                Passer la commande
              </button>
            </div>
          </div>
        )}
        
        <Link href="/" className="mt-6 inline-block text-blue-500 mb-20 mt-20 lg:ml-50 lg:mr-50">
          ← Continuer vos achats
        </Link>
      </div>
    </div>
    </Layout>
  ) : (
    <Layout>
      <div className="text-center">Chargement...</div>
    </Layout>
  );

}


//////////////////////////

