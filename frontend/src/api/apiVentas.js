import axios from 'axios';

const API_BASE_URL = 'https://mte-api.onrender.com/api';

const axiosConfig = {
  headers: {
    'Content-Type': 'application/json'
  }
};

const apiVentas = {
  obtenerVentas: async (params = {}) => {
    try {
      let url = `${API_BASE_URL}/sale-bills`;
      
      // Agregar parámetros de búsqueda si existen
      if (params.fechaInicio && params.fechaFin) {
        const fromDate = formatearFecha(params.fechaInicio, false);
        const toDate = formatearFecha(params.fechaFin, true);
        url += `?From=${encodeURIComponent(fromDate)}&To=${encodeURIComponent(toDate)}`;
      }

      const response = await axios.get(url, axiosConfig);
      return Array.isArray(response.data) ? response.data : [];
    } catch (error) {
      console.error('Error al obtener ventas:', error);
      return [];
    }
  },

  crearVenta: async (ventaData) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/sale-bills`,
        ventaData,
        axiosConfig
      );
      return response.data;
    } catch (error) {
      console.error('Error al crear venta:', error);
      throw error;
    }
  },

  obtenerClientes: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/client/all`, axiosConfig);
      return response.data;
    } catch (error) {
      console.error('Error al obtener clientes:', error);
      return [];
    }
  },

  obtenerEmpleados: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/employee/all`, axiosConfig);
      return response.data;
    } catch (error) {
      console.error('Error al obtener empleados:', error);
      return [];
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

// Función auxiliar para formatear fechas
const formatearFecha = (fecha, esFin = false) => {
  const d = new Date(fecha);
  if (esFin) {
    d.setHours(23, 59, 59, 999);
  } else {
    d.setHours(0, 0, 0, 0);
  }
  return d.toISOString();
};

export default apiVentas;
