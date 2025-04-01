// src/components/HeroSection.jsx
import Image from 'next/image';

export default function HeroSection() {
  return (
      <section className="w-full sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="h-96 md:h-[700px]">
            <img src="/images/i2.jpg" alt="Hero Image 1" className="w-full h-full object-cover" />
          </div>
          <div className="h-96 md:h-[700px]">
            <img src="/images/Articles/i7.jpg" alt="Hero Image 2" className="w-full h-full object-cover" />
          </div>
        </div>
      </section>
  );
}