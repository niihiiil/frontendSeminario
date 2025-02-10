import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  IconButton,
  Tooltip,
  useTheme
} from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import { getTableStyles } from '../../styles/tableStyles';

const TablaProdCategoria = ({ categorias, onEditarClick, handleGuardarEdicion, onEliminarClick }) => {
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
            {categorias.map((categoria) => (
              <TableRow key={categoria.id} sx={styles.rowStyles}>
                <TableCell style={styles.bodyCellStyle}>{categoria.name}</TableCell>
                <TableCell style={styles.bodyCellStyle}>{categoria.description}</TableCell>
                <TableCell style={styles.actionsCellStyle}>
                  <Tooltip title="Editar">
                    <IconButton 
                      onClick={() => handleEditClick(categoria)}
                      color="primary"
                      size="small"
                    >
                      <Edit />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Eliminar">
                    <IconButton
                      onClick={() => onEliminarClick(categoria.id)}
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
          <Button onClick={() => { handleGuardarEdicion(selectedCategoria); handleCloseModal(); }} color="primary">
            Guardar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default TablaProdCategoria;
