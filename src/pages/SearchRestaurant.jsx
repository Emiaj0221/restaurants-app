import React, { useState } from 'react';
import { restaurantsData } from '../data';

const Search = () => {
  const [query, setQuery] = useState('');

  const filteredRestaurants = restaurantsData.filter((restaurant) =>
    restaurant.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl font-bold text-center mb-6">Buscar Restaurantes</h2>
      <div className="flex justify-center mb-6">
        <input
          type="text"
          placeholder="Buscar por nombre ..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full md:w-1/2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredRestaurants.map((restaurant) => (
          <div key={restaurant.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <img
              src={restaurant.image}
              alt={restaurant.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-bold mb-2">{restaurant.name}</h3>
              <p className="text-gray-600 mb-2">{restaurant.description}</p>
              <p className="text-gray-700">
                <strong>Dirección:</strong> {restaurant.address}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Search;
