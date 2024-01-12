import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from '@mui/material';

const TablaVentas = ({ ventas, onEditarClick, handleGuardarEdicion, onEliminarClick }) => {
  const cellStyles = {
    fontSize: '15px',
    fontWeight: 'bold',
    color: 'white',
  };

  const rowStyles = {
    background: '#2196f3',
    color: 'black',
  };

  const buttonStyles = {
    fontSize: '12px',
    marginRight: '5px',
  };

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedVenta, setSelectedVenta] = useState(null);

  const handleEditarClick = (venta) => {
    setSelectedVenta(venta);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedVenta(null);
  };

  const handleEditFieldChange = (fieldName, value) => {
    setSelectedVenta({
      ...selectedVenta,
      [fieldName]: value,
    });
  };

  return (
    <TableContainer component={Paper} style={{ marginTop: '20px', margin: 'auto' }}>
      <Table>
        <TableHead>
          <TableRow style={rowStyles}>
            <TableCell style={cellStyles}>Fecha</TableCell>
            <TableCell style={cellStyles}>Empleado</TableCell>
            <TableCell style={cellStyles}>Cliente</TableCell>
            <TableCell style={cellStyles}>Tipo de Compra</TableCell>
            <TableCell style={cellStyles}>Subtotal</TableCell>
            <TableCell style={cellStyles}>Descuento</TableCell>
            <TableCell style={cellStyles}>IVA</TableCell>
            <TableCell style={cellStyles}>Total</TableCell>
            <TableCell style={cellStyles}>Acciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {ventas.map((venta, index) => (
            <TableRow key={index} style={{ background: index % 2 === 0 ? '#f9f9f9' : 'white' }}>
              <TableCell style={{ fontSize: '14px', textAlign: 'center' }}>{venta.fecha}</TableCell>
              <TableCell style={{ fontSize: '14px', textAlign: 'center' }}>{venta.idEmpleado}</TableCell>
              <TableCell style={{ fontSize: '14px', textAlign: 'center' }}>{venta.idCliente}</TableCell>
              <TableCell style={{ fontSize: '14px', textAlign: 'center' }}>{venta.tipoCompra}</TableCell>
              <TableCell style={{ fontSize: '14px', textAlign: 'center' }}>{venta.subtotal}</TableCell>
              <TableCell style={{ fontSize: '14px', textAlign: 'center' }}>{venta.descuento}</TableCell>
              <TableCell style={{ fontSize: '14px', textAlign: 'center' }}>{venta.iva}</TableCell>
              <TableCell style={{ fontSize: '14px', textAlign: 'center' }}>{venta.total}</TableCell>
              <TableCell style={{ textAlign: 'center' }}>
                <Button
                  onClick={() => handleEditarClick(venta)}
                  variant="contained"
                  color="primary"
                  size="small"
                  style={{ ...buttonStyles }}
                >
                  Editar
                </Button>
                <Button
                  onClick={() => onEliminarClick(venta.id)}
                  variant="contained"
                  color="secondary"
                  size="small"
                  style={{ ...buttonStyles, backgroundColor: 'red' }}
                >
                  Eliminar
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Dialog open={modalOpen} onClose={handleCloseModal}>
        <DialogTitle>Editar Venta</DialogTitle>
        <DialogContent>
          <form>
            <TextField
              label="Fecha"
              variant="outlined"
              margin="normal"
              fullWidth
              required
              value={selectedVenta ? selectedVenta.fecha : ''}
              onChange={(e) => handleEditFieldChange('fecha', e.target.value)}
            />
            <TextField
              label="Empleado"
              variant="outlined"
              margin="normal"
              fullWidth
              required
              value={selectedVenta ? selectedVenta.idEmpleado : ''}
              onChange={(e) => handleEditFieldChange('idEmpleado', e.target.value)}
            />
            <TextField
              label="Cliente"
              variant="outlined"
              margin="normal"
              fullWidth
              required
              value={selectedVenta ? selectedVenta.idCliente : ''}
              onChange={(e) => handleEditFieldChange('idCliente', e.target.value)}
            />
            <TextField
              label="Tipo de Compra"
              variant="outlined"
              margin="normal"
              fullWidth
              required
              value={selectedVenta ? selectedVenta.tipoCompra : ''}
              onChange={(e) => handleEditFieldChange('tipoCompra', e.target.value)}
            />
            <TextField
              label="Subtotal"
              variant="outlined"
              margin="normal"
              fullWidth
              required
              value={selectedVenta ? selectedVenta.subtotal : ''}
              onChange={(e) => handleEditFieldChange('subtotal', e.target.value)}
            />
            <TextField
              label="Descuento"
              variant="outlined"
              margin="normal"
              fullWidth
              required
              value={selectedVenta ? selectedVenta.descuento : ''}
              onChange={(e) => handleEditFieldChange('descuento', e.target.value)}
            />
            <TextField
              label="IVA"
              variant="outlined"
              margin="normal"
              fullWidth
              required
              value={selectedVenta ? selectedVenta.iva : ''}
              onChange={(e) => handleEditFieldChange('iva', e.target.value)}
            />
            <TextField
              label="Total"
              variant="outlined"
              margin="normal"
              fullWidth
              required
              value={selectedVenta ? selectedVenta.total : ''}
              onChange={(e) => handleEditFieldChange('total', e.target.value)}
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => { console.log(selectedVenta); handleGuardarEdicion(selectedVenta); handleCloseModal(); }} color="primary">
            Cerrar
          </Button>
        </DialogActions>
      </Dialog>
    </TableContainer>
  );
};

export default TablaVentas;
