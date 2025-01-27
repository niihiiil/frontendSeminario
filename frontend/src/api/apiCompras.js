import axios from 'axios';

const API_BASE_URL = 'https://mte-api.onrender.com/api/suplier';

// Configuración común para las peticiones
const axiosConfig = {
  headers: {
    'Content-Type': 'application/json'
  }
};

// Manejador de errores común
const handleError = (operation, error) => {
  console.error(`Error en ${operation}:`, error);
  throw error;
};

const apiCompras = {
  obtenerProveedores: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/all`, axiosConfig);
      console.log('Obtener Proveedores:', response.data);
      return response.data;
    } catch (error) {
      handleError('obtenerProveedores', error);
    }
  },

  agregarProveedor: async (proveedorData) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/create`, proveedorData, axiosConfig);
      console.log('Agregar Proveedor:', response.data);
      return response.data;
    } catch (error) {
      handleError('agregarProveedor', error);
    }
  },

  actualizarProveedor: async (proveedorData) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/update`, proveedorData, axiosConfig);
      console.log('Actualizar Proveedor:', response.data);
      return response.data;
    } catch (error) {
      handleError('actualizarProveedor', error);
    }
  },
  
  eliminarProveedor: async (proveedorId) => {
    try {
      const response = await axios.delete(`${API_BASE_URL}/delete/${proveedorId}`);
      console.log('Eliminar Proveedor:', response.data);
      return response.data;
    } catch (error) {
      handleError('eliminarProveedor', error);
    }
  },
};

export default apiCompras;
