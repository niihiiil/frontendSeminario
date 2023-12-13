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
  return (
    <TableContainer component={Paper} style={{ marginTop: '20px' }}>
      <Table>
        <TableHead>
          <TableRow style={{ background: '#2196f3', color: 'white' }}>
            <TableCell>Nombre</TableCell>
            <TableCell>Apellido</TableCell>
            <TableCell>Correo</TableCell>
            <TableCell>Numero de telefono</TableCell>
            <TableCell>Usuario</TableCell>
            <TableCell>Acciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {usuarios.map((user, index) => (
            <TableRow key={index} style={{ background: index % 2 === 0 ? '#f9f9f9' : 'white' }}>
              <TableCell>{user.nombre}</TableCell>
              <TableCell>{user.apellido}</TableCell>
              <TableCell>{user.correo}</TableCell>
              <TableCell>{user.telefono}</TableCell>
              <TableCell>{user.usuario}</TableCell>
              <TableCell>
                <Button onClick={() => onEditarClick(user)}>Editar</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TablaUsuarios;
