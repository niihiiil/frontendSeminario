import axios from 'axios';

const API_BASE_URL = 'https://mte-api.onrender.com/api/employee';

const apiConfig = {
  obtenerEmpleados: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/all`);
      console.log('Obtener Empleados:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error en obtenerEmpleados:', error);
      throw error;
    }
  },

  agregarEmpleado: async (empleadoData) => {
    try {
      const response = await axios.post(API_BASE_URL, empleadoData);
      console.log('Agregar Empleado:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error en agregarEmpleado:', error);
      throw error;
    }
  },

  actualizarEmpleado: async (empleadoData) => {
    try {
      const response = await axios.put(`${API_BASE_URL}`, empleadoData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      console.log('Actualizar Empleado:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error en actualizarEmpleado:', error);
      throw error;
    }
  },
  
  eliminarEmpleado: async (empleadoId) => {
    try {
      const response = await axios.delete(`${API_BASE_URL}`, { data: { id: empleadoId } });
      console.log('Eliminar Empleado:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error en eliminarEmpleado:', error);
      throw error;
    }
  },
};  

export default apiConfig;
