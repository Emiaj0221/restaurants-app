import React, { useState } from 'react';
import Swal from 'sweetalert2'; 

const NewRestaurant = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    image: '',
    address: '', 
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!formData.name || !formData.description || !formData.address || !formData.image) {
      Swal.fire({
        title: 'Error',
        text: 'Por favor, completa todos los campos',
        icon: 'error',
        confirmButtonText: 'Aceptar',
      });
      return;
    }

    console.log('Datos del formulario:', formData);
  
    try {
    const response = await fetch('/api/restaurants', {
    method: 'POST',
     headers: {
     'Content-Type': 'application/json',
         },
        body: JSON.stringify(formData),
       });
       const data = await response.json();
       console.log('Respuesta del servidor:', data);
        // Mostrar un mensaje de éxito con SweetAlert
       Swal.fire({
         title: 'Éxito',
         text: 'El restaurante se ha guardado correctamente',
         icon: 'success',
         confirmButtonText: 'Ok',
       });
        //Limpiar el formulario después del éxito
       setFormData({ name: '', description: '', image: '', address: '' });
     } catch (error) {
       console.error('Error al guardar el restaurante:', error);
       // Mostrar un mensaje de error con SweetAlert
       Swal.fire({
         title: 'Error',
         text: 'Hubo un error al guardar el restaurante',
         icon: 'error',
         confirmButtonText: 'Ok',
       });
     }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl font-bold text-center mb-6">Agregar Nuevo Restaurante</h2>
      <form onSubmit={handleSubmit} className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md">
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700 font-bold mb-2">Nombre</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block text-gray-700 font-bold mb-2">Descripción</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="3"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            required
          ></textarea>
        </div>
        <div className="mb-4">
          <label htmlFor="address" className="block text-gray-700 font-bold mb-2">Dirección</label>
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="image" className="block text-gray-700 font-bold mb-2">URL de la Imagen</label>
          <input
            type="url"
            id="image"
            name="image"
            value={formData.image}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            required
          />
        </div>
        <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition duration-300">
          Guardar Restaurante
        </button>
      </form>
    </div>
  );
};

export default NewRestaurant;