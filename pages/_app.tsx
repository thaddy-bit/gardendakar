import "@/styles/globals.css";
import "@/styles/globals.css";
import { CartProvider } from "../context/CartContext";
import type { AppProps } from "next/app";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import PageLoader from "@/components/PageLoader";
import "@/styles/globals.css";
import { Toaster } from 'sonner';

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [fade, setFade] = useState(false);

  useEffect(() => {
    const handleStart = () => {
      setLoading(true);
      setFade(false);
    };
    const handleComplete = () => {
      setTimeout(() => {
        setLoading(false);
        setFade(true);
      }, 300); // petit délai pour un meilleur effet
    };

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);

    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleComplete);
      router.events.off("routeChangeError", handleComplete);
    };
  }, [router]);

  return (
      <CartProvider>
        <Toaster richColors position="top-right" />
        {loading && <PageLoader />}
        <Component {...pageProps} />
        
      </CartProvider>
  );
}