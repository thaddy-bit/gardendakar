import { useEffect, useState } from "react";
import axios from "axios";

import {
  Menu,
  X,
  Home,
  User,
  ChevronDown,
  Settings,
  LogOut,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Toaster } from "sonner";
import PageLoader from "../../components/PageLoader";

export default function Layout({ children, loading = false }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [estOuvert, setEstOuvert] = useState(false);

  const [lowStockCount, setLowStockCount] = useState(0);

useEffect(() => {
  const fetchLowStock = async () => {
    try {
      const res = await axios.get("/api/produits/stock-faible-count");
      setLowStockCount(res.data.count);
    } catch (error) {
      console.error("Erreur lors du chargement du stock faible :", error);
    }
  };

  fetchLowStock();
}, []);

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* SIDEBAR */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-md p-5 z-40 transform transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-64"
        } md:translate-x-0`}
      >
        <div className="flex justify-between items-center mb-4">
          <Image
            src="/images/KYA-01.png"
            alt="logo"
            width={120}
            height={80}
            className="object-cover"
            priority
            unoptimized
          />
          <button
            className="md:hidden text-black"
            onClick={() => setIsSidebarOpen(false)}
          >
            <X size={24} />
          </button>
        </div>

        <nav className="space-y-3 text-sm">
          <SidebarLink href="/Admin/dashbord"  label="Dashboard" />
          <SidebarLink href="/Admin/Marques/getAll"  label="Collections" />
          <SidebarLink href="/Admin/Sous_collections/add"  label="Sous Collections" />
          
          <SidebarLink
            href="/Admin/Produits/add-product"
            label="Articles"
            badge={lowStockCount > 0 ? lowStockCount : null}
          />

          <SidebarLink href="/Admin/Produits/stock-faible" label="Stock Faible 🔥" />
        </nav>
      </aside>

      {/* MAIN CONTENT */}
      <div className="flex-1 min-h-screen md:pl-64 flex flex-col">
        {/* HEADER */}
        <header className="bg-amber-50 shadow-md p-4 flex justify-between items-center sticky top-0 z-30">
          <button
            className="md:hidden text-black"
            onClick={() => setIsSidebarOpen(true)}
          >
            <Menu size={24} />
          </button>
          <h1 className="text-xl font-semibold text-black"></h1>
          <div className="flex gap-4">
            <Link
              href="/settings"
              className="p-2 hover:bg-amber-100 text-black rounded-lg"
            >
              <Settings size={20} />
            </Link>
            <Link
              href="/logout"
              className="p-2 hover:bg-amber-100 text-black rounded-lg"
            >
              <LogOut size={20} />
            </Link>
          </div>
        </header>

        {/* PAGE CONTENT */}
        <main className="flex-1 p-6 overflow-y-auto bg-white shadow-inner rounded-t-lg">
          {loading && <PageLoader />}
          {children}
        </main>
      </div>

      {/* CLICK OUTSIDE DROPDOWN */}
      {estOuvert && (
        <div
          className="fixed inset-0 z-10"
          onClick={() => setEstOuvert(false)}
        ></div>
      )}

      {/* TOASTER */}
      <Toaster richColors position="top-right" />
    </div>
  );
}

// Sub-components
function SidebarLink({ href, icon, label, badge }) {
  return (
    <Link
      href={href}
      className="flex items-center justify-between gap-2 px-2 py-2 hover:bg-amber-50 rounded-lg transition text-black relative"
    >
      <span className="flex items-center gap-2">
        {icon} {label}
      </span>
      {badge && (
        <span className="bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full animate-pulse">
          {badge}
        </span>
      )}
    </Link>
  );
}

function DropdownLink({ href, label }) {
  return (
    <Link
      href={href}
      className="block px-4 py-2 text-sm text-gray-700 hover:bg-amber-50 rounded-md transition"
    >
      {label}
    </Link>
  );
}