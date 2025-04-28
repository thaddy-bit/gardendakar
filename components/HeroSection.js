// src/components/HeroSection.jsx
import Image from 'next/image';

export default function HeroSection() {
  return (
    <>
   
      <section className="w-full sm:px-6 py-12">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
          <div className="h-96 md:h-[700px]">
            <Image src="/images/heroSection/IMG_6174.jpg" priority alt="Hero Image 1" width={3000} height={1000} className="w-full h-full object-cover" unoptimized />
          </div>
          <div className="h-96 md:h-[700px]">
            <Image src="/images/heroSection/IMG_6173.jpg" priority alt="Hero 2" width={3000} height={1000} className="w-full h-full object-cover" unoptimized />
          </div>
          <div className="h-96 md:h-[700px]">
            <Image src="/images/heroSection/IMG_6157.jpg" priority alt="Hero Image 1" width={3000} height={1000} className="w-full h-full object-cover" unoptimized />
          </div>
          <div className="h-96 md:h-[700px]">
            <Image src="/images/heroSection/IMG_6184.jpg" priority alt="Hero 2" width={3000} height={1000} className="w-full h-full object-cover" unoptimized />
          </div>
          <div className="h-96 md:h-[700px]">
            <Image src="/images/heroSection/IMG_6186.jpg" priority alt="Hero Image 1" width={3000} height={1000} className="w-full h-full object-cover" unoptimized />
          </div>
          <div className="h-96 md:h-[700px]">
            <Image src="/images/heroSection/IMG_6175.jpg" priority alt="Hero 2" width={3000} height={1000} className="w-full h-full object-cover" unoptimized />
          </div>
        </div>

        <div className=" py-20 px-8">
            <h1 className='text-center text-2xl lg:px-20 mb-5'>Partageons ensemble le style du minimalisme réalisé grâce au travail
                minutieux de nos artisans.<br/>
                Notre procédure de fabrication "fait main" témoigne de l'originalité de
                chaque piece et de notre esprit d'échange culturel.
            </h1>
            <hr/>
            <h1 className='text-center text-2xl lg:px-20 mt-5'>
                Let's share together the style of minimalism achieved through the
                meticulous work of our craftsmen.
                Our "hand-made" manufacturing process testifies to the originality of
                each piece and our spirit of cultural exchange.
            </h1>
        </div>

        <div className="">
          <div className="h-96 md:h-[700px]">
            <Image src="/images/heroSection/IMG_6249.jpg" priority alt="Hero Image 1" width={3000} height={1000} className="w-full h-full object-cover" unoptimized />
          </div>
        </div>
      </section>
        </>
  );
}