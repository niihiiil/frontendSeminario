import React, { useState, useEffect } from 'react';
import MainPageContainer from '../layout/mainpagecontainer';
import PedidoRegistro from '../forms/pedidoRegistro';
import apiBuyBills from '../../api/apiBuyBills';
import { Alert, Snackbar } from '@mui/material';

const PedidosPage = () => {
  const [proveedores, setProveedores] = useState([]);
  const [empleados, setEmpleados] = useState([]);
  const [productos, setProductos] = useState([]);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        // Cargar datos de cada endpoint
        const [proveedoresData, empleadosData, productosData] = await Promise.all([
          apiBuyBills.obtenerProveedores(),
          apiBuyBills.obtenerEmpleados(),
          apiBuyBills.obtenerProductos()
        ]);

        console.log('Datos de empleados:', empleadosData); // Para debugging
        
        setProveedores(proveedoresData);
        setEmpleados(empleadosData);
        setProductos(productosData);
      } catch (error) {
        console.error('Error al cargar datos:', error);
        mostrarMensaje('Error al cargar los datos necesarios', 'error');
      }
    };

    cargarDatos();
  }, []);

  const mostrarMensaje = (mensaje, severidad = 'success') => {
    setSnackbarMessage(mensaje);
    setSnackbarSeverity(severidad);
    setOpenSnackbar(true);
  };

  const handleSubmit = async (formData) => {
    try {
      console.log('Datos recibidos en pedidosPage:', formData);
      
      // Asegurarnos de que el formato sea exactamente el esperado
      const pedidoFormateado = {
        suplierId: formData.suplierId,
        employeeId: formData.employeeId,
        details: formData.details.map(detail => ({
          units: detail.units,
          pricePerUnit: detail.pricePerUnit,
          discountAmount: detail.discountAmount,
          ivaAmount: detail.ivaAmount,
          isBonus: detail.isBonus,
          productId: detail.productId
        }))
      };

      const response = await apiBuyBills.crearPedido(pedidoFormateado);
      
      if (response) {
        mostrarMensaje('Pedido creado exitosamente');
      }
    } catch (error) {
      console.error('Error completo:', error);
      console.error('Datos del error:', error.response?.data);
      mostrarMensaje(
        'Error al crear el pedido: ' + 
        (error.response?.data?.message || error.message), 
        'error'
      );
    }
  };

  return (
    <MainPageContainer>
      <PedidoRegistro
        proveedores={proveedores}
        empleados={empleados}
        productos={productos}
        onSubmit={handleSubmit}
      />
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert 
          onClose={() => setOpenSnackbar(false)} 
          severity={snackbarSeverity}
          sx={{ width: '100%' }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </MainPageContainer>
  );
};

export default PedidosPage;