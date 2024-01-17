import axios from 'axios';

const API_BASE_URL = 'https://rsandy-001-site1.atempurl.com/api/suplier';

const apiCompras = {
  obtenerProveedores: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/all`);
      console.log('Obtener Proveedores:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error en obtenerProveedores:', error);
      throw error;
    }
  },

  agregarProveedor: async (proveedorData) => {
    try {
      const response = await axios.post(API_BASE_URL, proveedorData);
      console.log('Agregar Proveedor:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error en agregarProveedor:', error);
      throw error;
    }
  },

  actualizarProveedor: async (proveedorData) => {
    try {
      const response = await axios.put(`${API_BASE_URL}`, proveedorData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      console.log('Actualizar Proveedor:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error en actualizarProveedor:', error);
      throw error;
    }
  },
  
  eliminarProveedor: async (proveedorId) => {
    try {
      const response = await axios.delete(`${API_BASE_URL}`, { data: { id: proveedorId } });
      console.log('Eliminar Proveedor:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error en eliminarProveedor:', error);
      throw error;
    }
  },
};  

export default apiCompras;
