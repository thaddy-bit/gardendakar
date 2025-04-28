import Layout from '../../../components/Admin/Layout';
import { useState } from "react";

export default function AjouterMarque() {
  const [isLoading, setIsLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    nom: "",
    description: "",
    zone:"",
  });
  
  const [image, setImage] = useState(null);


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formDataToSend = new FormData();
    Object.keys(formData).forEach((key) => {
      formDataToSend.append(key, formData[key]);
    });
    if (image) {
      formDataToSend.append("image", image);
    }

    const response = await fetch("/api/marques/add", {
      method: "POST",
      body: formDataToSend,
    });

    const data = await response.json();
    alert(data.message || data.error);
  };

  return (
    <Layout>
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-12">
        <div className="bg-amber-50 py-6 px-8 text-center">
            <h1 className="text-3xl font-bold text-black">Ajouter une Collection</h1>
            <p className="mt-2 text-black">Accédez à votre espace professionnel</p>
        </div>
        <form onSubmit={handleSubmit} className="p-4 mt-10 max-w-md mx-auto space-y-4">
          {/* Nom */}
        <div>
          <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
            Nom
          </label>
          <div className="relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"> 
            </div>
            <input
              id="lastName"
              name="nom"
              type="text"
              required
              onChange={handleChange}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-900 focus:border-green-900 sm:text-sm"
              placeholder="Nom collection"
            />
          </div>
        </div>

        <div>
        <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
          Description
        </label>
        <div className="relative rounded-md shadow-sm">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          </div>
          <textarea
            id="lastName"
            name="description"
            required
            onChange={handleChange}
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-900 focus:border-green-900 sm:text-sm"
            placeholder="Description"
          />
        </div>
        </div>

        <div>
          <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
          Importer la photo
          </label>
          <div className="relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"> 
            </div>
            <input
              id="lastName"
              type="file"
              required
              onChange={handleImageChange}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-900 focus:border-green-900 sm:text-sm"
              placeholder="zone géographique"
            />
          </div>
        </div>
        <div className="pt-2">
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full flex justify-center items-center px-4 py-3 border border-transparent rounded-md shadow-sm text-sm font-medium text-black bg-amber-50 hover:bg-amber-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-bg-amber-100 transition-colors ${
              isLoading ? 'opacity-75 cursor-not-allowed' : ''
            }`}
          >
            {isLoading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Création du compte...
              </>
            ) : (
              "Ajouter Produit"
            )}
          </button>
        </div>
        </form>
        </div>
        
    </Layout>
    
  );
}
