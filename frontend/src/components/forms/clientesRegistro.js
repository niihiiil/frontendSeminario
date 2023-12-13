import React, { useState } from 'react';
import {
  TextField,
  Button,
  Typography,
} from '@mui/material';

const FormularioClientes = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    cedula: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: '400px', marginLeft: '20px' }}>
      <Typography variant="h5" gutterBottom>
        Registrar nuevos clientes
      </Typography>
      <TextField
        label="Nombre"
        type="text"
        name="nombre"
        value={formData.nombre}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Apellido"
        type="text"
        name="apellido"
        value={formData.apellido}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Cédula"
        type="text"
        name="cedula"
        value={formData.cedula}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <br />
      <Button variant="contained" color="primary" type="submit">
        Registrar
      </Button>
    </form>
  );
};

export default FormularioClientes;
