import React from 'react';

export default function NewsletterForm() {
  return (
    <div className="bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold text-center mb-6">Abonnez-vous à notre newsletter</h2>
        <form className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
          {/* Champ Nom */}
          <div className="flex-1">
            <label htmlFor="name" className="sr-only">Nom</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Votre nom"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-900"
              required
            />
          </div>

          {/* Champ Email */}
          <div className="flex-1">
            <label htmlFor="email" className="sr-only">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Votre email"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-900"
              required
            />
          </div>

          {/* Champ Description */}
          <div className="flex-1">
            <label htmlFor="description" className="sr-only">Description</label>
            <input
              type="text"
              id="description"
              name="description"
              placeholder="Une description (optionnelle)"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-900"
            />
          </div>

          {/* Bouton de soumission */}
          <div>
            <button
              type="submit"
              className="w-full sm:w-auto px-6 py-2 bg-green-900 text-white rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-900 transition duration-400"
            >
              S'abonner
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}