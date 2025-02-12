import React, { useState, useEffect } from 'react';
import MainPageContainer from '../layout/mainpagecontainer';
import TablaVentas from '../tables/tablaVentas';
import apiVentas from '../../api/apiVentas';
import { 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions, 
  Button,
  Typography,
  Divider,
  Alert,
  Snackbar,
  Box
} from '@mui/material';
import BusquedaVentas from '../forms/busquedaVentas';

const HistorialVentasPage = () => {
  const [ventas, setVentas] = useState([]);
  const [detalleSeleccionado, setDetalleSeleccionado] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('es-NI', {
      style: 'currency',
      currency: 'NIO'
    }).format(amount);
  };

  useEffect(() => {
    const hoy = new Date();
    handleBuscar({ fechaInicio: hoy, fechaFin: hoy });
  }, []);

  const handleVerDetalle = (venta) => {
    setDetalleSeleccionado(venta);
    setOpenDialog(true);
  };

  const mostrarMensaje = (mensaje, severidad = 'success') => {
    setSnackbarMessage(mensaje);
    setSnackbarSeverity(severidad);
    setOpenSnackbar(true);
  };

  const handleBuscar = async (params) => {
    try {
      const data = await apiVentas.obtenerVentas(params);
      setVentas(data);
      if (data.length === 0) {
        mostrarMensaje('No se encontraron ventas en el período seleccionado', 'info');
      }
    } catch (error) {
      console.error('Error al buscar ventas:', error);
      mostrarMensaje('Error al buscar las ventas', 'error');
      setVentas([]);
    }
  };

  return (
    <MainPageContainer>
      <Box sx={{ p: 3 }}>
        <Typography variant="h5" gutterBottom sx={{ mb: 3 }}>
          Lista de Ventas
        </Typography>
        
        <BusquedaVentas onBuscar={handleBuscar} />
        
        <TablaVentas
          ventas={ventas}
          onVerDetalle={handleVerDetalle}
        />

        <Dialog 
          open={openDialog} 
          onClose={() => setOpenDialog(false)}
          maxWidth="md"
          fullWidth
        >
          <DialogTitle>
            Detalles de la Venta
          </DialogTitle>
          <DialogContent>
            {detalleSeleccionado && (
              <Box sx={{ p: 2 }}>
                <Typography variant="h6" gutterBottom>
                  Información General
                </Typography>
                <Box sx={{ mb: 2 }}>
                  <Typography>
                    <strong>Fecha:</strong> {new Date(detalleSeleccionado.date).toLocaleString()}
                  </Typography>
                  <Typography>
                    <strong>Cliente:</strong> {`${detalleSeleccionado.client.firstName} ${detalleSeleccionado.client.firstLastName}`}
                  </Typography>
                  <Typography>
                    <strong>Empleado:</strong> {`${detalleSeleccionado.employee.firstName} ${detalleSeleccionado.employee.firstLastName}`}
                  </Typography>
                </Box>
                
                <Divider sx={{ my: 2 }} />
                
                <Typography variant="h6" gutterBottom>
                  Productos
                </Typography>
                {detalleSeleccionado.details.map((detalle, index) => (
                  <Box key={index} sx={{ mb: 2, pl: 2 }}>
                    <Typography variant="subtitle1">
                      {detalle.product.name}
                    </Typography>
                    <Typography>
                      <strong>Categoría:</strong> {detalle.product.productCategory.name}
                    </Typography>
                    <Typography>
                      <strong>Unidades:</strong> {detalle.units}
                    </Typography>
                    <Typography>
                      <strong>Precio por unidad:</strong> {formatCurrency(detalle.pricePerUnit)}
                    </Typography>
                    <Typography>
                      <strong>Subtotal:</strong> {formatCurrency(detalle.subtotal)}
                    </Typography>
                    <Typography>
                      <strong>Precio Final:</strong> {formatCurrency(detalle.finalPrice)}
                    </Typography>
                    {detalle.product.isPack && (
                      <Typography color="primary">
                        <strong>Pack de {detalle.product.packUnits} unidades</strong>
                      </Typography>
                    )}
                    <Divider sx={{ my: 1 }} />
                  </Box>
                ))}
                
                <Box sx={{ mt: 2, p: 2, bgcolor: 'background.paper', borderRadius: 1 }}>
                  <Typography>
                    <strong>Subtotal:</strong> {formatCurrency(detalleSeleccionado.subTotal)}
                  </Typography>
                  <Typography>
                    <strong>Descuento Total:</strong> {formatCurrency(detalleSeleccionado.discountAmount)}
                  </Typography>
                  <Typography>
                    <strong>IVA Total:</strong> {formatCurrency(detalleSeleccionado.ivaAmount)}
                  </Typography>
                  <Typography variant="h6" sx={{ mt: 1 }}>
                    <strong>Total Final:</strong> {formatCurrency(detalleSeleccionado.total)}
                  </Typography>
                </Box>
              </Box>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenDialog(false)} variant="contained">
              Cerrar
            </Button>
          </DialogActions>
        </Dialog>

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

export default HistorialVentasPage;

