import axios from 'axios';

const API_BASE_URL = 'https://rsandy-001-site1.atempurl.com/api/client';

const apiVentas = {
  obtenerClientes: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/all`);
      console.log('Obtener Clientes:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error en obtenerClientes:', error);
      throw error;
    }
  },

  agregarCliente: async (clienteData) => {
    try {
      const response = await axios.post(API_BASE_URL, clienteData);
      console.log('Agregar Cliente:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error en agregarCliente:', error);
      throw error;
    }
  },

  actualizarCliente: async (clienteData) => {
    try {
      const response = await axios.put(`${API_BASE_URL}`, clienteData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      console.log('Actualizar Cliente:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error en actualizarCliente:', error);
      throw error;
    }
  },
  
  eliminarCliente: async (clienteId) => {
    try {
      const response = await axios.delete(`${API_BASE_URL}`, { data: { id: clienteId } });
      console.log('Eliminar Cliente:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error en eliminarCliente:', error);
      throw error;
    }
  },
};  

export default apiVentas;
