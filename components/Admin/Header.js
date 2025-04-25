import { useState } from "react";
import { Menu, X, Home, User, ChevronDown, Settings, LogOut } from "lucide-react";
import Link from "next/link";
import Image from 'next/image';

export default function MenuPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [estOuvert, setEstOuvert] = useState(false);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 bg-white w-64 p-5 shadow-lg transform ${isSidebarOpen ? "translate-x-0" : "-translate-x-64"} transition-transform duration-300 ease-in-out md:relative md:translate-x-0`}>
        <button
          className="absolute top-4 right-4 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        >
          <X size={24} className="text-white" />
        </button>
        <Image src="/images/KYA-01.png" priority alt="logo" width={300} height={200} className="object-cover" unoptimized />
        
        <nav className="space-y-4">
          <Link href="#" className="flex items-center gap-2 px-2 py-2 text-black text-bold hover:bg-amber-50 rounded-lg transition duration-400">
            <Home size={20} /> Dashboard
          </Link>
          <Link href="/Admin/Marques/getAll" className="flex items-center gap-2 px-2 py-2 text-black text-bold hover:bg-amber-50 rounded-lg transition duration-400">
            <Home size={20} /> Collections
          </Link>
          <Link href="#" className="flex items-center gap-2 px-2 py-2 text-black text-bold hover:bg-amber-50 rounded-lg transition duration-400">
            <Home size={20} /> Artiles
          </Link>

          <Link href="/profile" className="flex items-center text-white gap-2 p-3 hover:bg-gray-200 rounded-lg">
            <User size={20}/> Profile
          </Link>
            <div className="relative">
                <button className="flex items-center text-black text-sm hover:text-gray-400 transition duration-400"
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
                        <Link
                          href="#"
                          className="block px-2 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          onClick={() => setOuvert(false)}
                        >
                          BLOG PHOTOS
                        </Link>
                        <Link
                          href="#"
                          className="block px-2 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          onClick={() => setOuvert(false)}
                        >
                          BLOG VIDEOS
                        </Link>
                      </div>
                    </div>
                  )}
            </div>
        </nav>
      </div>
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Navbar */}
        <header className="bg-amber-50 shadow-md p-4 flex justify-between items-center">
          <button className="md:hidden text-white" onClick={() => setIsSidebarOpen(true)}>
            <Menu size={24} />
          </button>
          <h1 className="text-xl text-black font-bold">Menu</h1>
          <div className="flex gap-4">
            <Link href="/settings" className="p-2 hover:bg-amber-100 text-black rounded-lg">
              <Settings size={20} />
            </Link>
            <Link href="/logout" className="p-2 hover:bg-amber-100 text-black rounded-lg">
              <LogOut size={20} />
            </Link>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6">
          
          <p className="text-gray-600">Bienvenue sur la page du menu !</p>

        </main>
      </div>
      {/* Fermer le dropdown quand on clique ailleurs */}
      {estOuvert && (
          <div
            className="fixed inset-0 z-0"
            onClick={() => setEstOuvert(false)}
          ></div>
        )}
    </div>
  );
}