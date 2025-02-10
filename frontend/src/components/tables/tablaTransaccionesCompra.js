import React from 'react';
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
  Typography
} from '@mui/material';
import { Visibility, Delete } from '@mui/icons-material';
import { getTableStyles } from '../../styles/tableStyles';

const TablaTransaccionesCompra = ({ transacciones, onVerDetalle, onEliminar }) => {
  const theme = useTheme();
  const styles = getTableStyles(theme);

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
            <TableCell style={styles.headerCellStyle}>Acciones</TableCell>
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
              <TableCell style={styles.actionsCellStyle}>
                <Tooltip title="Ver detalles">
                  <IconButton 
                    onClick={() => onVerDetalle(transaccion)}
                    color="primary"
                    size="small"
                  >
                    <Visibility />
                  </IconButton>
                </Tooltip>
                {transaccion.isDeletable && (
                  <Tooltip title="Eliminar">
                    <IconButton
                      onClick={() => onEliminar(transaccion.id)}
                      color="error"
                      size="small"
                    >
                      <Delete />
                    </IconButton>
                  </Tooltip>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TablaTransaccionesCompra; 