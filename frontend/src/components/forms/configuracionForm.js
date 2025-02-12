import React, { useState, useEffect } from 'react';
import {
  Paper,
  TextField,
  Button,
  Grid,
  Typography,
  Box,
  InputAdornment,
  Alert,
  Snackbar
} from '@mui/material';
import apiConfig from '../../api/apiConfig';

const ConfiguracionForm = () => {
  const [formData, setFormData] = useState({
    id: 0,
    establishmentName: '',
    establismentDirection: '',
    establismentEmail: '',
    establismentCellPhone: '',
    dollarPrice: 0,
    ivaPercentageOfSale: 0
  });

  const [loading, setLoading] = useState(true);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  useEffect(() => {
    cargarConfiguracion();
  }, []);

  const cargarConfiguracion = async () => {
    try {
      const data = await apiConfig.obtenerConfiguracion();
      setFormData(data);
    } catch (error) {
      mostrarMensaje('Error al cargar la configuración', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field) => (event) => {
    let value = event.target.value;
    
    // Convertir a número para campos numéricos
    if (field === 'dollarPrice' || field === 'ivaPercentageOfSale') {
      value = value === '' ? 0 : Number(value);
    }

    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await apiConfig.actualizarConfiguracion(formData);
      mostrarMensaje('Configuración actualizada exitosamente');
    } catch (error) {
      mostrarMensaje(
        'Error al actualizar la configuración: ' + 
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

  if (loading) {
    return <Typography>Cargando configuración...</Typography>;
  }

  return (
    <Paper elevation={3} sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>
        Configuración del Sistema
      </Typography>

      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Nombre del Establecimiento"
              value={formData.establishmentName}
              onChange={handleChange('establishmentName')}
              required
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Dirección"
              value={formData.establismentDirection}
              onChange={handleChange('establismentDirection')}
              required
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Correo Electrónico"
              type="email"
              value={formData.establismentEmail}
              onChange={handleChange('establismentEmail')}
              required
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Teléfono"
              value={formData.establismentCellPhone}
              onChange={handleChange('establismentCellPhone')}
              required
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Precio del Dólar"
              type="number"
              value={formData.dollarPrice}
              onChange={handleChange('dollarPrice')}
              required
              InputProps={{
                startAdornment: <InputAdornment position="start">C$</InputAdornment>,
                inputProps: { min: 0, step: "0.01" }
              }}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Porcentaje de IVA"
              type="number"
              value={formData.ivaPercentageOfSale}
              onChange={handleChange('ivaPercentageOfSale')}
              required
              InputProps={{
                endAdornment: <InputAdornment position="end">%</InputAdornment>,
                inputProps: { min: 0, max: 100, step: "0.01" }
              }}
            />
          </Grid>

          <Grid item xs={12}>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
              >
                Guardar Cambios
              </Button>
            </Box>
          </Grid>
        </Grid>
      </form>

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
    </Paper>
  );
};

export default ConfiguracionForm; 