import Layout from '../components/Layout';
import HeroSection from '../components/HeroSection';
import Image from 'next/image';
import Link from 'next/link';

export default function Kya() {
  return (
    <Layout>
        
        <HeroSection/>

        <footer className="bg-black text-white py-8 mt-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Colonne 1 - Informations */}
            <div>
              <h3 className="text-lg text-center font-bold mb-3">ADRESSE</h3>
              <p className="text-sm text-center text-gray-400">
              Route de NGOR, Face Hôtel BOMA
              </p>
              <p className="text-sm text-center text-gray-400 pt-8">
              DAKAR - SENEGAL
              </p>
            </div>
            
            {/* Colonne 2 - Liens rapides */}
            <div>
              <h3 className="text-lg text-center font-bold mb-3">CONTACT</h3>
              <p className="text-sm text-center text-gray-400">
              +221 33 820 50 00
              </p>
              <p className="text-sm text-center text-gray-400 pt-8">
              gardendakar@gmail.com
              </p>
            </div>

            {/* Colonne 2 - Liens rapides */}
            <div>
              <h3 className="text-lg text-center font-bold mb-3">COLLABORATION</h3>
              <p className="text-sm text-center text-gray-400">
              .
              </p>
              <p className="text-sm text-center text-gray-400 pt-8">
              .
              </p>
            </div>
            
            {/* Colonne 3 - Modes de paiement et livraison */}
            <div>
              <h3 className="text-lg text-center font-bold mb-3">SOCIAL MEDIA</h3>
              <div className="flex space-x-2 justify-center mb-4">
                <Link href="#">
                <Image src="/images/facebook.png" width={30} height={30} alt="facebook" />
                </Link>

                <Link href="#">
                <Image src="/images/instagram.png" width={30} height={30} alt="instagram" />
                </Link>

                <Link href="#">
                <Image src="/images/twitter.png" width={30} height={30} alt="twitter" />
                </Link>
              </div>
            </div>
          </div>
        </div>
        </footer>
      
    </Layout>
  );
}