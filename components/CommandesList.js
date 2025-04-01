import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

export default function CommandesList({ commandes: initialCommandes, totalCommandes }) {
  const router = useRouter();
  const [expandedOrder, setExpandedOrder] = useState(null);
  const [commandes, setCommandes] = useState(initialCommandes);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({
    statut: router.query.statut || '',
    dateFrom: router.query.dateFrom || '',
    dateTo: router.query.dateTo || '',
  });
  const [sortOption, setSortOption] = useState(router.query.sort || 'date_desc');
  const [currentPage, setCurrentPage] = useState(parseInt(router.query.page) || 1);
  const itemsPerPage = 5;
  const totalPages = Math.ceil(totalCommandes / itemsPerPage);

  // Effet pour recharger les commandes quand les filtres changent
  useEffect(() => {
    const loadCommandes = async () => {
      setLoading(true);
      try {
        const query = new URLSearchParams({
          ...filters,
          sort: sortOption,
          page: currentPage,
        }).toString();
        
        const res = await fetch(`/api/commandes?${query}`);
        const data = await res.json();
        setCommandes(data.commandes);
      } catch (error) {
        console.error('Erreur de chargement:', error);
      } finally {
        setLoading(false);
      }
    };

    loadCommandes();
  }, [filters, sortOption, currentPage]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
    setCurrentPage(1); // Reset à la première page quand les filtres changent
  };

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
    setCurrentPage(1);
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('fr-FR', options);
  };

  const statusStyles = {
    'en attente': 'bg-yellow-100 text-yellow-800',
    'confirmée': 'bg-blue-100 text-blue-800',
    'expédiée': 'bg-purple-100 text-purple-800',
    'en livraison': 'bg-orange-100 text-orange-800',
    'livrée': 'bg-green-100 text-green-800',
    'annulée': 'bg-red-100 text-red-800',
  };

  const getDeliveryProgress = (statut) => {
    const steps = [
      { name: 'Confirmée', status: ['confirmée', 'expédiée', 'en livraison', 'livrée'] },
      { name: 'Expédiée', status: ['expédiée', 'en livraison', 'livrée'] },
      { name: 'En livraison', status: ['en livraison', 'livrée'] },
      { name: 'Livrée', status: ['livrée'] },
    ];
    
    return steps.map((step, index) => (
      <div key={index} className="flex items-center">
        <div className={`flex-shrink-0 h-5 w-5 rounded-full ${
          step.status.includes(statut.toLowerCase()) 
            ? 'bg-indigo-600' 
            : 'bg-gray-300'
        }`} />
        <div className={`ml-3 text-sm font-medium ${
          step.status.includes(statut.toLowerCase()) 
            ? 'text-indigo-600' 
            : 'text-gray-500'
        }`}>
          {step.name}
        </div>
      </div>
    ));
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  if (commandes.length === 0) {
    return (
      <div className="bg-white shadow rounded-lg p-6 text-center">
        <svg
          className="mx-auto h-12 w-12 text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1}
            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
          />
        </svg>
        <h3 className="mt-2 text-lg font-medium text-gray-900">Aucune commande trouvée</h3>
        <p className="mt-1 text-gray-500">
          Aucune commande ne correspond à vos critères de recherche.
        </p>
        <div className="mt-6">
          <button
            onClick={() => {
              setFilters({
                statut: '',
                dateFrom: '',
                dateTo: '',
              });
              setSortOption('date_desc');
            }}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
          >
            Réinitialiser les filtres
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Filtres et tri */}
      <div className="bg-white p-4 rounded-lg shadow">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label htmlFor="statut" className="block text-sm font-medium text-gray-700">Statut</label>
            <select
              id="statut"
              name="statut"
              value={filters.statut}
              onChange={handleFilterChange}
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            >
              <option value="">Tous les statuts</option>
              <option value="en attente">En attente</option>
              <option value="confirmée">Confirmée</option>
              <option value="expédiée">Expédiée</option>
              <option value="en livraison">En livraison</option>
              <option value="livrée">Livrée</option>
              <option value="annulée">Annulée</option>
            </select>
          </div>
          
          <div>
            <label htmlFor="dateFrom" className="block text-sm font-medium text-gray-700">Date de début</label>
            <input
              type="date"
              id="dateFrom"
              name="dateFrom"
              value={filters.dateFrom}
              onChange={handleFilterChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          
          <div>
            <label htmlFor="dateTo" className="block text-sm font-medium text-gray-700">Date de fin</label>
            <input
              type="date"
              id="dateTo"
              name="dateTo"
              value={filters.dateTo}
              onChange={handleFilterChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          
          <div>
            <label htmlFor="sort" className="block text-sm font-medium text-gray-700">Trier par</label>
            <select
              id="sort"
              name="sort"
              value={sortOption}
              onChange={handleSortChange}
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            >
              <option value="date_desc">Date récente → ancienne</option>
              <option value="date_asc">Date ancienne → récente</option>
              <option value="montant_desc">Montant élevé → faible</option>
              <option value="montant_asc">Montant faible → élevé</option>
            </select>
          </div>
        </div>
      </div>
      
      {/* Liste des commandes */}
      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <ul className="divide-y divide-gray-200">
          {commandes.map((commande) => (
            <li key={commande.id} className="px-4 py-5 sm:px-6">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    <span className="inline-flex items-center justify-center h-10 w-10 rounded-full bg-indigo-100">
                      <span className="text-indigo-600 font-medium">#{commande.id}</span>
                    </span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      Commande du {formatDate(commande.date_commande)}
                    </p>
                    <p className="text-sm text-gray-500">
                      {commande.produits.length} article(s) • Total: {commande.montant_total} €
                    </p>
                  </div>
                </div>
                <div className="mt-3 sm:mt-0">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      statusStyles[commande.statut.toLowerCase()] || 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    {commande.statut}
                  </span>
                </div>
              </div>
              
              {/* Suivi de livraison */}
              {['confirmée', 'expédiée', 'en livraison', 'livrée'].includes(commande.statut.toLowerCase()) && (
                <div className="mt-4">
                  <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                    Suivi de livraison
                  </h4>
                  <div className="grid grid-cols-4 gap-4">
                    {getDeliveryProgress(commande.statut)}
                  </div>
                </div>
              )}
              
              <button
                onClick={() => toggleOrder(commande.id)}
                className="mt-3 text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none"
              >
                {expandedOrder === commande.id ? 'Masquer les détails' : 'Voir les détails'}
              </button>
              
              {expandedOrder === commande.id && (
                <div className="mt-4 border-t border-gray-200 pt-4">
                  <h4 className="text-sm font-medium text-gray-900 mb-2">Détails de la commande</h4>
                  
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Article
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Quantité
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Prix unitaire
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Total
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {commande.produits.map((produit, idx) => (
                          <tr key={idx}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                              {produit.nom}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {produit.quantite}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {produit.prix_unitaire} €
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {produit.prix_unitaire * produit.quantite} €
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  
                  <div className="mt-6 flex justify-end">
                    <div className="bg-gray-50 p-4 rounded-lg w-full sm:w-1/3">
                      <div className="flex justify-between py-2 text-sm text-gray-600">
                        <span>Sous-total</span>
                        <span>{commande.sous_total} €</span>
                      </div>
                      <div className="flex justify-between py-2 text-sm text-gray-600">
                        <span>Frais de livraison</span>
                        <span>{commande.frais_livraison} €</span>
                      </div>
                      <div className="flex justify-between py-2 text-sm font-medium text-gray-900">
                        <span>Total</span>
                        <span>{commande.montant_total} €</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-6 flex flex-col sm:flex-row sm:justify-end space-y-3 sm:space-y-0 sm:space-x-3">
                    <button
                      type="button"
                      className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Télécharger la facture
                    </button>
                    <button
                      type="button"
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Commander à nouveau
                    </button>
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
      
      {/* Pagination */}
      {totalPages > 1 && (
        <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6 rounded-b-lg shadow">
          <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-700">
                Affichage de <span className="font-medium">{(currentPage - 1) * itemsPerPage + 1}</span> à <span className="font-medium">
                  {Math.min(currentPage * itemsPerPage, totalCommandes)}
                </span> sur <span className="font-medium">{totalCommandes}</span> commandes
              </p>
            </div>
            <div>
              <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                <button
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className={`relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium ${
                    currentPage === 1 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-500 hover:bg-gray-50'
                  }`}
                >
                  <span className="sr-only">Précédent</span>
                  <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </button>
                
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  let pageNum;
                  if (totalPages <= 5) {
                    pageNum = i + 1;
                  } else if (currentPage <= 3) {
                    pageNum = i + 1;
                  } else if (currentPage >= totalPages - 2) {
                    pageNum = totalPages - 4 + i;
                  } else {
                    pageNum = currentPage - 2 + i;
                  }
                  
                  return (
                    <button
                      key={pageNum}
                      onClick={() => setCurrentPage(pageNum)}
                      className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                        currentPage === pageNum
                          ? 'z-10 bg-indigo-50 border-indigo-500 text-indigo-600'
                          : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                })}
                
                <button
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className={`relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium ${
                    currentPage === totalPages ? 'text-gray-300 cursor-not-allowed' : 'text-gray-500 hover:bg-gray-50'
                  }`}
                >
                  <span className="sr-only">Suivant</span>
                  <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                </button>
              </nav>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}