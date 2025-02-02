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

const TablaProveedores = ({ proveedores, onEditarClick, onEliminarClick, handleGuardarEdicion }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProveedor, setSelectedProveedor] = useState(null);

  const headerCellStyle = {
    fontSize: '15px',
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'left',
    padding: '16px',
    paddingLeft: '20px'
  };

  const rowStyles = {
    background: '#2196f3',
  };

  const bodyCellStyle = {
    fontSize: '14px',
    textAlign: 'left',
    padding: '16px',
    paddingLeft: '20px'
  };

  const actionsCellStyle = {
    ...bodyCellStyle,
    paddingLeft: '15px'
  };

  const buttonStyles = {
    fontSize: '12px',
    marginRight: '8px',
  };

  const handleEditClick = (proveedor) => {
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

  const handleGuardarClick = () => {
    handleGuardarEdicion(selectedProveedor);
    handleCloseModal();
  };

  return (
    <>
      <TableContainer component={Paper} style={{ marginTop: '20px', margin: 'auto' }}>
        <Table>
          <TableHead>
            <TableRow style={rowStyles}>
              <TableCell style={headerCellStyle}>Nombre</TableCell>
              <TableCell style={headerCellStyle}>RUC</TableCell>
              <TableCell style={headerCellStyle}>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {proveedores.map((proveedor, index) => (
              <TableRow key={index} style={{ background: index % 2 === 0 ? '#f9f9f9' : 'white' }}>
                <TableCell style={bodyCellStyle}>{proveedor.name}</TableCell>
                <TableCell style={bodyCellStyle}>{proveedor.ruccode}</TableCell>
                <TableCell style={actionsCellStyle}>
                  <Button
                    onClick={() => handleEditClick(proveedor)}
                    variant="contained"
                    color="primary"
                    size="small"
                    style={buttonStyles}
                  >
                    Editar
                  </Button>
                  <Button
                    onClick={() => onEliminarClick(proveedor.id)}
                    variant="contained"
                    color="error"
                    size="small"
                    style={buttonStyles}
                  >
                    Eliminar
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={modalOpen} onClose={handleCloseModal}>
        <DialogTitle>Editar Proveedor</DialogTitle>
        <DialogContent>
          <TextField
            label="Nombre"
            variant="outlined"
            margin="normal"
            fullWidth
            value={selectedProveedor ? selectedProveedor.name : ''}
            onChange={(e) => handleEditFieldChange('name', e.target.value)}
          />
          <TextField
            label="RUC"
            variant="outlined"
            margin="normal"
            fullWidth
            value={selectedProveedor ? selectedProveedor.ruccode : ''}
            onChange={(e) => handleEditFieldChange('ruccode', e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal} color="secondary">
            Cancelar
          </Button>
          <Button onClick={handleGuardarClick} color="primary">
            Guardar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default TablaProveedores;
