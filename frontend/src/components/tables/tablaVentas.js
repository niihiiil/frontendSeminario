import React, { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Tooltip
} from '@mui/material';
import {
  Visibility as VisibilityIcon,
  Print as PrintIcon
} from '@mui/icons-material';
import FacturaPDF from '../pdf/FacturaPDF';
import apiConfig from '../../api/apiConfig';

const TablaVentas = ({ ventas, onVerDetalle }) => {
  const [showPDF, setShowPDF] = useState(false);
  const [configuracion, setConfiguracion] = useState(null);
  const [ventaSeleccionada, setVentaSeleccionada] = useState(null);

  const handlePrintClick = async (venta) => {
    try {
      const config = await apiConfig.obtenerConfiguracion();
      setConfiguracion(config);
      setVentaSeleccionada(venta);
      setShowPDF(true);
    } catch (error) {
      console.error('Error al cargar configuración:', error);
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('es-NI', {
      style: 'currency',
      currency: 'NIO'
    }).format(amount);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Fecha</TableCell>
              <TableCell>Cliente</TableCell>
              <TableCell>Empleado</TableCell>
              <TableCell align="right">Subtotal</TableCell>
              <TableCell align="right">Descuento</TableCell>
              <TableCell align="right">IVA</TableCell>
              <TableCell align="right">Total</TableCell>
              <TableCell align="center">Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {ventas.map((venta) => (
              <TableRow key={venta.id}>
                <TableCell>{formatDate(venta.date)}</TableCell>
                <TableCell>{`${venta.client.firstName} ${venta.client.firstLastName}`}</TableCell>
                <TableCell>{`${venta.employee.firstName} ${venta.employee.firstLastName}`}</TableCell>
                <TableCell align="right">{formatCurrency(venta.subTotal)}</TableCell>
                <TableCell align="right">{formatCurrency(venta.discountAmount)}</TableCell>
                <TableCell align="right">{formatCurrency(venta.ivaAmount)}</TableCell>
                <TableCell align="right">{formatCurrency(venta.total)}</TableCell>
                <TableCell align="center">
                  <Tooltip title="Ver Detalles">
                    <IconButton
                      color="primary"
                      onClick={() => onVerDetalle(venta)}
                      size="small"
                    >
                      <VisibilityIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Imprimir Factura">
                    <IconButton
                      color="secondary"
                      onClick={() => handlePrintClick(venta)}
                      size="small"
                    >
                      <PrintIcon />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog
        open={showPDF}
        onClose={() => setShowPDF(false)}
        maxWidth="lg"
        fullWidth
      >
        <DialogTitle>
          Factura de Venta
        </DialogTitle>
        <DialogContent>
          {ventaSeleccionada && configuracion && (
            <FacturaPDF 
              venta={ventaSeleccionada}
              configuracion={configuracion}
            />
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowPDF(false)}>
            Cerrar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default TablaVentas;
