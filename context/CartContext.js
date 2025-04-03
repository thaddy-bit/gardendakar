
import { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartCount, setCartCount] = useState(0);

  // Charger le nombre d'articles au chargement
  /*
  useEffect(() => {
    const fetchCartCount = async () => {
      try {
        const res = await fetch("/api/panier?count=true");
        const data = await res.json();
        setCartCount(data.total || 0);
      } catch (error) {
        console.error("Erreur de récupération du panier :", error);
      }
    };

    fetchCartCount();
  }, []);

  */

  return (
    <CartContext.Provider value={{ cartCount, setCartCount }}>
      {children}
    </CartContext.Provider>
  );
};