import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Layout from "../../components/Admin/Layout";
import { ShoppingCart, Users, Package, DollarSign } from "lucide-react";
import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";

const COLORS = ["#8884d8", "#82ca9d", "#ffc658"];

export default function Dashboard() {
  const [stats, setStats] = useState([]);
  const [ventesParMois, setVentesParMois] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get("/api/dashboard-stats");
        setStats(res.data.stats);
        setVentesParMois(res.data.ventesParMois);
        setCategories(res.data.categories);
      } catch (error) {
        console.error("Erreur lors de la récupération des données du dashboard :", error);
      }
    };

    fetchStats();

    const interval = setInterval(fetchStats, 10000); // actualisation toutes les 10s
    return () => clearInterval(interval);
  }, []);

  return (
    <Layout>
      <div className="p-6 space-y-6">
      <h2 className="text-2xl font-bold">Dashboard</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <Card key={i} className={`rounded-2xl shadow-md ${stat.color} text-black`}>
            <CardContent className="flex items-center justify-between p-4">
              <div>
                <p className="text-sm opacity-75">{stat.title}</p>
                <h3 className="text-xl font-semibold">{stat.value}</h3>
              </div>
              <div className="p-2 bg-white/20 rounded-full">{stat.icon}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="col-span-2">
          <CardContent className="p-4">
            <h3 className="text-lg font-semibold mb-2">Ventes par mois</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={ventesParMois}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="mois" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="ventes" stroke="#4f46e5" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <h3 className="text-lg font-semibold mb-2">Répartition des produits</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={categories}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100)}%`}
                  outerRadius={80}
                  dataKey="value"
                >
                  {categories.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="mt-6">
        <Link 
        href="/Admin/Produits/add-product"
        className="bg-amber-300 hover:bg-amber-400 px-3 py-2 rounded-sm text-white font-semibold">
          Ajouter un nouveau produit
        </Link>
      </div>
      </div>
    </Layout>
  );
}