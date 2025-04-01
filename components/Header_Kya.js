/*
'use client';

import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { Menu, X, ChevronDown, ShoppingCart } from 'lucide-react';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const [cartCount, setCartCount] = useState(2); // Exemple : 2 articles dans le panier

  const toggleDropdown = (menu) => {
    setDropdownOpen(dropdownOpen === menu ? null : menu);
  };

  return (
    <>
    <Head>
        <title>KYAKIFESTYLE</title>
        <meta name="description" content="Concept store et wellness" />
    </Head>

      <nav className="top-0 left-0 w-full bg-gray-200 shadow-md z-50">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 p-5">
          <div className="flex justify-between w-full items-center h-16">
            
            <div className="text-black text-xl font-bold">KYAKIFESTYLE</div>
            
            
            <div className="hidden md:flex space-x-6 items-center">
              <Link href="/Home" className="text-black hover:text-gray-400 transition duration-400">Accueil</Link>
              
              <div className="relative group">
                <button className="flex items-center text-black hover:text-gray-400 transition duration-400">
                  Nos Collections <ChevronDown className="w-4 h-4 ml-1"/>
                </button>
                <div className="absolute left-0 mt-2 w-48 bg-white shadow-lg rounded-md py-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="relative group">
                    <button className="flex items-center text-black hover:text-gray-400 transition duration-400">
                      Afrique du nord <ChevronDown className="w-4 h-4 ml-1"/>
                    </button>
                    <div className="absolute left-50 mt-2 w-48 bg-white shadow-lg rounded-md py-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      
                      <Link href="#" className="block px-4 py-2 hover:bg-gray-100">Afrique du sud</Link>
                      <Link href="#" className="block px-4 py-2 hover:bg-gray-100">Afrique de l'ouest</Link>
                      <Link href="#" className="block px-4 py-2 hover:bg-gray-100">Afrique de l'est</Link>
                    </div>
                  </div>
                  <Link href="#" className="block px-4 py-2 hover:bg-gray-100">Afrique du sud</Link>
                  <Link href="#" className="block px-4 py-2 hover:bg-gray-100">Afrique de l'ouest</Link>
                  <Link href="#" className="block px-4 py-2 hover:bg-gray-100">Afrique de l'est</Link>
                </div>
              </div>

              <div className="relative group">
                <button className="flex items-center text-black hover:text-gray-400 transition duration-400">
                  Inspiration <ChevronDown className="w-4 h-4 ml-1"/>
                </button>
                <div className="absolute left-0 mt-2 w-48 bg-white shadow-lg rounded-md py-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Link href="/produits" className="block px-4 py-2 hover:bg-gray-100">Nouvelle collection</Link>
                  <Link href="#" className="block px-4 py-2 hover:bg-gray-100">Grande occasions</Link>
                  <Link href="#" className="block px-4 py-2 hover:bg-gray-100">En vogue</Link>
                </div>
              </div>

              <div className="relative group">
                <button className="flex items-center text-black hover:text-gray-400 transition duration-400">
                  Blog <ChevronDown className="w-4 h-4 ml-1"/>
                </button>
                <div className="absolute left-0 mt-2 w-48 bg-white shadow-lg rounded-md py-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Link href="/produits" className="block px-4 py-2 hover:bg-gray-100">Blog photos</Link>
                  <Link href="#" className="block px-4 py-2 hover:bg-gray-100">Blog vidéos</Link>
                </div>
              </div>

              <Link href="/Wellness" className="text-black hover:text-gray-400 transition duration-400">Garden</Link>
              
              
              <Link href="#" className="relative">
                <ShoppingCart className="w-6 h-6 text-black"/>
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                    {cartCount}
                  </span>
                )}
              </Link>
            </div>
            
            
            <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X className="w-6 h-6 text-white" /> : <Menu className="w-6 h-6 text-white" />}
            </button>
          </div>
        </div>
        
        
        {isOpen && (
          <div className="md:hidden bg-white shadow-md w-full py-4">
            <Link href="/Home" className="block px-4 py-2 hover:bg-gray-100">Accueil</Link>
            
            <div className="px-4 py-2">
              <button onClick={() => toggleDropdown('store')} className="flex items-center w-full hover:text-gray-600">
                Nos collections <ChevronDown className="w-4 h-4 ml-1" />
              </button>
              {dropdownOpen === 'store' && (
                <div className="pl-4">
                  <Link href="/produits" className="block px-4 py-2 hover:bg-gray-100">Produit 1</Link>
                  <Link href="/store/product2" className="block px-4 py-2 hover:bg-gray-100">Produit 2</Link>
                </div>
              )}
            </div>
            
            <Link href="/Wellness" className="block px-4 py-2 hover:bg-gray-100">Wellness</Link>

            
            <Link href="https://www.bakerynsweets.com/Store/" className="block px-4 py-2 hover:bg-gray-100">Patisserie</Link>
            <Link href="/Magazine" className="block px-4 py-2 hover:bg-gray-100">Magazine</Link>
            <Link href="#" className="block px-4 py-2 hover:bg-gray-100">KyaLifeStyle</Link>
            <Link href="#" className="block px-4 py-2 hover:bg-gray-100">Panier ({cartCount})</Link>
          </div>
        )}
      </nav>
    </>
  );
}

*/