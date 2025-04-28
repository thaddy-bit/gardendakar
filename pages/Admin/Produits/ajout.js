import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import toast, { Toaster } from "react-hot-toast";

export default function ProduitForm() {
  const router = useRouter();
  const { id } = router.query;
  const [product, setProduct] = useState({
    nom: "",
    description: "",
    prix: "",
    quantite: "",
    image_url: "",
    catégorie_id: "",
    sous_catégorie_id: "",
    rating: "",
    reviews: "",
    isNew: false,
    taille: "",
    couleur: "",
    materiau: "",
    marque: "",
    poids: "",
    gallery: [],
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (id) {
      setLoading(true);
      fetch(`/api/produits/ajout`)
        .then((res) => res.json())
        .then((data) => {
          setProduct(data);
          setLoading(false);
        })
        .catch(() => {
          toast.error("Erreur de chargement du produit");
          setLoading(false);
        });
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleGalleryChange = (e) => {
    const files = Array.from(e.target.files).map((file) => URL.createObjectURL(file));
    setProduct({ ...product, gallery: files });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const method = id ? "PUT" : "POST";
      const url = id ? `/api/produits/${id}` : "/api/produits";
      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
      });
      const data = await res.json();
      if (res.ok) {
        toast.success(id ? "Produit modifié avec succès" : "Produit ajouté avec succès");
        router.push("/produits"); // redirige vers la liste des produits
      } else {
        toast.error(data.message || "Erreur lors de l'enregistrement du produit");
      }
    } catch (err) {
      toast.error("Erreur lors de l'enregistrement du produit");
    }
  };

  if (loading) {
    return <div>Chargement...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <Toaster position="top-right" />
      <h1 className="text-2xl font-bold">{id ? "Modifier le produit" : "Ajouter un produit"}</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium">Nom</label>
          <input
            type="text"
            name="nom"
            value={product.nom}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="block font-medium">Description</label>
          <textarea
            name="description"
            value={product.description}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="block font-medium">Prix</label>
          <input
            type="number"
            name="prix"
            value={product.prix}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="block font-medium">Quantité</label>
          <input
            type="number"
            name="quantite"
            value={product.quantite}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="block font-medium">Image principale</label>
          <input
            type="file"
            name="image_url"
            onChange={(e) => handleChange(e)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="block font-medium">Galerie d'images</label>
          <input
            type="file"
            multiple
            name="gallery"
            onChange={handleGalleryChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block font-medium">Catégorie</label>
          <input
            type="text"
            name="catégorie_id"
            value={product.catégorie_id}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="block font-medium">Sous-catégorie</label>
          <input
            type="text"
            name="sous_catégorie_id"
            value={product.sous_catégorie_id}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="block font-medium">Taille</label>
          <input
            type="text"
            name="taille"
            value={product.taille}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="block font-medium">Couleur</label>
          <input
            type="text"
            name="couleur"
            value={product.couleur}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="block font-medium">Matériau</label>
          <input
            type="text"
            name="materiau"
            value={product.materiau}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="block font-medium">Marque</label>
          <input
            type="text"
            name="marque"
            value={product.marque}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="block font-medium">Poids</label>
          <input
            type="number"
            name="poids"
            value={product.poids}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="block font-medium">Produit neuf ?</label>
          <input
            type="checkbox"
            name="isNew"
            checked={product.isNew}
            onChange={(e) => setProduct({ ...product, isNew: e.target.checked })}
            className="w-full p-2 border rounded"
          />
        </div>

        <button
          type="submit"
          className="bg-amber-500 hover:bg-amber-600 text-white px-6 py-3 rounded-lg transition font-medium"
        >
          {id ? "Mettre à jour" : "Ajouter"}
        </button>
      </form>
    </div>
  );
}