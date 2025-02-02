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

const TablaMarca = ({ marcas, onEditarClick, onEliminarClick, handleGuardarEdicion }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedMarca, setSelectedMarca] = useState(null);

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

  const handleEditClick = (marca) => {
    setSelectedMarca(marca);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedMarca(null);
  };

  const handleEditFieldChange = (fieldName, value) => {
    setSelectedMarca({
      ...selectedMarca,
      [fieldName]: value,
    });
  };

  const handleGuardarClick = () => {
    handleGuardarEdicion(selectedMarca);
    handleCloseModal();
  };

  return (
    <>
      <TableContainer component={Paper} style={{ marginTop: '20px', margin: 'auto' }}>
        <Table>
          <TableHead>
            <TableRow style={rowStyles}>
              <TableCell style={cellStyles}>Nombre</TableCell>
              <TableCell style={cellStyles}>Descripción</TableCell>
              <TableCell style={{ ...cellStyles, textAlign: 'center' }}>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {marcas.map((marca, index) => (
              <TableRow key={index} style={{ background: index % 2 === 0 ? '#f9f9f9' : 'white' }}>
                <TableCell style={{ fontSize: '14px', textAlign: 'center' }}>{marca.name}</TableCell>
                <TableCell style={{ fontSize: '14px', textAlign: 'center' }}>{marca.description}</TableCell>
                <TableCell style={{ textAlign: 'center' }}>
                  <Button
                    onClick={() => handleEditClick(marca)}
                    variant="contained"
                    color="primary"
                    size="small"
                    style={buttonStyles}
                  >
                    Editar
                  </Button>
                  <Button
                    onClick={() => onEliminarClick(marca.id)}
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
        <DialogTitle>Editar Marca</DialogTitle>
        <DialogContent>
          <TextField
            label="Nombre"
            variant="outlined"
            margin="normal"
            fullWidth
            value={selectedMarca ? selectedMarca.name : ''}
            onChange={(e) => handleEditFieldChange('name', e.target.value)}
          />
          <TextField
            label="Descripción"
            variant="outlined"
            margin="normal"
            fullWidth
            value={selectedMarca ? selectedMarca.description : ''}
            onChange={(e) => handleEditFieldChange('description', e.target.value)}
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

export default TablaMarca;

