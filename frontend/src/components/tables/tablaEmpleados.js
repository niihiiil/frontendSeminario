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

const TablaEmpleados = ({ empleados, onEditarClick, handleGuardarEdicion, onEliminarClick }) => {
  const theme = useTheme();
  const styles = getTableStyles(theme);

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedEmpleado, setSelectedEmpleado] = useState(null);

  const handleEditarClick = (empleado) => {
    setSelectedEmpleado(empleado);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedEmpleado(null);
  };

  const handleEditFieldChange = (fieldName, value) => {
    setSelectedEmpleado({
      ...selectedEmpleado,
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
          {empleados.map((empleado) => (
            <TableRow key={empleado.id} sx={styles.rowStyles}>
              <TableCell style={styles.bodyCellStyle}>{empleado.firstName}</TableCell>
              <TableCell style={styles.bodyCellStyle}>{empleado.firstLastName}</TableCell>
              <TableCell style={styles.bodyCellStyle}>{empleado.identificationNumber}</TableCell>
              <TableCell style={styles.actionsCellStyle}>
                <Tooltip title="Editar">
                  <IconButton 
                    onClick={() => handleEditarClick(empleado)}
                    color="primary"
                    size="small"
                  >
                    <Edit />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Eliminar">
                  <IconButton
                    onClick={() => onEliminarClick(empleado.id)}
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
        <DialogTitle>Editar Empleado</DialogTitle>
        <DialogContent>
          <form>
            <TextField
              label="Nombre"
              variant="outlined"
              margin="normal"
              fullWidth
              required
              value={selectedEmpleado ? selectedEmpleado.firstName : ''}
              onChange={(e) => handleEditFieldChange('firstName', e.target.value)}
            />
            <TextField
              label="Segundo Nombre"
              variant="outlined"
              margin="normal"
              fullWidth
              value={selectedEmpleado ? selectedEmpleado.secondName : ''}
              onChange={(e) => handleEditFieldChange('secondName', e.target.value)}
            />
            <TextField
              label="Apellido Paterno"
              variant="outlined"
              margin="normal"
              fullWidth
              required
              value={selectedEmpleado ? selectedEmpleado.firstLastName : ''}
              onChange={(e) => handleEditFieldChange('firstLastName', e.target.value)}
            />
            <TextField
              label="Apellido Materno"
              variant="outlined"
              margin="normal"
              fullWidth
              value={selectedEmpleado ? selectedEmpleado.secondLastName : ''}
              onChange={(e) => handleEditFieldChange('secondLastName', e.target.value)}
            />
            <TextField
              label="Número de Identificación"
              variant="outlined"
              margin="normal"
              fullWidth
              required
              value={selectedEmpleado ? selectedEmpleado.identificationNumber : ''}
              onChange={(e) => handleEditFieldChange('identificationNumber', e.target.value)}
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal} color="secondary">
            Cancelar
          </Button>
          <Button onClick={()=> { handleGuardarEdicion(selectedEmpleado); handleCloseModal(); }} color="primary">
            Guardar
          </Button>
        </DialogActions>
      </Dialog>
    </TableContainer>
  );
};

export default TablaEmpleados; 