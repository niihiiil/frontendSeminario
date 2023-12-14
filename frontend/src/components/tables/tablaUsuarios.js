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

const TablaUsuarios = ({ usuarios, onEditarClick }) => {
  // Objeto de estilos reutilizables
  const cellStyles = {
    fontSize: '15px',
    fontWeight: 'bold',
    color: 'white', // Puedes ajustar el color aquí
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
            <TableCell style={cellStyles}>Apellido</TableCell>
            <TableCell style={cellStyles}>Correo</TableCell>
            <TableCell style={cellStyles}>Número de teléfono</TableCell>
            <TableCell style={cellStyles}>Usuario</TableCell>
            <TableCell style={cellStyles}>Acciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {usuarios.map((user, index) => (
            <TableRow key={index} style={{ background: index % 2 === 0 ? '#f9f9f9' : 'white' }}>
              <TableCell style={{ fontSize: '14px' }}>{user.nombre}</TableCell>
              <TableCell style={{ fontSize: '14px' }}>{user.apellido}</TableCell>
              <TableCell style={{ fontSize: '14px' }}>{user.correo}</TableCell>
              <TableCell style={{ fontSize: '14px' }}>{user.telefono}</TableCell>
              <TableCell style={{ fontSize: '14px' }}>{user.usuario}</TableCell>
              <TableCell>
                <Button
                  onClick={() => onEditarClick(user)}
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

export default TablaUsuarios;
