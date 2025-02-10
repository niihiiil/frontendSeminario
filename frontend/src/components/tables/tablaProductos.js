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
  IconButton,
  Tooltip,
  useTheme
} from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import { getTableStyles } from '../../styles/tableStyles';

const TablaProductos = ({ productos = [], categorias, marcas, onEditarClick, handleGuardarEdicion, onEliminarClick }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProducto, setSelectedProducto] = useState(null);
  const theme = useTheme();
  const styles = getTableStyles(theme);

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

  const displayValue = (obj, property) => {
    try {
      return obj && obj[property] ? obj[property] : 'N/A';
    } catch (error) {
      return 'N/A';
    }
  };

  return (
    <>
      <TableContainer component={Paper} sx={styles.tableContainerStyles}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell style={styles.headerCellStyle}>Nombre</TableCell>
              <TableCell style={styles.headerCellStyle}>Descripción</TableCell>
              <TableCell style={styles.headerCellStyle}>Paquete</TableCell>
              <TableCell style={styles.headerCellStyle}>Categoría</TableCell>
              <TableCell style={styles.headerCellStyle}>Marca</TableCell>
              <TableCell style={styles.headerCellStyle}>Producto en Paquete</TableCell>
              <TableCell style={styles.headerCellStyle}>Unidades en Paquete</TableCell>
              <TableCell style={styles.headerCellStyle}>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {productos.map((producto) => (
              <TableRow key={producto.id} sx={styles.rowStyles}>
                <TableCell style={styles.bodyCellStyle}>{displayValue(producto, 'name')}</TableCell>
                <TableCell style={styles.bodyCellStyle}>{displayValue(producto, 'description')}</TableCell>
                <TableCell style={styles.bodyCellStyle}>{producto?.isPack ? 'Sí' : 'No'}</TableCell>
                <TableCell style={styles.bodyCellStyle}>
                  {displayValue(producto?.productCategory, 'name')}
                </TableCell>
                <TableCell style={styles.bodyCellStyle}>
                  {displayValue(producto?.brand, 'name')}
                </TableCell>
                <TableCell style={styles.bodyCellStyle}>
                  {producto?.productInPack ? 
                    (typeof producto.productInPack === 'object' ? 
                      displayValue(producto.productInPack, 'name') : 
                      producto.productInPack) 
                    : 'N/A'}
                </TableCell>
                <TableCell style={styles.bodyCellStyle}>{producto?.packUnits || 'N/A'}</TableCell>
                <TableCell style={styles.actionsCellStyle}>
                  <Tooltip title="Editar">
                    <IconButton 
                      onClick={() => handleEditClick(producto)}
                      color="primary"
                      size="small"
                    >
                      <Edit />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Eliminar">
                    <IconButton
                      onClick={() => onEliminarClick(producto.id)}
                      color="error"
                      size="small"
                    >
                      <Delete />
                    </IconButton>
                  </Tooltip>
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