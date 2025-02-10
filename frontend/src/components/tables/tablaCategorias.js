import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Tooltip,
  useTheme
} from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import { getTableStyles } from '../../styles/tableStyles';

const TablaCategorias = ({ categorias, onEditar, onEliminar }) => {
  const theme = useTheme();
  const styles = getTableStyles(theme);

  return (
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
                    onClick={() => onEditar(categoria)}
                    color="primary"
                    size="small"
                  >
                    <Edit />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Eliminar">
                  <IconButton
                    onClick={() => onEliminar(categoria.id)}
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
  );
};

export default TablaCategorias; 