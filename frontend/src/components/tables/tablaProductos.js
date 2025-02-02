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
  Checkbox,
  FormControlLabel,
  MenuItem,
} from '@mui/material';

const TablaProductos = ({ productos, categorias, marcas, onEditarClick, handleGuardarEdicion, onEliminarClick }) => {
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
  const [selectedProducto, setSelectedProducto] = useState(null);

  const handleEditarClick = (producto) => {
    setSelectedProducto(producto);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedProducto(null);
  };

  const handleEditFieldChange = (fieldName, value) => {
    setSelectedProducto({
      ...selectedProducto,
      [fieldName]: value,
    });
  };

  return (
    <TableContainer component={Paper} style={{ marginTop: '20px', margin: 'auto' }}>
      <Table>
        <TableHead>
          <TableRow style={rowStyles}>
            <TableCell style={cellStyles}>Nombre</TableCell>
            <TableCell style={cellStyles}>Descripción</TableCell>
            <TableCell style={cellStyles}>Paquete</TableCell>
            <TableCell style={cellStyles}>Categoría </TableCell>
            <TableCell style={cellStyles}>Marca </TableCell>
            <TableCell style={cellStyles}>Producto en Paquete</TableCell>
            <TableCell style={cellStyles}>Unidades en Paquete</TableCell>
            <TableCell style={{ ...cellStyles, textAlign: 'center' }}>Acciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {productos.map((producto, index) => (
            <TableRow key={index} style={{ background: index % 2 === 0 ? '#f9f9f9' : 'white' }}>
              <TableCell style={{ fontSize: '14px', textAlign: 'center' }}>{producto.name}</TableCell>
              <TableCell style={{ fontSize: '14px', textAlign: 'center' }}>{producto.description}</TableCell>
              <TableCell style={{ fontSize: '14px', textAlign: 'center' }}>{producto.isPack ? 'Sí' : 'No'}</TableCell>
              <TableCell style={{ fontSize: '14px', textAlign: 'center' }}>{producto.productCategoryId}</TableCell>
              <TableCell style={{ fontSize: '14px', textAlign: 'center' }}>{producto.brandId}</TableCell>
              <TableCell style={{ fontSize: '14px', textAlign: 'center' }}>{producto.productInPackId}</TableCell>
              <TableCell style={{ fontSize: '14px', textAlign: 'center' }}>{producto.packUnits}</TableCell>
              <TableCell style={{ textAlign: 'center' }}>
                <Button
                  onClick={() => handleEditarClick(producto)}
                  variant="contained"
                  color="primary"
                  size="small"
                  style={{ ...buttonStyles }}
                >
                  Editar
                </Button>
                <Button
                  onClick={() => onEliminarClick(producto.id)}
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
        <DialogTitle>Editar Producto</DialogTitle>
        <DialogContent>
          <form>
            <TextField
              label="Nombre"
              variant="outlined"
              margin="normal"
              fullWidth
              required
              value={selectedProducto ? selectedProducto.name : ''}
              onChange={(e) => handleEditFieldChange('name', e.target.value)}
            />
            <TextField
              label="Descripción"
              variant="outlined"
              margin="normal"
              fullWidth
              required
              value={selectedProducto ? selectedProducto.description : ''}
              onChange={(e) => handleEditFieldChange('description', e.target.value)}
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={selectedProducto ? selectedProducto.isPack : false}
                  onChange={(e) => handleEditFieldChange('isPack', e.target.checked)}
                />
              }
              label="Es Pack"
            />
            <TextField
              label="Categoría ID"
              variant="outlined"
              margin="normal"
              fullWidth
              required
              type="number"
              value={selectedProducto ? selectedProducto.productCategoryId : ''}
              onChange={(e) => handleEditFieldChange('productCategoryId', parseInt(e.target.value))}
            />
            <TextField
              label="Marca ID"
              variant="outlined"
              margin="normal"
              fullWidth
              required
              type="number"
              value={selectedProducto ? selectedProducto.brandId : ''}
              onChange={(e) => handleEditFieldChange('brandId', parseInt(e.target.value))}
            />
            <TextField
              label="Producto en Pack ID"
              variant="outlined"
              margin="normal"
              fullWidth
              type="number"
              value={selectedProducto ? selectedProducto.productInPackId : ''}
              onChange={(e) => handleEditFieldChange('productInPackId', parseInt(e.target.value))}
            />
            <TextField
              label="Unidades en Pack"
              variant="outlined"
              margin="normal"
              fullWidth
              type="number"
              value={selectedProducto ? selectedProducto.packUnits : ''}
              onChange={(e) => handleEditFieldChange('packUnits', parseInt(e.target.value))}
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => { handleGuardarEdicion(selectedProducto); handleCloseModal(); }} color="primary">
            Guardar
          </Button>
          <Button onClick={handleCloseModal} color="secondary">
            Cancelar
          </Button>
        </DialogActions>
      </Dialog>
    </TableContainer>
  );
};

export default TablaProductos;