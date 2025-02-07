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

const TablaProdCategoria = ({ categorias, onEditarClick, onEliminarClick, handleGuardarEdicion }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedCategoria, setSelectedCategoria] = useState(null);
  const theme = useTheme();
  const styles = getTableStyles(theme);

  const handleEditClick = (categoria) => {
    setSelectedCategoria(categoria);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedCategoria(null);
  };

  const handleEditFieldChange = (fieldName, value) => {
    setSelectedCategoria({
      ...selectedCategoria,
      [fieldName]: value,
    });
  };

  const handleGuardarClick = () => {
    handleGuardarEdicion(selectedCategoria);
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
            {categorias.map((categoria, index) => (
              <TableRow key={index} sx={styles.rowStyles}>
                <TableCell style={styles.bodyCellStyle}>{categoria.name}</TableCell>
                <TableCell style={styles.bodyCellStyle}>{categoria.description}</TableCell>
                <TableCell style={styles.actionsCellStyle}>
                  <Button
                    onClick={() => handleEditClick(categoria)}
                    variant="contained"
                    color="primary"
                    size="small"
                    style={styles.buttonStyles}
                  >
                    Editar
                  </Button>
                  <Button
                    onClick={() => onEliminarClick(categoria.id)}
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
        <DialogTitle>Editar Categoría</DialogTitle>
        <DialogContent>
          <TextField
            label="Nombre"
            variant="outlined"
            margin="normal"
            fullWidth
            value={selectedCategoria ? selectedCategoria.name : ''}
            onChange={(e) => handleEditFieldChange('name', e.target.value)}
          />
          <TextField
            label="Descripción"
            variant="outlined"
            margin="normal"
            fullWidth
            value={selectedCategoria ? selectedCategoria.description : ''}
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

export default TablaProdCategoria;
