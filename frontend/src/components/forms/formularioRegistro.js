import React, { useState } from 'react';
import {
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Typography,
} from '@mui/material';

const FormularioRegistro = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    usuario: '',
    contraseña: '',
    rol: 'Vendedor',
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
        Registrar nuevos usuarios
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
        label="Usuario"
        type="text"
        name="usuario"
        value={formData.usuario}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Contraseña"
        type="password"
        name="contraseña"
        value={formData.contraseña}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <FormControl fullWidth margin="normal">
        <InputLabel>Rol</InputLabel>
        <Select name="rol" value={formData.rol} onChange={handleChange}>
          <MenuItem value="Admin">Admin</MenuItem>
          <MenuItem value="Vendedor">Vendedor</MenuItem>
        </Select>
      </FormControl>
      <br />
      <Button variant="contained" color="primary" type="submit">
        Registrar
      </Button>
    </form>
  );
};

export default FormularioRegistro;
