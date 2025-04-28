// pages/Admin/SousCollections/add.js
import Layout from '../../../components/Admin/Layout';
import { useEffect, useState } from "react";

export default function AjouterSousCollection() {
  const [isLoading, setIsLoading] = useState(false);
  const [categories, setCategories] = useState([]);

  const [formData, setFormData] = useState({
    nom: "",
    description: "",
    categorie_id: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const response = await fetch("/api/sous_collection/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const data = await response.json();
    alert(data.message || data.error);
    setIsLoading(false);
  };

  useEffect(() => {
    async function fetchCategories() {
      const res = await fetch("/api/categories");
      const data = await res.json();
      setCategories(data);
    }

    fetchCategories();
  }, []);

  return (
    <Layout>
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="bg-amber-50 py-6 px-8 text-center">
          <h1 className="text-3xl font-bold text-black">Ajouter une Sous-Collection</h1>
          <p className="mt-2 text-black">Formulaire pour créer une sous-collection</p>
        </div>
        <form onSubmit={handleSubmit} className="p-4 mt-10 max-w-md mx-auto space-y-4">
          {/* Nom */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nom</label>
            <input
              name="nom"
              type="text"
              required
              onChange={handleChange}
              className="block w-full pl-3 pr-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-900 focus:border-green-900 sm:text-sm"
              placeholder="Nom de la sous-collection"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              name="description"
              required
              onChange={handleChange}
              className="block w-full pl-3 pr-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-900 focus:border-green-900 sm:text-sm"
              placeholder="Description"
            />
          </div>

          {/* Catégorie liée */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Catégorie</label>
            <select
              name="categorie_id"
              required
              onChange={handleChange}
              className="block w-full pl-3 pr-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-900 focus:border-green-900 sm:text-sm"
            >
              <option value="">-- Sélectionnez une catégorie --</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.nom}
                </option>
              ))}
            </select>
          </div>

          {/* Submit button */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full flex justify-center items-center px-4 py-3 border border-transparent rounded-md shadow-sm text-sm font-medium text-black bg-amber-50 hover:bg-amber-100 transition-colors ${
                isLoading ? "opacity-75 cursor-not-allowed" : ""
              }`}
            >
              {isLoading ? "Ajout en cours..." : "Ajouter Sous-Collection"}
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
}