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

const TablaCompras = ({ compras, onEditarClick, handleGuardarEdicion, onEliminarClick }) => {
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
  const [selectedCompra, setSelectedCompra] = useState(null);

  const handleEditarClick = (compra) => {
    setSelectedCompra(compra);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedCompra(null);
  };

  const handleEditFieldChange = (fieldName, value) => {
    setSelectedCompra({
      ...selectedCompra,
      [fieldName]: value,
    });
  };

  return (
    <TableContainer component={Paper} style={{ marginTop: '20px', margin: 'auto' }}>
      <Table>
        <TableHead>
          <TableRow style={rowStyles}>
            <TableCell style={cellStyles}>Fecha</TableCell>
            <TableCell style={cellStyles}>Proveedor</TableCell>
            <TableCell style={cellStyles}>Empleado</TableCell>
            <TableCell style={cellStyles}>Subtotal</TableCell>
            <TableCell style={cellStyles}>IVA</TableCell>
            <TableCell style={cellStyles}>Descuento</TableCell>
            <TableCell style={cellStyles}>Total</TableCell>
            <TableCell style={cellStyles}>Acciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {compras.map((compra, index) => (
            <TableRow key={index} style={{ background: index % 2 === 0 ? '#f9f9f9' : 'white' }}>
              <TableCell style={{ fontSize: '14px', textAlign: 'center' }}>{compra.fecha}</TableCell>
              <TableCell style={{ fontSize: '14px', textAlign: 'center' }}>{compra.proveedor}</TableCell>
              <TableCell style={{ fontSize: '14px', textAlign: 'center' }}>{compra.idEmpleado}</TableCell>
              <TableCell style={{ fontSize: '14px', textAlign: 'center' }}>{compra.subtotal}</TableCell>
              <TableCell style={{ fontSize: '14px', textAlign: 'center' }}>{compra.iva}</TableCell>
              <TableCell style={{ fontSize: '14px', textAlign: 'center' }}>{compra.descuento}</TableCell>
              <TableCell style={{ fontSize: '14px', textAlign: 'center' }}>{compra.total}</TableCell>
              <TableCell style={{ textAlign: 'center' }}>
                <Button
                  onClick={() => handleEditarClick(compra)}
                  variant="contained"
                  color="primary"
                  size="small"
                  style={{ ...buttonStyles }}
                >
                  Editar
                </Button>
                <Button
                  onClick={() => onEliminarClick(compra.id)}
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
        <DialogTitle>Editar Compra</DialogTitle>
        <DialogContent>
          <form>
            <TextField
              label="Fecha"
              variant="outlined"
              margin="normal"
              fullWidth
              required
              value={selectedCompra ? selectedCompra.fecha : ''}
              onChange={(e) => handleEditFieldChange('fecha', e.target.value)}
            />
            <TextField
              label="Proveedor"
              variant="outlined"
              margin="normal"
              fullWidth
              required
              value={selectedCompra ? selectedCompra.proveedor : ''}
              onChange={(e) => handleEditFieldChange('proveedor', e.target.value)}
            />
            <TextField
              label="Empleado"
              variant="outlined"
              margin="normal"
              fullWidth
              required
              value={selectedCompra ? selectedCompra.idEmpleado : ''}
              onChange={(e) => handleEditFieldChange('idEmpleado', e.target.value)}
            />
            <TextField
              label="Subtotal"
              variant="outlined"
              margin="normal"
              fullWidth
              required
              value={selectedCompra ? selectedCompra.subtotal : ''}
              onChange={(e) => handleEditFieldChange('subtotal', e.target.value)}
            />
            <TextField
              label="IVA"
              variant="outlined"
              margin="normal"
              fullWidth
              required
              value={selectedCompra ? selectedCompra.iva : ''}
              onChange={(e) => handleEditFieldChange('iva', e.target.value)}
            />
            <TextField
              label="Descuento"
              variant="outlined"
              margin="normal"
              fullWidth
              required
              value={selectedCompra ? selectedCompra.descuento : ''}
              onChange={(e) => handleEditFieldChange('descuento', e.target.value)}
            />
            <TextField
              label="Total"
              variant="outlined"
              margin="normal"
              fullWidth
              required
              value={selectedCompra ? selectedCompra.total : ''}
              onChange={(e) => handleEditFieldChange('total', e.target.value)}
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => { console.log(selectedCompra); handleGuardarEdicion(selectedCompra); handleCloseModal(); }} color="primary">
            Cerrar
          </Button>
        </DialogActions>
      </Dialog>
    </TableContainer>
  );
};

export default TablaCompras;
