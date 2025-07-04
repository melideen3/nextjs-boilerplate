'use client'

import { createClient } from '@supabase/supabase-js'
import { useEffect, useState } from 'react'

type Vehicle = {
  id: number
  title: string
  price: number
  image_url: string
}

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export default function Page() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([])

  useEffect(() => {
    const fetchVehicles = async () => {
      const { data, error } = await supabase.from('vehicles').select('*')
      if (error) {
        console.error('Supabase error:', error)
      } else {
        setVehicles(data)
      }
    }

    fetchVehicles()
  }, [])

  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold mb-6">Available Vehicles</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {vehicles.map((vehicle) => (
          <div key={vehicle.id} className="border rounded-2xl shadow p-4">
            <img src={vehicle.image_url} alt={vehicle.title} className="w-full h-48 object-cover rounded-xl mb-4" />
            <h2 className="text-xl font-semibold">{vehicle.title}</h2>
            <p className="text-lg text-green-600 font-bold">${vehicle.price.toLocaleString()}</p>
          </div>
        ))}
      </div>
    </main>
  )
}
