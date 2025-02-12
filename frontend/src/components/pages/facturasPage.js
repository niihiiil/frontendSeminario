import React, { useState } from 'react';
import MainPageContainer from '../layout/mainpagecontainer';
import VentaRegistro from '../forms/ventaRegistro';
import apiVentas from '../../api/apiVentas';
import { Alert, Snackbar, Box, Typography } from '@mui/material';

const FacturasPage = () => {
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  const handleSubmit = async (ventaData) => {
    try {
      await apiVentas.crearVenta(ventaData);
      mostrarMensaje('Venta registrada exitosamente');
      // Aquí podrías agregar lógica adicional después de crear la venta
      // como redireccionar o limpiar el formulario
    } catch (error) {
      console.error('Error al registrar la venta:', error);
      mostrarMensaje(
        'Error al registrar la venta: ' + 
        (error.response?.data?.message || error.message), 
        'error'
      );
    }
  };

  const mostrarMensaje = (mensaje, severidad = 'success') => {
    setSnackbarMessage(mensaje);
    setSnackbarSeverity(severidad);
    setOpenSnackbar(true);
  };

  return (
    <MainPageContainer>
      <Box sx={{ p: 3 }}>
        <Typography variant="h5" gutterBottom sx={{ mb: 3 }}>
          Nueva Venta
        </Typography>

        <VentaRegistro 
          onSubmit={handleSubmit}
          onCancel={() => {/* Aquí puedes agregar lógica para cancelar */}}
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
      </Box>
    </MainPageContainer>
  );
};

export default FacturasPage;