'use client';

import { useEffect } from 'react';
import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { Menu, X, ChevronDown, ShoppingCart } from 'lucide-react';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [estOuvert, setEstOuvert] = useState(false);
  const [ouvert, setOuvert] = useState(false);
  const [zone, setZone] = useState([]);

  useEffect(() => {
      async function fetchData() {
      const response = await fetch('/api/zone/getAll');
      const data = await response.json();
      setZone(data);
    }

    fetchData();
  }, []);


  const toggleDropdown = (menu) => {
    setDropdownOpen(dropdownOpen === menu ? null : menu);
  };

  return (
    <>
    <Head>
        <title>KYAKIFESTYLE</title>
        <meta name="description" content="Concept store et wellness" />
    </Head>

      <nav className="top-0 left-0 w-full shadow-sm bg-amber-50 shadow-md z-50">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 p-5">
          <div className="flex justify-between w-full items-center h-16">
            
            <div className="text-black text-xl font-bold">KYAKIFESTYLE</div>
            
            <div className="hidden md:flex space-x-6 items-center">
              <Link href="/kya" className="text-black hover:text-gray-400 transition duration-400">ACCUEIL</Link>
              
              <div className="relative">
                <button className="flex items-center text-black hover:text-gray-400 transition duration-400"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                >
                  NOS COLLECTIONS <ChevronDown className="w-4 h-4 ml-1"/>
                </button>
                {/* Menu déroulant */}
                {isDropdownOpen && (
                    <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-gray-200 ring-opacity-5 focus:outline-none z-10">
                      <div className="py-1">
                        {zone.map((item) => (
                          <div key={item.code_zone} className=''>
                            <Link onClick={() => setIsDropdownOpen(false)}
                             passHref
                              href={`/marques/${item.id}`}
                              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            >
                              {item.nom}
                            </Link>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
              </div>

              <div className="relative">
                <button className="flex items-center text-black hover:text-gray-400 transition duration-400"
                onClick={() => setEstOuvert(!estOuvert)}
                >
                  INSPIRATION <ChevronDown className="w-4 h-4 ml-1"/>
                </button>
                {estOuvert && (
                    <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-gray-200 ring-opacity-5 focus:outline-none z-10">
                      <div className="py-1">
                        <Link
                          href="#"
                          className="block px-2 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          onClick={() => setEstOuvert(false)}
                        >
                          NOUVELLE COLLECTION
                        </Link>
                        <Link
                          href="#"
                          className="block px-2 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          onClick={() => setEstOuvert(false)}
                        >
                          GRANDE OCCASIONS
                        </Link>
                        <Link
                          href="#"
                          className="block px-2 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          onClick={() => setEstOuvert(false)}
                        >
                          EN VOGUE
                        </Link>
                      </div>
                    </div>
                  )}
              </div>

              <div className="relative group">
                <button className="flex items-center text-black hover:text-gray-400 transition duration-400"
                onClick={() => setOuvert(!ouvert)}
                >
                  BLOG <ChevronDown className="w-4 h-4 ml-1"/>
                </button>
                {ouvert && (
                    <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-gray-200 ring-opacity-5 focus:outline-none z-10">
                      <div className="py-1">
                        <Link
                          href="#"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          onClick={() => setOuvert(false)}
                        >
                          BLOG PHOTOS
                        </Link>
                        <Link
                          href="#"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          onClick={() => setOuvert(false)}
                        >
                          BLOG VIDEOS
                        </Link>
                      </div>
                    </div>
                  )}
              </div>

              <Link href="/" className="text-black hover:text-gray-400 transition duration-400">GARDEN</Link>
              
              
              <Link href="/panier" className="relative">
                <ShoppingCart className="w-6 h-6 text-black"/>
              </Link>
            </div>

            <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X className="w-6 h-6 text-black" /> : <Menu className="w-6 h-6 text-black" />}
            </button>
          </div>
        </div>
        
        {isOpen && (
          <div className="md:hidden bg-white shadow-md w-full py-4">
            <Link href="/kya" className="block px-4 py-2 hover:bg-gray-100">ACCUEIL</Link>
            
            <div className="px-4 py-2">
              <button onClick={() => toggleDropdown('store')} className="flex items-center w-full hover:text-gray-600">
                NOS COLLECTIONS <ChevronDown className="w-4 h-4 ml-1" />
              </button>
              {dropdownOpen === 'store' && (
                <div className="pl-4">
                  {zone.map((item) => (
                    <div key={item.code_zone} className=''>
                      <Link onClick={() => setIsDropdownOpen(false)}
                          passHref
                          href={`/marques/${item.id}`}
                          className="block px-4 py-2 hover:bg-gray-100"
                        >
                          {item.nom}
                      </Link>
                    </div>
                    ))}
                </div>
              )}
            </div>

            <div className="px-4 py-2">
              <button onClick={() => toggleDropdown('inspiration')} className="flex items-center w-full hover:text-gray-600">
              INSPIRATION <ChevronDown className="w-4 h-4 ml-1" />
              </button>
              {dropdownOpen === 'inspiration' && (
                <div className="pl-4">
                  <Link href="#" className="block px-4 py-2 hover:bg-gray-100">Nouvelle collection</Link>
                  <Link href="#" className="block px-4 py-2 hover:bg-gray-100">Grande occasions</Link>
                  <Link href="#" className="block px-4 py-2 hover:bg-gray-100">En vogue</Link>
                </div>
              )}
            </div>

            <div className="px-4 py-2">
              <button onClick={() => toggleDropdown('blog')} className="flex items-center w-full hover:text-gray-600">
              BLOG <ChevronDown className="w-4 h-4 ml-1" />
              </button>
              {dropdownOpen === 'blog' && (
                <div className="pl-4">
                  <Link href="#" className="block px-4 py-2 hover:bg-gray-100">Blog Photos</Link>
                  <Link href="#" className="block px-4 py-2 hover:bg-gray-100">Blog Vidéos</Link>
                </div>
              )}
            </div>
            <Link href="/" className="block px-4 py-2 hover:bg-gray-100">GARDEN</Link>
            <Link href="/panier" className="block px-4 py-2 hover:bg-gray-100">PANIER</Link>
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

        {/* Fermer le dropdown quand on clique ailleurs */}
        {ouvert && (
          <div
            className="fixed inset-0 z-0"
            onClick={() => setOuvert(false)}
          ></div>
        )}

      </nav>
    </>
  );
}