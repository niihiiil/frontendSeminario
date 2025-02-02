import axios from 'axios';

const API_BASE_URL = 'https://mte-api.onrender.com/api';

// Common configuration for requests
const axiosConfig = {
  headers: {
    'Content-Type': 'application/json',
  },
};

// Common error handler
const handleError = (operation, error) => {
  console.error(`Error in ${operation}:`, error);
  throw error;
};

const apiProd = {
  // Endpoints for Product Categories
  obtenerCategorias: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/product-category/all`, axiosConfig);
      console.log('Get Categories:', response.data);
      return response.data;
    } catch (error) {
      handleError('obtenerCategorias', error);
    }
  },

  agregarCategoria: async (categoriaData) => {
    try {
      await axios.post(`${API_BASE_URL}/product-category`, categoriaData, axiosConfig);
      return await apiProd.obtenerCategorias(); // Obtener lista actualizada
    } catch (error) {
      handleError('agregarCategoria', error);
    }
  },

  actualizarCategoria: async (categoriaData) => {
    try {
      await axios.put(`${API_BASE_URL}/product-category`, categoriaData, axiosConfig);
      return await apiProd.obtenerCategorias(); // Obtener lista actualizada
    } catch (error) {
      handleError('actualizarCategoria', error);
    }
  },

  eliminarCategoria: async (categoriaId) => {
    try {
      await axios.delete(`${API_BASE_URL}/product-category`, {
        headers: axiosConfig.headers,
        data: { id: categoriaId }
      });
      return await apiProd.obtenerCategorias(); // Obtener lista actualizada
    } catch (error) {
      handleError('eliminarCategoria', error);
    }
  },

  // Endpoints for Products
  obtenerProductos: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/products`, axiosConfig);
      console.log('Get Products:', response.data);
      return response.data;
    } catch (error) {
      handleError('obtenerProductos', error);
    }
  },

  agregarProducto: async (productoData) => {
    try {
      await axios.post(`${API_BASE_URL}/products`, productoData, axiosConfig);
      return await apiProd.obtenerProductos(); // Obtener lista actualizada
    } catch (error) {
      handleError('agregarProducto', error);
    }
  },

  actualizarProducto: async (productoData) => {
    try {
      await axios.put(`${API_BASE_URL}/products`, productoData, axiosConfig);
      return await apiProd.obtenerProductos(); // Obtener lista actualizada
    } catch (error) {
      handleError('actualizarProducto', error);
    }
  },

  eliminarProducto: async (productoId) => {
    try {
      await axios.delete(`${API_BASE_URL}/products`, {
        headers: axiosConfig.headers,
        data: { id: productoId }
      });
      return await apiProd.obtenerProductos(); // Obtener lista actualizada
    } catch (error) {
      handleError('eliminarProducto', error);
    }
  },

  // Endpoints para Marcas
  obtenerMarcas: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/brands`, axiosConfig);
      return response.data;
    } catch (error) {
      console.error('Error en obtenerMarcas:', error);
      throw error;
    }
  },

  agregarMarca: async (marcaData) => {
    try {
      await axios.post(`${API_BASE_URL}/brands`, {
        name: marcaData.name,
        description: marcaData.description
      }, axiosConfig);
      return await apiProd.obtenerMarcas();
    } catch (error) {
      console.error('Error en agregarMarca:', error);
      throw error;
    }
  },

  actualizarMarca: async (marcaData) => {
    try {
      await axios.put(`${API_BASE_URL}/brands`, {
        id: marcaData.id,
        name: marcaData.name,
        description: marcaData.description
      }, axiosConfig);
      return await apiProd.obtenerMarcas();
    } catch (error) {
      console.error('Error en actualizarMarca:', error);
      throw error;
    }
  },

  eliminarMarca: async (marcaId) => {
    try {
      await axios.delete(`${API_BASE_URL}/brands?brandId=${marcaId}`, axiosConfig);
      return await apiProd.obtenerMarcas();
    } catch (error) {
      console.error('Error en eliminarMarca:', error);
      throw error;
    }
  },
};

export default apiProd;