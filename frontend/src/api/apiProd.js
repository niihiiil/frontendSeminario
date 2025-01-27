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
      const response = await axios.post(`${API_BASE_URL}/product-category`, categoriaData, axiosConfig);
      console.log('Add Category:', response.data);
      return response.data;
    } catch (error) {
      handleError('agregarCategoria', error);
    }
  },

  actualizarCategoria: async (categoriaData) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/product-category/update`, categoriaData, axiosConfig);
      console.log('Update Category:', response.data);
      return response.data;
    } catch (error) {
      handleError('actualizarCategoria', error);
    }
  },

  eliminarCategoria: async (categoriaId) => {
    try {
      const response = await axios.delete(`${API_BASE_URL}/product-category/delete/${categoriaId}`);
      console.log('Delete Category:', response.data);
      return response.data;
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
      const response = await axios.post(`${API_BASE_URL}/products`, {
        name: productoData.name,
        description: productoData.description,
        isPack: productoData.isPack,
        productCategoryId: productoData.productCategoryId,
        brandId: productoData.brandId,
        productInPackId: productoData.productInPackId,
        packUnits: productoData.packUnits
      }, axiosConfig);
      console.log('Add Product:', response.data);
      return response.data;
    } catch (error) {
      handleError('agregarProducto', error);
    }
  },

  actualizarProducto: async (productoData) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/products`, {
        name: productoData.name,
        description: productoData.description,
        isPack: productoData.isPack,
        productCategoryId: productoData.productCategoryId,
        brandId: productoData.brandId,
        productInPackId: productoData.productInPackId,
        packUnits: productoData.packUnits
      }, axiosConfig);
      console.log('Update Product:', response.data);
      return response.data;
    } catch (error) {
      handleError('actualizarProducto', error);
    }
  },

  eliminarProducto: async (productoId) => {
    try {
      const response = await axios.delete(`${API_BASE_URL}/products/${productoId}`);
      console.log('Delete Product:', response.data);
      return response.data;
    } catch (error) {
      handleError('eliminarProducto', error);
    }
  },

  // Endpoints para Marcas
  obtenerMarcas: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/brands`, axiosConfig);
      console.log('Get Brands:', response.data);
      return response.data;
    } catch (error) {
      handleError('obtenerMarcas', error);
    }
  },

  agregarMarca: async (marcaData) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/brands`, {
        name: marcaData.name,
        description: marcaData.description
      }, axiosConfig);
      console.log('Add Brand:', response.data);
      return response.data;
    } catch (error) {
      handleError('agregarMarca', error);
    }
  },

  actualizarMarca: async (marcaData) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/brands`, {
        name: marcaData.name,
        description: marcaData.description
      }, axiosConfig);
      console.log('Update Brand:', response.data);
      return response.data;
    } catch (error) {
      handleError('actualizarMarca', error);
    }
  },

  eliminarMarca: async (marcaId) => {
    try {
      const response = await axios.delete(`${API_BASE_URL}/brands/${marcaId}`);
      console.log('Delete Brand:', response.data);
      return response.data;
    } catch (error) {
      handleError('eliminarMarca', error);
    }
  },
};

export default apiProd;