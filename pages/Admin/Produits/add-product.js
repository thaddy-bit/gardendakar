import Layout from '../../../components/Layout';
import { useState } from "react";

export default function AjouterProduit() {
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

    const response = await fetch("/api/products", {
      method: "POST",
      body: formDataToSend,
    });

    const data = await response.json();
    alert(data.message || data.error);
  };

  return (
    <Layout>
        <form onSubmit={handleSubmit} className="p-4 max-w-md mx-auto space-y-4">
        <input type="text" name="nom" placeholder="Nom" onChange={handleChange} required />
        <textarea name="description" placeholder="Description" onChange={handleChange} required />
        <input type="number" name="prix" placeholder="Prix" onChange={handleChange} required />
        <input type="number" name="quantite" placeholder="Quantité" onChange={handleChange} required />
        <input type="number" name="categorie_id" placeholder="ID Catégorie" onChange={handleChange} required />
        <input type="number" name="sous_categorie_id" placeholder="ID Sous-Catégorie" onChange={handleChange} required />
        <input type="number" name="rating" placeholder="Note (ex: 4.5)" step="0.1" onChange={handleChange} />
        <input type="text" name="reviews" placeholder="Avis" onChange={handleChange} />
        <select name="isNew" onChange={handleChange} required>
            <option value="">Nouveau produit ?</option>
            <option value="1">Oui</option>
            <option value="0">Non</option>
        </select>
        <input type="file" onChange={handleImageChange} required />
        <button type="submit">Ajouter Produit</button>
        </form>
    </Layout>
    
  );
}
