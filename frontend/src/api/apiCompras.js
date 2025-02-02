import axios from 'axios';

const API_BASE_URL = 'https://mte-api.onrender.com/api/suplier';

// Configuración común para las peticiones
const axiosConfig = {
  headers: {
    'Content-Type': 'application/json'
  }
};

const apiCompras = {
  obtenerProveedores: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}`, axiosConfig);
      return response.data;
    } catch (error) {
      console.error('Error en obtenerProveedores:', error);
      throw error;
    }
  },

  agregarProveedor: async (proveedorData) => {
    try {
      await axios.post(`${API_BASE_URL}`, proveedorData, axiosConfig);
      // Obtener lista actualizada después de agregar
      return await apiCompras.obtenerProveedores();
    } catch (error) {
      console.error('Error en agregarProveedor:', error);
      throw error;
    }
  },

  actualizarProveedor: async (proveedorData) => {
    try {
      await axios.put(`${API_BASE_URL}`, {
        id: proveedorData.id,
        name: proveedorData.name,
        ruccode: proveedorData.ruccode
      }, axiosConfig);
      // Obtener lista actualizada después de actualizar
      return await apiCompras.obtenerProveedores();
    } catch (error) {
      console.error('Error en actualizarProveedor:', error);
      throw error;
    }
  },
  
  eliminarProveedor: async (proveedorId) => {
    try {
      await axios.delete(`${API_BASE_URL}`, {
        headers: axiosConfig.headers,
        data: { id: proveedorId }
      });
      // Obtener lista actualizada después de eliminar
      return await apiCompras.obtenerProveedores();
    } catch (error) {
      console.error('Error en eliminarProveedor:', error);
      throw error;
    }
  },
};

export default apiCompras;
