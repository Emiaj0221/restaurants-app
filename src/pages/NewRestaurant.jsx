import { useState } from "react";
import Swal from "sweetalert2";

const NewRestaurant = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    image: "",
    address: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (
      !formData.name ||
      !formData.description ||
      !formData.address ||
      !formData.image
    ) {
      Swal.fire({
        title: "Error",
        text: "Por favor, completa todos los campos",
        icon: "error",
        confirmButtonText: "Aceptar",
      });
      return;
    }

    console.log('Datos del formulario:', formData);
  
    try {
      const response = await fetch("/api/restaurants", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      console.log('Respuesta del servidor:', data);
      Swal.fire({
        title: "Éxito",
        text: "El restaurante se ha guardado correctamente",
        icon: "success",
        confirmButtonText: "Ok",
      });
      //Limpiar el formulario después del éxito
      setFormData({ name: "", description: "", image: "", address: "" });
    } catch (error) {
      console.error("Error al guardar el restaurante:", error);
      // Mostrar un mensaje de error con SweetAlert
      Swal.fire({
        title: "Error",
        text: "Hubo un error al guardar el restaurante",
        icon: "error",
        confirmButtonText: "Ok",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-2xl shadow-lg">
        <h2 className="text-3xl font-semibold text-center text-purple-800 mb-6">
          Agregar Nuevo Restaurante
        </h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Nombre
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
              Descripción
            </label>
            <textarea
              id="description"
              name="description"
              rows="4"
              value={formData.description}
              onChange={handleChange}
              className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
          </div>

          <div>
            <label htmlFor="address" className="block text-sm font-medium text-gray-700">
              Dirección
            </label>
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
          </div>

          <div>
            <label htmlFor="image" className="block text-sm font-medium text-gray-700">
              URL de la Imagen
            </label>
            <input
              type="url"
              id="image"
              name="image"
              value={formData.image}
              onChange={handleChange}
              className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-purple-700 hover:bg-purple-800 text-white font-semibold py-3 px-4 rounded-md transition duration-300"
          >
            Guardar Restaurante
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewRestaurant;
