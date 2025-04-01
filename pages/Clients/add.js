import AddClientForm from '../../components/AddClientForm';
import Layout from '../../components/Layout';
import Head from 'next/head';

export default function AddClientPage() {
  return (
    
    <Layout>
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <AddClientForm />
      </div>
    </Layout>
      
  
  );
}