
'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

type Vehicle = {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
};

export default function Home() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVehicles = async () => {
      const { data, error } = await supabase.from('vehicles').select('*');
      if (error) console.error('Error loading vehicles:', error);
      else setVehicles(data || []);
      setLoading(false);
    };
    fetchVehicles();
  }, []);

  return (
    <main className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-4xl font-bold mb-8 text-center">Vehicle Inventory</h1>
      {loading ? (
        <p className="text-center">Loading vehicles...</p>
      ) : (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {vehicles.map((vehicle) => (
            <div key={vehicle.id} className="bg-white p-4 rounded-xl shadow">
              <img src={vehicle.image} alt={vehicle.name} className="w-full h-48 object-cover rounded-lg mb-2" />
              <h2 className="text-xl font-semibold">{vehicle.name}</h2>
              <p className="text-green-600 font-bold">${vehicle.price}</p>
              <p className="text-sm text-gray-600 mt-2" dangerouslySetInnerHTML={{ __html: vehicle.description }} />
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
