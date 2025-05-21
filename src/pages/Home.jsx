import { restaurantsData } from "../data";

const Home = () => {
  return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl font-bold text-center mb-6">
        Restaurantes Disponibles
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {restaurantsData.map((restaurant) => (
          <div
            key={restaurant.id}
            className="bg-white rounded-lg shadow-md overflow-hidden transition-transform transform hover:scale-105 hover:shadow-xl duration-300"
          >
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

export default Home;
