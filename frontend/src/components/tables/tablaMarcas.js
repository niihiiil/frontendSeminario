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

const TablaMarcas = ({ marcas, onEditar, onEliminar }) => {
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
          {marcas.map((marca) => (
            <TableRow key={marca.id} sx={styles.rowStyles}>
              <TableCell style={styles.bodyCellStyle}>{marca.name}</TableCell>
              <TableCell style={styles.bodyCellStyle}>{marca.description}</TableCell>
              <TableCell style={styles.actionsCellStyle}>
                <Tooltip title="Editar">
                  <IconButton 
                    onClick={() => onEditar(marca)}
                    color="primary"
                    size="small"
                  >
                    <Edit />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Eliminar">
                  <IconButton
                    onClick={() => onEliminar(marca.id)}
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

export default TablaMarcas; 