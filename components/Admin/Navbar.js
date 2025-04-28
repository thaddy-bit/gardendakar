import { useState, useEffect } from 'react';
import {
  BellIcon,
  SearchIcon,
  MenuIcon,
  XIcon,
  UserCircleIcon,
  CogIcon,
  LogoutIcon
} from './Icons';

const Navbar = ({ toggleSidebar, isSidebarOpen }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Navbar principale */}
      <header className={`fixed top-0 right-0 left-0 z-30 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md' : 'bg-white/90 backdrop-blur-sm'
      } ${isSidebarOpen ? 'md:left-64' : 'md:left-20'}`}>
        <div className="flex items-center justify-between px-4 py-3">
          {/* Bouton menu mobile */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-md text-gray-700 hover:bg-gray-100 md:hidden"
          >
            {mobileMenuOpen ? <XIcon className="w-5 h-5" /> : <MenuIcon className="w-5 h-5" />}
          </button>

          {/* Recherche - version desktop */}
          <div className="hidden md:flex items-center flex-1 max-w-md mx-4">
            <div className={`relative w-full transition-all duration-300 ${searchOpen ? 'opacity-100' : 'opacity-90'}`}>
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <SearchIcon className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Rechercher..."
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
          </div>

          {/* Contrôles droite */}
          <div className="flex items-center space-x-3">
            {/* Bouton recherche mobile */}
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="p-2 rounded-md text-gray-700 hover:bg-gray-100 md:hidden"
            >
              <SearchIcon className="w-5 h-5" />
            </button>

            {/* Notifications */}
            <button className="p-2 rounded-full text-gray-700 hover:bg-gray-100 relative">
              <BellIcon className="w-5 h-5" />
              <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
            </button>

            {/* Profil */}
            <div className="relative">
              <button
                onClick={() => setProfileMenuOpen(!profileMenuOpen)}
                className="flex items-center space-x-2 focus:outline-none"
              >
                <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center">
                  <UserCircleIcon className="h-6 w-6 text-indigo-600" />
                </div>
                <span className="hidden md:inline-block text-sm font-medium text-gray-700">John Doe</span>
              </button>

              {/* Dropdown profil */}
              {profileMenuOpen && (
                <>
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setProfileMenuOpen(false)}
                  />
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <div className="flex items-center">
                        <UserCircleIcon className="mr-2 w-4 h-4" />
                        Profil
                      </div>
                    </a>
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <div className="flex items-center">
                        <CogIcon className="mr-2 w-4 h-4" />
                        Paramètres
                      </div>
                    </a>
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <div className="flex items-center">
                        <LogoutIcon className="mr-2 w-4 h-4" />
                        Déconnexion
                      </div>
                    </a>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Recherche mobile */}
        {searchOpen && (
          <div className="px-4 pb-3 md:hidden">
            <div className="relative w-full">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <SearchIcon className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Rechercher..."
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
          </div>
        )}
      </header>

      {/* Menu mobile */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div className="fixed inset-0 bg-black bg-opacity-50" onClick={() => setMobileMenuOpen(false)} />
          <div className="fixed inset-y-0 left-0 w-5/6 max-w-sm bg-white shadow-lg z-50">
            <div className="h-full overflow-y-auto">
              <div className="p-4 border-b">
                <h2 className="text-xl font-semibold text-gray-900">Menu</h2>
              </div>
              <nav className="p-4 space-y-2">
                <a href="#" className="block p-2 rounded hover:bg-gray-100">Accueil</a>
                <a href="#" className="block p-2 rounded hover:bg-gray-100">Utilisateurs</a>
                <a href="#" className="block p-2 rounded hover:bg-gray-100">Projets</a>
                <a href="#" className="block p-2 rounded hover:bg-gray-100">Paramètres</a>
              </nav>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;