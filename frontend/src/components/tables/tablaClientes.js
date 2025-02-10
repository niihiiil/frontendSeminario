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
  useTheme
} from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import { getTableStyles } from '../../styles/tableStyles';

const TablaClientes = ({ clientes, onEditarClick, handleGuardarEdicion, onEliminarClick }) => {
  const theme = useTheme();
  const styles = getTableStyles(theme);

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedCliente, setSelectedCliente] = useState(null);

  const handleEditarClick = (cliente) => {
    setSelectedCliente(cliente);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedCliente(null);
  };

  const handleEditFieldChange = (fieldName, value) => {
    setSelectedCliente({
      ...selectedCliente,
      [fieldName]: value,
    });
  };

  return (
    <TableContainer component={Paper} sx={styles.tableContainerStyles}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell style={styles.headerCellStyle}>Nombre</TableCell>
            <TableCell style={styles.headerCellStyle}>Apellido</TableCell>
            <TableCell style={styles.headerCellStyle}>Identificación</TableCell>
            <TableCell style={styles.headerCellStyle}>Acciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {clientes.map((cliente) => (
            <TableRow key={cliente.id} sx={styles.rowStyles}>
              <TableCell style={styles.bodyCellStyle}>{cliente.firstName}</TableCell>
              <TableCell style={styles.bodyCellStyle}>{cliente.firstLastName}</TableCell>
              <TableCell style={styles.bodyCellStyle}>{cliente.identificationNumber}</TableCell>
              <TableCell style={styles.actionsCellStyle}>
                <Tooltip title="Editar">
                  <IconButton 
                    onClick={() => handleEditarClick(cliente)}
                    color="primary"
                    size="small"
                  >
                    <Edit />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Eliminar">
                  <IconButton
                    onClick={() => onEliminarClick(cliente.id)}
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

      <Dialog open={modalOpen} onClose={handleCloseModal}>
        <DialogTitle>Editar Cliente</DialogTitle>
        <DialogContent>
          <form>
            <TextField
              label="Nombre"
              variant="outlined"
              margin="normal"
              fullWidth
              required
              value={selectedCliente ? selectedCliente.firstName : ''}
              onChange={(e) => handleEditFieldChange('firstName', e.target.value)}
            />
            <TextField
              label="Segundo Nombre"
              variant="outlined"
              margin="normal"
              fullWidth
              value={selectedCliente ? selectedCliente.secondName : ''}
              onChange={(e) => handleEditFieldChange('secondName', e.target.value)}
            />
            <TextField
              label="Apellido Paterno"
              variant="outlined"
              margin="normal"
              fullWidth
              required
              value={selectedCliente ? selectedCliente.firstLastName : ''}
              onChange={(e) => handleEditFieldChange('firstLastName', e.target.value)}
            />
            <TextField
              label="Apellido Materno"
              variant="outlined"
              margin="normal"
              fullWidth
              value={selectedCliente ? selectedCliente.secondLastName : ''}
              onChange={(e) => handleEditFieldChange('secondLastName', e.target.value)}
            />
            <TextField
              label="Número de Identificación"
              variant="outlined"
              margin="normal"
              fullWidth
              required
              value={selectedCliente ? selectedCliente.identificationNumber : ''}
              onChange={(e) => handleEditFieldChange('identificationNumber', e.target.value)}
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal} color="secondary">
            Cancelar
          </Button>
          <Button onClick={()=> { handleGuardarEdicion(selectedCliente); handleCloseModal(); }} color="primary">
            Guardar
          </Button>
        </DialogActions>
      </Dialog>
    </TableContainer>
  );
};

export default TablaClientes;
