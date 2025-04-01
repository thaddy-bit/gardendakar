'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-white text-black py-8">
      <div className='justify-center pb-9'>
        
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Colonne 1 - Informations */}
          <div>
            <div className="flex justify-center space-x-2">
              <Image src="/images/dhl.png" width={50} height={30} alt="DHL" />
              <Image src="/images/fedex.png" width={50} height={30} alt="FedEx" />
              <Image src="/images/ups.png" width={50} height={30} alt="UPS" />
            </div>
          </div>
          
          {/* Colonne 2 - Liens rapides */}
          <div className="flex justify-center space-x-2">
            <Link href="#" className="text-1xl text-center md:text-2xl font-bold hover:text-green-900 transition duration-400 p-2">
              Livraison & Retour
            </Link>
          </div>
          
          {/* Colonne 3 - Modes de paiement et livraison */}
          <div>
            <div className="flex justify-center space-x-2 mb-4">
              <Image src="/images/visa.png" width={50} height={30} alt="Visa" />
              <Image src="/images/mastercard.png" width={50} height={30} alt="Mastercard" />
              <Image src="/images/pay-pal.png" width={50} height={30} alt="PayPal" />
              <Image src="/images/orange.jpg" width={50} height={30} alt="Mastercard" />
              <Image src="/images/wave.jpg" width={50} height={30} alt="PayPal" />
            </div>
            
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-6 pt-4 text-center text-gray-400 text-sm">
          <p>&copy; {new Date().getFullYear()}Copyright 2025 GARDEN DAKAR Route de NGOR Face BOMA Dakar - SENEGAL Tous droits Réservés.</p>
          <Link href="/privacy-policy" className="hover:text-green-900 transition duration-400">Politique de confidentialité</Link>
        </div>
      </div>
    </footer>
  );
}