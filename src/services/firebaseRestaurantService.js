import {
    collection,
    doc,
    getDocs,
    addDoc,
    updateDoc,
    deleteDoc,
    query,
    where,
    orderBy,
    writeBatch,
    getDoc
} from 'firebase/firestore';
import { db } from '../firebase/config';

const COLLECTION_NAME = 'restaurants';

const generateId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substring(2, 9); 
};

export const getRestaurants = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, COLLECTION_NAME));
    const restaurants = [];
    
    querySnapshot.forEach((doc) => {
      restaurants.push({
        id: doc.id,
        ...doc.data()
      });
    });
    
    if (restaurants.length === 0) {
      const initialRestaurants = await initializeRestaurants();
      return initialRestaurants;
    }

    return restaurants.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  } catch (error) {
    console.error('Error al obtener restaurantes:', error);
    throw error;
  }
};


export const getRestaurantById = async (id) => {
  try {
    const docRef = doc(db, COLLECTION_NAME, id);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return {
        id: docSnap.id,
        ...docSnap.data()
      };
    } else {
      return null;
    }
  } catch (error) {
    console.error('Error al buscar restaurante:', error);
    throw error;
  }
};

export const searchRestaurantsByName = async (searchTerm) => {
  try {
    const restaurants = await getRestaurants();
    
    if (!searchTerm) {
      return restaurants;
    }

    // Filtrar por nombre (búsqueda insensible a mayúsculas/minúsculas)
    const filteredRestaurants = restaurants.filter(restaurant => 
      restaurant.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return filteredRestaurants;
  } catch (error) {
    console.error('Error al buscar restaurantes:', error);
    throw error;
  }
};


export const addRestaurant = async (restaurantData) => {
  try {
    const newRestaurant = {
      ...restaurantData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    const docRef = await addDoc(collection(db, COLLECTION_NAME), newRestaurant);
    
    return {
      id: docRef.id,
      ...newRestaurant
    };
  } catch (error) {
    console.error('Error al añadir restaurante:', error);
    throw error;
  }
};

export const updateRestaurant = async (id, updatedData) => {
  try {
    const docRef = doc(db, COLLECTION_NAME, id);
    
    const updateData = {
      ...updatedData,
      updatedAt: new Date().toISOString()
    };
    
    await updateDoc(docRef, updateData);
    
    // Retornar el restaurante actualizado
    const updatedRestaurant = await getRestaurantById(id);
    return updatedRestaurant;
  } catch (error) {
    console.error('Error al actualizar restaurante:', error);
    throw error;
  }
};

export const deleteRestaurant = async (id) => {
  try {
    const docRef = doc(db, COLLECTION_NAME, id);
    await deleteDoc(docRef);
    return true;
  } catch (error) {
    console.error('Error al eliminar restaurante:', error);
    throw error;
  }
};


export const getRestaurantsByCategory = async (category) => {
  try {
    const q = query(
      collection(db, COLLECTION_NAME), 
      where("category", "==", category),
      orderBy("createdAt", "desc")
    );
    
    const querySnapshot = await getDocs(q);
    const restaurants = [];
    
    querySnapshot.forEach((doc) => {
      restaurants.push({
        id: doc.id,
        ...doc.data()
      });
    });

    return restaurants;
  } catch (error) {
    console.error('Error al filtrar por categoría:', error);
    throw error;
  }
};


const initializeRestaurants = async () => {
  try {
    const initialRestaurants = getInitialRestaurants();
    const batch = writeBatch(db);
    const addedRestaurants = [];

    initialRestaurants.forEach((restaurant) => {
      const docRef = doc(db, COLLECTION_NAME, restaurant.id);
      batch.set(docRef, restaurant);
      addedRestaurants.push({
        id: restaurant.id,
        ...restaurant
      });
    });

    await batch.commit();

    return addedRestaurants;
  } catch (error) {
    console.error('Error al inicializar restaurantes:', error);
    throw error;
 }
};



const getInitialRestaurants = () => {
  return [
    {
      id: "abc123",
      name: "Nobile Cucina",
      description: "Embárcate en un viaje culinario al corazón de Italia sin salir de la ciudad. Disfruta de nuestros sabores auténticos, desde pastas frescas hechas en casa hasta recetas tradicionales transmitidas por generaciones. Vive una experiencia acogedora y llena de pasión en cada plato, acompañada de una selecta carta de vinos.",
      category: "Mexicana",
      address: "Calle Principal 123, Ciudad",
      phone: "555-123-4567",
      website: "https://lacocina.ejemplo.com",
      priceRange: "$$",
      rating: 4.5,
      imageUrl: "https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg",
      openingHours: "Lun-Vie: 12:00-22:00, Sab-Dom: 13:00-23:00",
      createdAt: "2024-01-15T10:30:00Z"
    },
    {
      id: "def456",
      name: "Ancestral: Sabor de Origen",
      description: "Siente el abrazo de la tradición colombiana en cada bocado que servimos. Te ofrecemos lo mejor de la comida criolla, preparada con ingredientes locales frescos y el auténtico sazón casero de la abuela. Ven y comparte en un ambiente cálido y familiar el verdadero sabor de nuestro país.",
      category: "Italiana",
      address: "Avenida Central 45, Ciudad",
      phone: "555-987-6543",
      website: "https://pastabella.ejemplo.com",
      priceRange: "$$$",
      rating: 4.8,
      imageUrl: "https://w0.peakpx.com/wallpaper/1019/191/HD-wallpaper-restaurant-and-bar-with-gorgeous-view-city-restaurant-view-bar-thumbnail.jpg",
      openingHours: "Mar-Dom: 13:00-23:00, Lunes: Cerrado",
      createdAt: "2024-01-10T14:15:00Z"
    },
    {
      id: "ghi789",
      name: "Fleur de Lys",
      description:"Descubre la elegancia y sofisticación de la alta cocina francesa en nuestro rincón parisino. Deléitate con platos clásicos elaborados con maestría y los ingredientes más frescos y selectos. Sumérgete en un ambiente íntimo y refinado, perfecto para una velada inolvidable.",
      category: "Japonesa",
      address: "Calle Oriente 78, Ciudad",
      phone: "555-789-0123",
      website: "https://sushihouse.ejemplo.com",
      priceRange: "$$$",
      rating: 4.6,
      imageUrl: "https://c4.wallpaperflare.com/wallpaper/803/265/309/sunset-ocean-coast-lights-lanterns-romantic-restaurant-luxury-abstract-photography-hd-art-wallpaper-preview.jpg",
      openingHours: "Todos los días: 11:30-15:00, 18:00-22:30",
      createdAt: "2024-01-05T09:20:00Z"
    },
    {
      id: "jkl012",
      name: "Burger King",
      description: "Hamburguesas gourmet con ingredientes de primera calidad. Variedad de opciones vegetarianas y veganas disponibles.",
      category: "Americana",
      address: "Plaza Mayor 12, Ciudad",
      phone: "555-456-7890",
      website: "https://burgerking.ejemplo.com",
      priceRange: "$$",
      rating: 4.2,
      imageUrl: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd",
      openingHours: "Lun-Dom: 11:00-23:00",
      createdAt: "2023-12-20T16:40:00Z"
    },
    {
      id: "mno345",
      name: "La Paella",
      description: "Auténtica paella valenciana y otras especialidades españolas. Ambiente rústico con terraza al aire libre.",
      category: "Española",
      address: "Calle Sol 56, Ciudad",
      phone: "555-234-5678",
      website: "https://lapaella.ejemplo.com",
      priceRange: "$$$",
      rating: 4.7,
      imageUrl: "https://images.unsplash.com/photo-1515443961218-a51367888e4b",
      openingHours: "Mar-Dom: 13:00-16:00, 20:00-23:30, Lunes: Cerrado",
      createdAt: "2023-12-15T12:10:00Z"
    }
  ];
};