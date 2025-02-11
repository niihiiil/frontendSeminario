import React, { useState, useEffect } from 'react';
import MainPageContainer from '../layout/mainpagecontainer';
import {
  Paper,
  Typography,
  Grid,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
  Snackbar,
  Box
} from '@mui/material';
import apiProd from '../../api/apiProd';

const AgregarInventarioPage = () => {
  const [formData, setFormData] = useState({
    productId: '',
    units: '',
    buyPrice: ''
  });

  const [productos, setProductos] = useState([]);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  useEffect(() => {
    const cargarProductos = async () => {
      try {
        const data = await apiProd.obtenerProductos();
        setProductos(data);
      } catch (error) {
        console.error('Error al cargar productos:', error);
        mostrarMensaje('Error al cargar los productos', 'error');
      }
    };

    cargarProductos();
  }, []);

  const handleChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const mostrarMensaje = (mensaje, severidad = 'success') => {
    setSnackbarMessage(mensaje);
    setSnackbarSeverity(severidad);
    setOpenSnackbar(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const inventarioData = {
        productId: Number(formData.productId),
        units: Number(formData.units),
        buyPrice: Number(formData.buyPrice)
      };

      const response = await apiProd.agregarInventario(inventarioData);
      if (response) {
        mostrarMensaje('Producto agregado al inventario exitosamente');
        setFormData({
          productId: '',
          units: '',
          buyPrice: ''
        });
      }
    } catch (error) {
      console.error('Error al agregar al inventario:', error);
      mostrarMensaje(
        'Error al agregar al inventario: ' + 
        (error.response?.data?.message || error.message), 
        'error'
      );
    }
  };

  return (
    <MainPageContainer>
      <Box sx={{ p: 3 }}>
        <Typography variant="h5" gutterBottom>
          Agregar al Inventario
        </Typography>

        <Paper elevation={3} sx={{ p: 3, mt: 2 }}>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <FormControl fullWidth required>
                  <InputLabel>Producto</InputLabel>
                  <Select
                    value={formData.productId}
                    onChange={(e) => handleChange('productId', e.target.value)}
                    label="Producto"
                  >
                    {productos.map((producto) => (
                      <MenuItem key={producto.id} value={producto.id}>
                        {producto.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Unidades"
                  type="number"
                  value={formData.units}
                  onChange={(e) => handleChange('units', e.target.value)}
                  required
                  InputProps={{ inputProps: { min: 1 } }}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Precio de Compra"
                  type="number"
                  value={formData.buyPrice}
                  onChange={(e) => handleChange('buyPrice', e.target.value)}
                  required
                  InputProps={{
                    inputProps: { min: 0, step: "0.01" }
                  }}
                />
              </Grid>

              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                >
                  Agregar al Inventario
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>

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

export default AgregarInventarioPage; 