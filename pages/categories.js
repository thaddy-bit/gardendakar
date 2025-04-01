// pages/categories.js
import Link from 'next/link';

export default function Categories({ categories }) {
  return (
    <div className="bg-gray-100 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">Liste des Catégories</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <div key={category.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-2">{category.nom}</h2>
                <p className="text-gray-600 mb-4">{category.description}</p>
                <Link href={`/categories/${category.id}`}>
                  <a className="text-blue-600 hover:text-blue-800 font-semibold">
                    Voir les produits →
                  </a>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  try {
    const res = await fetch('http://localhost:3000/api/categories');
    const categories = await res.json();

    return {
      props: {
        categories,
      },
    };
  } catch (error) {
    console.error('Erreur lors de la récupération des catégories :', error);
    return {
      props: {
        categories: [],
      },
    };
  }
}