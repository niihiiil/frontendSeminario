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

const TablaProveedores = ({ proveedores, onEditarClick, handleGuardarEdicion, onEliminarClick }) => {
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
  const [selectedProveedor, setSelectedProveedor] = useState(null);

  const handleEditarClick = (proveedor) => {
    setSelectedProveedor(proveedor);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedProveedor(null);
  };

  const handleEditFieldChange = (fieldName, value) => {
    setSelectedProveedor({
      ...selectedProveedor,
      [fieldName]: value,
    });
  };

  return (
    <TableContainer component={Paper} style={{ marginTop: '20px', margin: 'auto' }}>
      <Table>
        <TableHead>
          <TableRow style={rowStyles}>
            <TableCell style={cellStyles}>Nombre</TableCell>
            <TableCell style={cellStyles}>Código RUC</TableCell>
            <TableCell style={{ ...cellStyles, textAlign: 'center' }}>Acciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {proveedores.map((proveedor, index) => (
            <TableRow key={index} style={{ background: index % 2 === 0 ? '#f9f9f9' : 'white' }}>
              <TableCell style={{ fontSize: '14px', textAlign: 'center' }}>{proveedor.name}</TableCell>
              <TableCell style={{ fontSize: '14px', textAlign: 'center' }}>{proveedor.ruccode}</TableCell>
              <TableCell style={{ textAlign: 'center' }}>
                <Button
                  onClick={() => handleEditarClick(proveedor)}
                  variant="contained"
                  color="primary"
                  size="small"
                  style={{ ...buttonStyles }}
                >
                  Editar
                </Button>
                <Button
                  onClick={() => onEliminarClick(proveedor.id)}
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
        <DialogTitle>Editar Proveedor</DialogTitle>
        <DialogContent>
          <form>
            <TextField
              label="Nombre"
              variant="outlined"
              margin="normal"
              fullWidth
              required
              value={selectedProveedor ? selectedProveedor.name : ''}
              onChange={(e) => handleEditFieldChange('name', e.target.value)}
            />
            <TextField
              label="Código RUC"
              variant="outlined"
              margin="normal"
              fullWidth
              required
              value={selectedProveedor ? selectedProveedor.ruccode : ''}
              onChange={(e) => handleEditFieldChange('ruccode', e.target.value)}
            />
            {/* Agrega más campos según tus necesidades */}
          </form>
        </DialogContent>
        <DialogActions>
        <Button onClick={() => { handleGuardarEdicion(selectedProveedor); handleCloseModal(); }} color="primary">
          Cerrar
        </Button>
        </DialogActions>
      </Dialog>
    </TableContainer>
  );
};

export default TablaProveedores;
