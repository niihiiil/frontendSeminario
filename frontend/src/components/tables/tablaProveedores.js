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
  IconButton,
  Tooltip,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { getTableStyles } from '../../styles/tableStyles';
import { Edit, Delete } from '@mui/icons-material';

const TablaProveedores = ({ proveedores, onEditar, onEliminar, handleGuardarEdicion }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProveedor, setSelectedProveedor] = useState(null);
  const theme = useTheme();
  const styles = getTableStyles(theme);

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
      <TableContainer component={Paper} sx={styles.tableContainerStyles}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell style={styles.headerCellStyle}>Nombre</TableCell>
              <TableCell style={styles.headerCellStyle}>RUC</TableCell>
              <TableCell style={styles.headerCellStyle}>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {proveedores.map((proveedor) => (
              <TableRow key={proveedor.id} sx={styles.rowStyles}>
                <TableCell style={styles.bodyCellStyle}>{proveedor.name}</TableCell>
                <TableCell style={styles.bodyCellStyle}>{proveedor.ruccode}</TableCell>
                <TableCell style={styles.actionsCellStyle}>
                  <Tooltip title="Editar">
                    <IconButton 
                      onClick={() => handleEditClick(proveedor)}
                      color="primary"
                      size="small"
                    >
                      <Edit />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Eliminar">
                    <IconButton
                      onClick={() => onEliminar(proveedor.id)}
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
