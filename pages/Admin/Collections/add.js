import Master from '../../../components/Master';
import { useState } from "react";

export default function AjouterMarque() {
  const [formData, setFormData] = useState({
    nom: "",
    description: "",
    zone_id: ""
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

    const response = await fetch("/api/collections/add", {
      method: "POST",
      body: formDataToSend,
    });

    const data = await response.json();
    alert(data.message || data.error);
  };

  return (
    <Master>
        <form onSubmit={handleSubmit} className="p-4 max-w-md mx-auto space-y-4">
        <input type="text" name="nom" placeholder="Nom" className='border w-full' onChange={handleChange} required />
        <textarea name="description" placeholder="Description" className='border w-full' onChange={handleChange} required />
        <input type="number" name="zone_id" className='border w-full' placeholder="Zone" onChange={handleChange} required />

        <input type="file" onChange={handleImageChange} className='border w-full' required />
        <button className='border w-full' type="submit">Ajouter Produit</button>
        </form>
    </Master>
    
  );
}
