import axios from 'axios';

const API_BASE_URL = 'https://mte-api.onrender.com/api';

const axiosConfig = {
  headers: {
    'Content-Type': 'application/json'
  }
};

const apiConfig = {
  obtenerConfiguracion: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/configuration`, axiosConfig);
      return response.data;
    } catch (error) {
      console.error('Error al obtener configuración:', error);
      throw error;
    }
  },

  actualizarConfiguracion: async (configData) => {
    try {
      const response = await axios.put(
        `${API_BASE_URL}/configuration`,
        configData,
        axiosConfig
      );
      return response.data;
    } catch (error) {
      console.error('Error al actualizar configuración:', error);
      throw error;
    }
  }
};

export default apiConfig;
