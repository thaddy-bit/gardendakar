import { useState } from 'react';
import DropdownMenu from './DropdownMenu';
import { MenuIcon, XIcon } from './Icons';
import {
  HomeIcon,
  UserIcon,
  SettingsIcon,
  FolderIcon,
  MailIcon,
  CalendarIcon,
  ChevronDownIcon,
  ChevronUpIcon
} from './Icons';

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);

  return (
    <>
      {/* Bouton mobile */}
      <button 
        onClick={toggleMobileMenu}
        className="md:hidden fixed top-16 left-4 z-50 p-2 rounded-md bg-indigo-600 text-white"
      >
        {mobileMenuOpen ? <XIcon className="w-5 h-5" /> : <MenuIcon className="w-5 h-5" />}
      </button>

      {/* Overlay mobile */}
      {mobileMenuOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={toggleMobileMenu}
        />
      )}

      {/* Barre latérale */}
      <aside 
        className={`bg-gray-800 text-white transition-all duration-300 ease-in-out fixed md:relative h-full z-50
          ${isOpen ? 'w-64' : 'w-20'}
          ${mobileMenuOpen ? 'left-0' : '-left-full md:left-0'}
        `}
      >
        <div className="p-4 flex items-center justify-between border-b border-gray-700">
          {isOpen && <h1 className="text-xl font-bold">Mon App</h1>}
          <button 
            onClick={toggleSidebar}
            className="p-2 rounded-full hover:bg-gray-700 hidden md:block"
          >
            {isOpen ? '◀' : '▶'}
          </button>
        </div>

        <nav className="p-4 space-y-2">
          {/* ... (même contenu que précédemment) ... */}
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;