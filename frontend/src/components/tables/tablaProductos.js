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
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { alpha } from '@mui/material/styles';

const TablaProductos = ({ productos = [], categorias, marcas, onEditarClick, handleGuardarEdicion, onEliminarClick }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProducto, setSelectedProducto] = useState(null);
  const theme = useTheme();

  const headerCellStyle = {
    fontSize: '15px',
    fontWeight: 'bold',
    color: theme.palette.mode === 'dark' ? theme.palette.common.white : theme.palette.common.black,
    textAlign: 'left',
    padding: '16px',
    paddingLeft: '20px',
    backgroundColor: theme.palette.primary.main,
  };

  const rowStyles = {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.mode === 'dark' 
        ? alpha(theme.palette.primary.main, 0.15)
        : alpha(theme.palette.primary.main, 0.05),
    },
    '&:hover': {
      backgroundColor: theme.palette.mode === 'dark'
        ? alpha(theme.palette.primary.main, 0.25)
        : alpha(theme.palette.primary.main, 0.1),
    },
  };

  const bodyCellStyle = {
    fontSize: '14px',
    textAlign: 'left',
    padding: '16px',
    paddingLeft: '20px',
    color: theme.palette.text.primary,
  };

  const actionsCellStyle = {
    ...bodyCellStyle,
    paddingLeft: '15px',
  };

  const buttonStyles = {
    fontSize: '12px',
    marginRight: '8px',
  };

  const handleEditClick = (producto) => {
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

  // Función auxiliar para mostrar el valor de forma segura
  const displayValue = (obj, property) => {
    try {
      return obj && obj[property] ? obj[property] : 'N/A';
    } catch (error) {
      return 'N/A';
    }
  };

  return (
    <>
      <TableContainer 
        component={Paper} 
        sx={{ 
          marginTop: '20px', 
          margin: 'auto',
          backgroundColor: theme.palette.background.paper,
          boxShadow: theme.shadows[3],
        }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell style={headerCellStyle}>Nombre</TableCell>
              <TableCell style={headerCellStyle}>Descripción</TableCell>
              <TableCell style={headerCellStyle}>Paquete</TableCell>
              <TableCell style={headerCellStyle}>Categoría</TableCell>
              <TableCell style={headerCellStyle}>Marca</TableCell>
              <TableCell style={headerCellStyle}>Producto en Paquete</TableCell>
              <TableCell style={headerCellStyle}>Unidades en Paquete</TableCell>
              <TableCell style={headerCellStyle}>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(productos || []).map((producto, index) => (
              <TableRow 
                key={index} 
                sx={rowStyles}
              >
                <TableCell style={bodyCellStyle}>{displayValue(producto, 'name')}</TableCell>
                <TableCell style={bodyCellStyle}>{displayValue(producto, 'description')}</TableCell>
                <TableCell style={bodyCellStyle}>{producto?.isPack ? 'Sí' : 'No'}</TableCell>
                <TableCell style={bodyCellStyle}>
                  {displayValue(producto?.productCategory, 'name')}
                </TableCell>
                <TableCell style={bodyCellStyle}>
                  {displayValue(producto?.brand, 'name')}
                </TableCell>
                <TableCell style={bodyCellStyle}>
                  {producto?.productInPack ? 
                    (typeof producto.productInPack === 'object' ? 
                      displayValue(producto.productInPack, 'name') : 
                      producto.productInPack) 
                    : 'N/A'}
                </TableCell>
                <TableCell style={bodyCellStyle}>{producto?.packUnits || 'N/A'}</TableCell>
                <TableCell style={actionsCellStyle}>
                  <Button
                    onClick={() => handleEditClick(producto)}
                    variant="contained"
                    color="primary"
                    size="small"
                    style={buttonStyles}
                  >
                    Editar
                  </Button>
                  <Button
                    onClick={() => onEliminarClick(producto?.id)}
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
    </>
  );
};

export default TablaProductos;