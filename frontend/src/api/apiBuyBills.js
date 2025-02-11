import axios from 'axios';

const API_BASE_URL = 'https://mte-api.onrender.com/api';

// Configuración común para las peticiones
const axiosConfig = {
  headers: {
    'Content-Type': 'application/json'
  }
};

const formatearFecha = (fecha, esFinal = false) => {
  const year = fecha.getFullYear();
  const month = String(fecha.getMonth() + 1).padStart(2, '0');
  const day = String(fecha.getDate()).padStart(2, '0');
  const hours = esFinal ? '23' : '00';
  const minutes = esFinal ? '59' : '00';
  const seconds = esFinal ? '59' : '00';
  
  return `${month}-${day}-${year} ${hours}:${minutes}:${seconds} -6`;
};

const apiBuyBills = {
  // Para obtener todos los proveedores
  obtenerProveedores: async () => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/suplier/all`,
        axiosConfig
      );
      return Array.isArray(response.data) ? response.data : [];
    } catch (error) {
      console.error('Error al obtener proveedores:', error);
      return [];
    }
  },

  // Para obtener todos los empleados
  obtenerEmpleados: async () => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/employee/all`,
        axiosConfig
      );
      console.log('Respuesta empleados:', response.data); // Para debugging
      return Array.isArray(response.data) ? response.data : [];
    } catch (error) {
      console.error('Error al obtener empleados:', error);
      return [];
    }
  },

  // Para obtener productos
  obtenerProductos: async () => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/products`,
        axiosConfig
      );
      return Array.isArray(response.data) ? response.data : [];
    } catch (error) {
      console.error('Error al obtener productos:', error);
      return [];
    }
  },

  // Para el historial - usa el rango de fechas específico
  obtenerPedidos: async (params = {}) => {
    try {
      let url = `${API_BASE_URL}/buy-bills`;
      const hoy = new Date();
      
      const fechaInicio = params.fechaInicio || hoy;
      const fechaFin = params.fechaFin || hoy;
      
      const fromDate = formatearFecha(fechaInicio, false);
      const toDate = formatearFecha(fechaFin, true);

      url = `${API_BASE_URL}/buy-bills?From=${encodeURIComponent(fromDate)}&To=${encodeURIComponent(toDate)}`;

      console.log('URL de la petición:', url);
      const response = await axios.get(url, axiosConfig);
      console.log('Respuesta del servidor:', response.data);
      
      const data = response.data;
      return Array.isArray(data) ? data : data ? [data] : [];
    } catch (error) {
      console.error('Error al obtener pedidos:', error);
      return [];
    }
  },

  obtenerPedidoPorId: async (id) => {
    try {
      const hoy = new Date();
      const fechaActual = formatearFecha(hoy, false);
      const url = `${API_BASE_URL}/buy-bills/${id}?From=${encodeURIComponent(fechaActual)}`;
      
      console.log('URL de la petición detalle:', url); // Para debugging
      const response = await axios.get(url, axiosConfig);
      console.log('Respuesta del servidor detalle:', response.data); // Para debugging
      
      return response.data;
    } catch (error) {
      console.error('Error al obtener pedido:', error);
      throw error;
    }
  },

  crearPedido: async (pedidoData) => {
    try {
      console.log('Datos enviados al API:', pedidoData);
      const response = await axios.post(
        `${API_BASE_URL}/buy-bills`,
        pedidoData,
        axiosConfig
      );
      return response.data;
    } catch (error) {
      console.error('Error en la llamada al API:', error.response?.data);
      throw error;
    }
  },

  crearDetallePedido: async (detalleData) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/buy-bill-details`,
        detalleData,
        axiosConfig
      );
      return response.data;
    } catch (error) {
      console.error('Error al crear detalle de pedido:', error);
      throw error;
    }
  },

  obtenerDetallesPedido: async () => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/buy-bill-details`,
        axiosConfig
      );
      return response.data;
    } catch (error) {
      console.error('Error al obtener detalles de pedido:', error);
      throw error;
    }
  },

  actualizarPedido: async (pedidoData) => {
    try {
      console.log('Actualizando pedido:', pedidoData);
      const response = await axios.put(
        `${API_BASE_URL}/buy-bills`,
        pedidoData,
        axiosConfig
      );
      return response.data;
    } catch (error) {
      console.error('Error al actualizar pedido:', error.response?.data);
      throw error;
    }
  },

  eliminarPedido: async (pedidoId) => {
    try {
      console.log('Eliminando pedido:', pedidoId);
      const response = await axios.delete(
        `${API_BASE_URL}/buy-bills?request=${pedidoId}`,
        axiosConfig
      );
      return response.data;
    } catch (error) {
      console.error('Error al eliminar pedido:', error.response?.data);
      throw error;
    }
  }
};

export default apiBuyBills; 