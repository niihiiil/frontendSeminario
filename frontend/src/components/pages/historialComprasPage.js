import React, { useState, useEffect } from 'react';
import MainPageContainer from '../layout/mainpagecontainer';
import TablaTransaccionesCompra from '../tables/tablaTransaccionesCompra';
import apiBuyBills from '../../api/apiBuyBills';
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
import BusquedaCompras from '../forms/busquedaCompras';
import PedidoRegistro from '../forms/pedidoRegistro';

const HistorialComprasPage = () => {
  const [transacciones, setTransacciones] = useState([]);
  const [detalleSeleccionado, setDetalleSeleccionado] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [editingTransaction, setEditingTransaction] = useState(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editingPedido, setEditingPedido] = useState(null);
  const [proveedores, setProveedores] = useState([]);
  const [empleados, setEmpleados] = useState([]);
  const [productos, setProductos] = useState([]);

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

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        const [proveedoresData, empleadosData, productosData] = await Promise.all([
          apiBuyBills.obtenerProveedores(),
          apiBuyBills.obtenerEmpleados(),
          apiBuyBills.obtenerProductos()
        ]);
        
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

  const handleVerDetalle = (transaccion) => {
    setDetalleSeleccionado(transaccion);
    setOpenDialog(true);
  };

  const handleEditar = (transaccion) => {
    setEditingPedido({
      id: transaccion.id,
      suplierId: transaccion.suplier.id,
      employeeId: transaccion.employee.id,
      details: transaccion.details.map(detail => ({
        id: detail.id,
        units: detail.units,
        pricePerUnit: detail.pricePerUnit,
        discountAmount: detail.discountAmount,
        ivaAmount: detail.ivaAmount,
        isBonus: detail.isBonus,
        productId: detail.product.id
      }))
    });
    setEditModalOpen(true);
  };

  const handleGuardarEdicion = async (pedidoEditado) => {
    try {
      await apiBuyBills.actualizarPedido(pedidoEditado);
      mostrarMensaje('Pedido actualizado exitosamente');
      setEditModalOpen(false);
      setEditingPedido(null);
      // Recargar la lista
      handleBuscar({ 
        fechaInicio: new Date(), 
        fechaFin: new Date() 
      });
    } catch (error) {
      console.error('Error al actualizar pedido:', error);
      mostrarMensaje(
        'Error al actualizar el pedido: ' + 
        (error.response?.data?.message || error.message), 
        'error'
      );
    }
  };

  const handleEliminar = async (id) => {
    try {
      await apiBuyBills.eliminarPedido(id);
      mostrarMensaje('Pedido eliminado exitosamente');
      // Recargar la lista
      handleBuscar({ 
        fechaInicio: new Date(), 
        fechaFin: new Date() 
      });
    } catch (error) {
      console.error('Error al eliminar pedido:', error);
      mostrarMensaje(
        'Error al eliminar el pedido: ' + 
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

  const handleBuscar = async (params) => {
    try {
      const data = await apiBuyBills.obtenerPedidos(params);
      console.log('Datos recibidos:', data); // Para debugging
      setTransacciones(data);
    } catch (error) {
      console.error('Error al buscar transacciones:', error);
      mostrarMensaje('Error al buscar las transacciones', 'error');
      setTransacciones([]); // Asegurar que siempre tengamos un array
    }
  };

  return (
    <MainPageContainer>
      <Box sx={{ p: 3 }}>
        <Typography variant="h5" gutterBottom sx={{ mb: 3 }}>
          Historial de Compras
        </Typography>
        
        <BusquedaCompras onBuscar={handleBuscar} />
        
        <TablaTransaccionesCompra
          transacciones={transacciones}
          onVerDetalle={handleVerDetalle}
          onEditar={handleEditar}
          onEliminar={handleEliminar}
        />

        <Dialog 
          open={openDialog} 
          onClose={() => setOpenDialog(false)}
          maxWidth="md"
          fullWidth
        >
          <DialogTitle>
            Detalles de la Compra
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
                    <strong>Proveedor:</strong> {detalleSeleccionado.suplier.name}
                  </Typography>
                  <Typography>
                    <strong>RUC:</strong> {detalleSeleccionado.suplier.ruccode}
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
                      <strong>Unidades:</strong> {detalle.units}
                    </Typography>
                    <Typography>
                      <strong>Precio por unidad:</strong> {formatCurrency(detalle.pricePerUnit)}
                    </Typography>
                    <Typography>
                      <strong>Subtotal:</strong> {formatCurrency(detalle.subTotal)}
                    </Typography>
                    <Typography>
                      <strong>Descuento:</strong> {formatCurrency(detalle.discountAmount)}
                    </Typography>
                    <Typography>
                      <strong>IVA:</strong> {formatCurrency(detalle.ivaAmount)}
                    </Typography>
                    <Typography>
                      <strong>Precio Final:</strong> {formatCurrency(detalle.finalPrice)}
                    </Typography>
                    {detalle.isBonus && (
                      <Typography color="primary">
                        <strong>Bonificación</strong>
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
                    <strong>Descuento Total:</strong> {formatCurrency(detalleSeleccionado.discount)}
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

        <Dialog 
          open={editModalOpen} 
          onClose={() => setEditModalOpen(false)}
          maxWidth="md"
          fullWidth
        >
          <DialogTitle>Editar Pedido</DialogTitle>
          <DialogContent>
            {editingPedido && (
              <PedidoRegistro
                isEditing={true}
                initialData={editingPedido}
                proveedores={proveedores}
                empleados={empleados}
                productos={productos}
                onSubmit={handleGuardarEdicion}
                onCancel={() => setEditModalOpen(false)}
              />
            )}
          </DialogContent>
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

export default HistorialComprasPage;
