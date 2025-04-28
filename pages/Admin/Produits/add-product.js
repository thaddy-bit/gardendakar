import Layout from '../../../components/Admin/Layout';
import { useState, useEffect } from "react";

export default function AjouterProduit() {
  const [isLoading, setIsLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [sousCategories, setSousCategories] = useState([]);

  const [formData, setFormData] = useState({
    nom: "",
    description: "",
    prix: "",
    quantite: "",
    categorie_id: "",
    sous_categorie_id: "",
    rating: "",
    reviews: "",
    isNew: "",
  });

  const [image, setImage] = useState(null);

  useEffect(() => {
    // Charger les catégories depuis l'API
    const fetchCategories = async () => {
      const res = await fetch("/api/categories");
      const data = await res.json();
      setCategories(data);
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    // Quand une catégorie est sélectionnée, charger les sous-catégories
    const fetchSousCategories = async () => {
      if (formData.categorie_id) {
        const res = await fetch(`/api/sous_categories?categorie_id=${formData.categorie_id}`);
        const data = await res.json();
        setSousCategories(data);
      } else {
        setSousCategories([]);
      }
    };
    fetchSousCategories();
  }, [formData.categorie_id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const formDataToSend = new FormData();
    Object.keys(formData).forEach((key) => {
      formDataToSend.append(key, formData[key]);
    });
    if (image) {
      formDataToSend.append("image", image);
    }

    const response = await fetch("/api/products", {
      method: "POST",
      body: formDataToSend,
    });

    const data = await response.json();
    alert(data.message || data.error);
    setIsLoading(false);
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-lg overflow-hidden mb-12">
  {/* Header */}
  <div className="bg-amber-50 from-amber-400 to-yellow-300 py-6 px-8 text-center">
    <h1 className="text-4xl font-extrabold text-black tracking-wide">Ajouter un produit</h1>
  </div>

  {/* Form */}
  <form onSubmit={handleSubmit} className="p-8 md:p-10 space-y-6">
    
    {/* Nom */}
    <div>
      <label className="block text-sm font-semibold text-gray-700 mb-1">Nom du produit</label>
      <input type="text" name="nom" onChange={handleChange} required className="w-full rounded-xl border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-amber-400 focus:outline-none shadow-sm" />
    </div>

    {/* Prix & Quantité */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1">Prix</label>
        <input type="number" name="prix" onChange={handleChange} required className="w-full rounded-xl border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-amber-400 focus:outline-none shadow-sm" />
      </div>
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1">Quantité</label>
        <input type="number" name="quantite" onChange={handleChange} required className="w-full rounded-xl border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-amber-400 focus:outline-none shadow-sm" />
      </div>
    </div>

    {/* Description */}
    <div>
      <label className="block text-sm font-semibold text-gray-700 mb-1">Description</label>
      <textarea name="description" onChange={handleChange} required className="w-full rounded-xl border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-amber-400 focus:outline-none shadow-sm" rows="4" />
    </div>

    {/* Catégorie & Sous-catégorie */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1">Catégorie</label>
        <select name="categorie_id" onChange={handleChange} required className="w-full rounded-xl border border-gray-300 px-4 py-2 bg-white focus:ring-2 focus:ring-amber-400 focus:outline-none shadow-sm">
          <option value="">-- Sélectionnez une catégorie --</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>{cat.nom}</option>
          ))}
        </select>
      </div>
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1">Sous-catégorie</label>
        <select name="sous_categorie_id" onChange={handleChange} required className="w-full rounded-xl border border-gray-300 px-4 py-2 bg-white focus:ring-2 focus:ring-amber-400 focus:outline-none shadow-sm">
          <option value="">-- Sélectionnez une sous-catégorie --</option>
          {Array.isArray(sousCategories) && sousCategories.map((sous) => (
            <option key={sous.id} value={sous.id}>{sous.nom}</option>
          ))}
        </select>
      </div>
    </div>

    {/* Note & Avis */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1">Note</label>
        <input type="number" step="0.1" name="rating" onChange={handleChange} required className="w-full rounded-xl border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-amber-400 focus:outline-none shadow-sm" />
      </div>
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1">Avis</label>
        <input type="text" name="reviews" onChange={handleChange} required className="w-full rounded-xl border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-amber-400 focus:outline-none shadow-sm" />
      </div>
    </div>

    {/* Produit neuf */}
    <div>
      <label className="block text-sm font-semibold text-gray-700 mb-1">Nouveau produit ?</label>
      <select name="isNew" onChange={handleChange} required className="w-full rounded-xl border border-gray-300 px-4 py-2 bg-white focus:ring-2 focus:ring-amber-400 focus:outline-none shadow-sm">
        <option value="">-- Sélectionnez --</option>
        <option value="1">Oui</option>
        <option value="0">Non</option>
      </select>
    </div>

    {/* Image */}
    <div>
      <label className="block text-sm font-semibold text-gray-700 mb-1">Image du produit</label>
      <input type="file" onChange={handleImageChange} required className="w-full rounded-xl border border-gray-300 px-4 py-2 bg-white focus:outline-none shadow-sm" />
    </div>

    {/* Submit */}
    <div className="pt-4">
      <button
        type="submit"
        disabled={isLoading}
        className="w-full py-3 bg-green-700 hover:bg-green-800 text-white font-semibold rounded-xl shadow-lg transition duration-200"
      >
        {isLoading ? "Envoi en cours..." : "Ajouter le produit"}
      </button>
    </div>
  </form>
      </div>

    </Layout>
  );
}