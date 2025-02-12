import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Tooltip,
  useTheme,
  Typography,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button
} from '@mui/material';
import { 
  RemoveRedEye as ViewIcon, 
  Edit as EditIcon,
  Delete as DeleteIcon,
  Print as PrintIcon
} from '@mui/icons-material';
import { getTableStyles } from '../../styles/tableStyles';
import CompraPDF from '../pdf/CompraPDF';
import apiConfig from '../../api/apiConfig';

const TablaTransaccionesCompra = ({ 
  transacciones, 
  onVerDetalle, 
  onEditar,
  onEliminar 
}) => {
  const theme = useTheme();
  const styles = getTableStyles(theme);
  const [showPDF, setShowPDF] = useState(false);
  const [configuracion, setConfiguracion] = useState(null);
  const [compraSeleccionada, setCompraSeleccionada] = useState(null);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('es-NI', {
      style: 'currency',
      currency: 'NIO'
    }).format(amount);
  };

  const handlePrintClick = async (compra) => {
    try {
      const config = await apiConfig.obtenerConfiguracion();
      setConfiguracion(config);
      setCompraSeleccionada(compra);
      setShowPDF(true);
    } catch (error) {
      console.error('Error al cargar configuración:', error);
    }
  };

  if (!transacciones.length) {
    return (
      <Paper sx={{ p: 2, textAlign: 'center' }}>
        <Typography variant="h6" color="text.secondary">
          No hay transacciones para mostrar
        </Typography>
      </Paper>
    );
  }

  return (
    <>
      <TableContainer component={Paper} sx={styles.tableContainerStyles}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell style={styles.headerCellStyle}>Fecha</TableCell>
              <TableCell style={styles.headerCellStyle}>Proveedor</TableCell>
              <TableCell style={styles.headerCellStyle}>RUC</TableCell>
              <TableCell style={styles.headerCellStyle}>Empleado</TableCell>
              <TableCell style={styles.headerCellStyle}>Subtotal</TableCell>
              <TableCell style={styles.headerCellStyle}>Descuento</TableCell>
              <TableCell style={styles.headerCellStyle}>IVA</TableCell>
              <TableCell style={styles.headerCellStyle}>Total</TableCell>
              <TableCell style={styles.headerCellStyle} align="center">
                Acciones
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {transacciones.map((transaccion) => (
              <TableRow key={transaccion.id} sx={styles.rowStyles}>
                <TableCell style={styles.bodyCellStyle}>
                  {formatDate(transaccion.date)}
                </TableCell>
                <TableCell style={styles.bodyCellStyle}>
                  {transaccion.suplier.name}
                </TableCell>
                <TableCell style={styles.bodyCellStyle}>
                  {transaccion.suplier.ruccode}
                </TableCell>
                <TableCell style={styles.bodyCellStyle}>
                  {`${transaccion.employee.firstName} ${transaccion.employee.firstLastName}`}
                </TableCell>
                <TableCell style={styles.bodyCellStyle}>
                  {formatCurrency(transaccion.subTotal)}
                </TableCell>
                <TableCell style={styles.bodyCellStyle}>
                  {formatCurrency(transaccion.discount)}
                </TableCell>
                <TableCell style={styles.bodyCellStyle}>
                  {formatCurrency(transaccion.ivaAmount)}
                </TableCell>
                <TableCell style={styles.bodyCellStyle}>
                  {formatCurrency(transaccion.total)}
                </TableCell>
                <TableCell style={styles.bodyCellStyle} align="center">
                  <Box sx={{ display: 'inline-flex', gap: 1, justifyContent: 'center' }}>
                    <Tooltip title="Ver detalles">
                      <IconButton 
                        onClick={() => onVerDetalle(transaccion)}
                        color="info"
                        size="small"
                      >
                        <ViewIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Imprimir Compra">
                      <IconButton
                        color="secondary"
                        onClick={() => handlePrintClick(transaccion)}
                        size="small"
                      >
                        <PrintIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Editar compra">
                      <IconButton 
                        onClick={() => onEditar(transaccion)}
                        color="primary"
                        size="small"
                      >
                        <EditIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Eliminar compra">
                      <IconButton
                        onClick={() => {
                          if (window.confirm('¿Está seguro de eliminar esta compra?')) {
                            onEliminar(transaccion.id);
                          }
                        }}
                        color="error"
                        size="small"
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </Box>
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
          Documento de Compra
        </DialogTitle>
        <DialogContent>
          {compraSeleccionada && configuracion && (
            <CompraPDF 
              compra={compraSeleccionada}
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

export default TablaTransaccionesCompra; 