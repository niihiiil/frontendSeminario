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
import { useTheme } from '@mui/material/styles';
import { getTableStyles } from '../../styles/tableStyles';

const TablaMarca = ({ marcas, onEditarClick, onEliminarClick, handleGuardarEdicion }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedMarca, setSelectedMarca] = useState(null);
  const theme = useTheme();
  const styles = getTableStyles(theme);

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
      <TableContainer component={Paper} sx={styles.tableContainerStyles}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell style={styles.headerCellStyle}>Nombre</TableCell>
              <TableCell style={styles.headerCellStyle}>Descripción</TableCell>
              <TableCell style={styles.headerCellStyle}>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {marcas.map((marca, index) => (
              <TableRow key={index} sx={styles.rowStyles}>
                <TableCell style={styles.bodyCellStyle}>{marca.name}</TableCell>
                <TableCell style={styles.bodyCellStyle}>{marca.description}</TableCell>
                <TableCell style={styles.actionsCellStyle}>
                  <Button
                    onClick={() => handleEditClick(marca)}
                    variant="contained"
                    color="primary"
                    size="small"
                    style={styles.buttonStyles}
                  >
                    Editar
                  </Button>
                  <Button
                    onClick={() => onEliminarClick(marca.id)}
                    variant="contained"
                    color="error"
                    size="small"
                    style={styles.buttonStyles}
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

