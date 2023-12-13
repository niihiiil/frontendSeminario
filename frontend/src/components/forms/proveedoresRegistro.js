import React, { useState } from 'react';
import {
  TextField,
  Button,
  Typography,
} from '@mui/material';

const FormularioProveedores = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    nombre: '',
    numeroRUC: '',
    direccion: '',
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
        Registrar nuevos proveedores
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
        label="Número RUC"
        type="text"
        name="numeroRUC"
        value={formData.numeroRUC}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Dirección"
        type="text"
        name="direccion"
        value={formData.direccion}
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

export default FormularioProveedores;
