import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from '@mui/material';

const TablaMarca = ({ marcas, onEditarClick }) => {
  const cellStyles = {
    fontSize: '15px',
    fontWeight: 'bold',
    color: 'white', 
  };

  const rowStyles = {
    background: '#2196f3',
  };

  return (
    <TableContainer component={Paper} style={{ marginTop: '20px' }}>
      <Table>
        <TableHead>
          <TableRow style={rowStyles}>
            <TableCell style={cellStyles}>Nombre</TableCell>
            <TableCell style={cellStyles}>Descripción</TableCell>
            <TableCell style={cellStyles}>Acciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {marcas.map((marca, index) => (
            <TableRow key={index} style={{ background: index % 2 === 0 ? '#f9f9f9' : 'white' }}>
              <TableCell style={{ fontSize: '14px' }}>{marca.name}</TableCell>
              <TableCell style={{ fontSize: '14px' }}>{marca.description}</TableCell>
              <TableCell>
                <Button
                  onClick={() => onEditarClick(marca)}
                  variant="contained"
                  color="primary"
                  size="small"
                  style={{ fontSize: '12px' }}
                >
                  Editar
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TablaMarca;

