'use client';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { Menu, X, ChevronDown, ShoppingCart, User } from 'lucide-react';

export default function Header() {
  
  const [user, setUser] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const [categories, setCategories] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [estOuvert, setEstOuvert] = useState(false);
  
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
  /////////////////////

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    window.location.href = '/';
  };


  const toggleDropdown = (menu) => {
    setDropdownOpen(dropdownOpen === menu ? null : menu);
  };

  return (
    
    <>
    <Head>
        <title>Garden</title>
        <meta name="description" content="Concept store et wellness" />
    </Head>

      <nav className="top-0 left-0 w-full border-b bg-white shadow-md z-50">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 p-5">
          <div className="flex justify-between w-full items-center h-16">
            {/* Logo */}
            <div className="text-black text-xl font-bold">
                <Image src="/images/garden.png" priority alt="Hero Image 1" width={162} height={20} className="object-cover" unoptimized />
            </div> 
            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-6 items-center">
              <Link href="/" className="text-black hover:text-green-600 transition duration-400">ACCUEIL</Link>
              <Link href="/marques/liste" className="text-black hover:text-green-600 transition duration-400">STORE</Link>
              <Link href="/Wellness" className="text-black hover:text-green-600 transition duration-400">WELLNESS</Link>
              <Link href="https://www.bakerynsweets.com/Store/" className="text-black hover:text-green-600 transition duration-400" target='blank'>PATISSERIE</Link>
              <Link href="/Magazine" className="text-black hover:text-green-600 transition duration-400">MAGAZINE</Link>
              <Link href="https://www.kyalifestyle.com" className="text-black hover:text-green-600 transition duration-400" target='blank'>KYALIFESTYLE</Link>
              
              <div className="flex items-center space-x-4">
            {user ? (
              <>
                <div className="relative">
                  <button
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="flex items-center text-gray-500 hover:text-red-600 focus:outline-none"
                  >
                    <div className="relative">
                      <ShoppingCart className="h-6 w-6 text-black" />
                      {/* Badge pour le nombre d'articles */}
                    </div>

                    <span className="ml-2 hidden md:inline">{user.name}</span>
                    <User className="text-gray-900 h-6 w-6 hover:text-green-600 transition duration-300" />
                  </button>

                  {/* Menu déroulant */}
                  {isDropdownOpen && (
                    <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-gray-200 ring-opacity-5 focus:outline-none z-10">
                      <div className="py-1">
                        <Link
                          href="#"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          onClick={() => setIsDropdownOpen(false)}
                        >
                          Mon profil
                        </Link>
                        <Link
                          href="/panier"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          onClick={() => setIsDropdownOpen(false)}
                        >
                          Mon panier
                        </Link>
                        <Link
                          href="/commandes/mes_commandes"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          onClick={() => setIsDropdownOpen(false)}
                        >
                          Mes commandes
                        </Link>
                        <button
                          onClick={() => {
                            setIsDropdownOpen(false);
                            handleLogout();
                          }}
                          className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          Déconnexion
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                <div className="relative">
                  <button
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="flex items-center text-gray-500 hover:text-red-600 focus:outline-none"
                  >
                    <span className="ml-2 hidden md:inline"></span>
                    <User className="h-6 w-6 text-black hover:text-red-500 transition duration-400" />
                  </button>

                  {/* Menu déroulant */}
                  {isDropdownOpen && (
                    <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-gray-200 ring-opacity-5 focus:outline-none z-10">
                      <div className="py-1">
                        <Link
                          href="/login"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          onClick={() => setIsDropdownOpen(false)}
                        >
                          Se connecter
                        </Link>
                        <Link
                          href="/register"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          onClick={() => setIsDropdownOpen(false)}
                        >
                          S inscrire
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              </>
            )}
              </div>
            </div>
            
            {/* Mobile Menu Button */}
            <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X className="w-6 h-6 text-black" /> : <Menu className="w-6 h-6 text-black" />}
            </button>
          </div>
        </div>
        
        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden bg-white shadow-md w-full py-4">
            <Link href="/" className="block px-4 py-2 hover:bg-gray-100">Accueil</Link>
            <Link href="/marques/liste" className="block px-4 py-2 hover:bg-gray-100">Store</Link> 
            <Link href="/Wellness" className="block px-4 py-2 hover:bg-gray-100">Wellness</Link>
            <Link href="https://www.bakerynsweets.com/Store/" className="block px-4 py-2 hover:bg-gray-100" target='blank'>Patisserie</Link>
            <Link href="/Magazine" className="block px-4 py-2 hover:bg-gray-100">Magazine</Link>
            <Link href="https://www.kyalifestyle.com" className="block px-4 py-2 hover:bg-gray-100" target='blank'>KyaLifeStyle</Link>
            
            <div className="flex items-center space-x-4">
            {user ? (
              <>
                <div className="relative">
                  <div className='flex'>
                  <ShoppingCart className="h-6 w-6 ml-5 mt-3"/>
                    <Link
                      href="/panier"
                      className="block px-2 py-2 mt-1 text-gray-700 hover:bg-gray-100"
                      onClick={() => {
                        setIsDropdownOpen(false);
                      }}
                    >
                      Mon panier
                    </Link>
                  </div>

                  {/* Menu déroulant */}
                </div>
              </>
            ) : (
              <>
                <div className="relative">
                  <div className='flex'>
                  <ShoppingCart className="h-6 w-6 ml-5 mt-4"/>
                  <Link href="/login" className="block px-2 py-2 mt-3 text-sm text-gray-900 hover:bg-gray-100">
                    Se connecter
                  </Link>
                  </div>
                </div>
              </>
            )}
            </div>
          </div>
        )}

        {/* Fermer le dropdown quand on clique ailleurs */}
      {isDropdownOpen && (
        <div
          className="fixed inset-0 z-0"
          onClick={() => setIsDropdownOpen(false)}
        ></div>
      )}

      {/* Fermer le dropdown quand on clique ailleurs */}
      {estOuvert && (
        <div
          className="fixed inset-0 z-0"
          onClick={() => setEstOuvert(false)}
        ></div>
      )}

      </nav>
    </>
  );
}
////////////////////////////////////