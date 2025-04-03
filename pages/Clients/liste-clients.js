// pages/clients.js
import { useEffect, useState } from 'react';

export default function Clients() {
  const [clients, setClients] = useState([]);
  const [selectedClient, setSelectedClient] = useState(null);

  const [formData, setFormData] = useState({
    email: '', nom: '', prenom: '', telephone: '', adresse_ligne1: '', adresse_ligne2: '', code_postal: '', ville: '', pays: 'France', date_naissance: '', newsletter: false
  });

  useEffect(() => {
    fetch('/api/clients/clients')
      .then(res => res.json())
      .then(data => setClients(data));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const method = selectedClient ? 'PUT' : 'POST';
    const body = selectedClient ? { id: selectedClient.id, ...formData } : formData;

    await fetch('/api/clients', {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });
    setSelectedClient(null);
    setFormData({ email: '', nom: '', prenom: '', telephone: '', adresse_ligne1: '', adresse_ligne2: '', code_postal: '', ville: '', pays: 'France', date_naissance: '', newsletter: false });
    fetch('/api/clients/clients')
      .then(res => res.json())
      .then(data => setClients(data));
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Liste des Clients</h1>
      <table className="w-full border-collapse border border-gray-200 mb-6">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">Nom</th>
            <th className="border p-2">Email</th>
            <th className="border p-2">Téléphone</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          
        </tbody>
      </table>
      
      <h2 className="text-xl font-bold mb-2">{selectedClient ? 'Modifier' : 'Ajouter'} un Client</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" placeholder="Nom" value={formData.nom} onChange={e => setFormData({ ...formData, nom: e.target.value })} className="border p-2 w-full" />
        <input type="text" placeholder="Email" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} className="border p-2 w-full" />
        <button type="submit" className="bg-green-500 text-white px-3 py-1 rounded">{selectedClient ? 'Modifier' : 'Ajouter'}</button>
      </form>
    </div>
  );
}