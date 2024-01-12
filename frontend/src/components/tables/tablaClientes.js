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
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';

const TablaClientes = ({ clientes, onEditarClick, handleGuardarEdicion, onEliminarClick }) => {
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
    <TableContainer component={Paper} style={{ marginTop: '20px', margin: 'auto' }}>
      <Table>
        <TableHead>
          <TableRow style={rowStyles}>
            <TableCell style={cellStyles}>Nombre</TableCell>
            <TableCell style={cellStyles}>Segundo Nombre</TableCell>
            <TableCell style={cellStyles}>Apellido Paterno</TableCell>
            <TableCell style={cellStyles}>Apellido Materno</TableCell>
            <TableCell style={cellStyles}>Número de Identificación</TableCell>
            <TableCell style={cellStyles}>Candidato a Crédito</TableCell>
            <TableCell style={{ ...cellStyles, textAlign: 'center' }}>Acciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {clientes.map((cliente, index) => (
            <TableRow key={index} style={{ background: index % 2 === 0 ? '#f9f9f9' : 'white' }}>
              <TableCell style={{ fontSize: '14px', textAlign: 'center' }}>{cliente.firstName}</TableCell>
              <TableCell style={{ fontSize: '14px', textAlign: 'center' }}>{cliente.secondName}</TableCell>
              <TableCell style={{ fontSize: '14px', textAlign: 'center' }}>{cliente.firstLastName}</TableCell>
              <TableCell style={{ fontSize: '14px', textAlign: 'center' }}>{cliente.secondLastName}</TableCell>
              <TableCell style={{ fontSize: '14px', textAlign: 'center' }}>{cliente.identificationNumber}</TableCell>
              <TableCell style={{ fontSize: '14px', textAlign: 'center' }}>{cliente.isCreditCandidate ? 'Sí' : 'No'}</TableCell>
              <TableCell style={{ textAlign: 'center' }}>
                <Button
                  onClick={() => handleEditarClick(cliente)}
                  variant="contained"
                  color="primary"
                  size="small"
                  style={{ ...buttonStyles }}
                >
                  Editar
                </Button>
                <Button
                  onClick={() => onEliminarClick(cliente.id)}
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
            <FormControl fullWidth variant="outlined" margin="normal">
              <InputLabel>Candidato a Crédito</InputLabel>
              <Select
                value={selectedCliente ? selectedCliente.isCreditCandidate : false}
                onChange={(e) => handleEditFieldChange('isCreditCandidate', e.target.value)}
                label="Candidato a Crédito"
              >
                <MenuItem value={true}>Sí</MenuItem>
                <MenuItem value={false}>No</MenuItem>
              </Select>
            </FormControl>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={()=> { console.log(selectedCliente); handleGuardarEdicion(selectedCliente); handleCloseModal(); }} color="primary">
            Cerrar
          </Button>
        </DialogActions>
      </Dialog>
    </TableContainer>
  );
};

export default TablaClientes;
