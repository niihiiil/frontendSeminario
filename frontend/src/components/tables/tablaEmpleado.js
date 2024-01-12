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

const TablaEmpleados = ({ empleados, onEditarClick, handleGuardarEdicion, onEliminarClick }) => {
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
    <TableContainer component={Paper} style={{ marginTop: '20px', margin: 'auto' }}>
      <Table>
        <TableHead>
          <TableRow style={rowStyles}>
            <TableCell style={cellStyles}>Primer Nombre</TableCell>
            <TableCell style={cellStyles}>Segundo Nombre</TableCell>
            <TableCell style={cellStyles}>Primer Apellido</TableCell>
            <TableCell style={cellStyles}>Segundo Apellido</TableCell>
            <TableCell style={cellStyles}>Género</TableCell>
            <TableCell style={cellStyles}>Número de Identificación</TableCell>
            <TableCell style={cellStyles}>Edad</TableCell>
            <TableCell style={{ ...cellStyles, textAlign: 'center' }}>Acciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {empleados.map((empleado, index) => (
            <TableRow key={index} style={{ background: index % 2 === 0 ? '#f9f9f9' : 'white' }}>
              <TableCell style={{ fontSize: '14px', textAlign: 'center' }}>{empleado.firstName}</TableCell>
              <TableCell style={{ fontSize: '14px', textAlign: 'center' }}>{empleado.secondName}</TableCell>
              <TableCell style={{ fontSize: '14px', textAlign: 'center' }}>{empleado.firstLastName}</TableCell>
              <TableCell style={{ fontSize: '14px', textAlign: 'center' }}>{empleado.secondLastName}</TableCell>
              <TableCell style={{ fontSize: '14px', textAlign: 'center' }}>{empleado.sex}</TableCell>
              <TableCell style={{ fontSize: '14px', textAlign: 'center' }}>{empleado.identificationNumber}</TableCell>
              <TableCell style={{ fontSize: '14px', textAlign: 'center' }}>{empleado.yearsOld}</TableCell>
              <TableCell style={{ textAlign: 'center' }}>
                <Button
                  onClick={() => handleEditarClick(empleado)}
                  variant="contained"
                  color="primary"
                  size="small"
                  style={{ ...buttonStyles }}
                >
                  Editar
                </Button>
                <Button
                  onClick={() => onEliminarClick(empleado.id)}
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
        <DialogTitle>Editar Empleado</DialogTitle>
        <DialogContent>
          <form>
            <TextField
              label="Primer Nombre"
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
              label="Primer Apellido"
              variant="outlined"
              margin="normal"
              fullWidth
              required
              value={selectedEmpleado ? selectedEmpleado.firstLastName : ''}
              onChange={(e) => handleEditFieldChange('firstLastName', e.target.value)}
            />
            <TextField
              label="Segundo Apellido"
              variant="outlined"
              margin="normal"
              fullWidth
              value={selectedEmpleado ? selectedEmpleado.secondLastName : ''}
              onChange={(e) => handleEditFieldChange('secondLastName', e.target.value)}
            />
            <TextField
              label="Género"
              variant="outlined"
              margin="normal"
              fullWidth
              required
              value={selectedEmpleado ? selectedEmpleado.sex : ''}
              onChange={(e) => handleEditFieldChange('sex', e.target.value)}
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
            <TextField
              label="Edad"
              variant="outlined"
              margin="normal"
              fullWidth
              required
              value={selectedEmpleado ? selectedEmpleado.yearsOld : ''}
              onChange={(e) => handleEditFieldChange('yearsOld', e.target.value)}
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => { console.log(selectedEmpleado); handleGuardarEdicion(selectedEmpleado); handleCloseModal(); }} color="primary">
            Cerrar
          </Button>
        </DialogActions>
      </Dialog>
    </TableContainer>
  );
};

export default TablaEmpleados;
