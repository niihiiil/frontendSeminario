import React, { useState } from 'react';
import {
  TextField,
  Button,
  Typography,
} from '@mui/material';

const FormularioRegistro = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    correo: '',
    telefono: '',
    usuario: '',
    contraseña: '',
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
    <form onSubmit={handleSubmit} style={{ maxWidth: '500px', marginLeft: '20px', display: 'flex', flexDirection: 'column' }}>
      <Typography variant="h5" gutterBottom>
        Registrar nuevos usuarios
      </Typography>
      <div style={{ display: 'flex', flexDirection: 'row', gap: '10px', marginBottom: '10px' }}>
        <div style={{ flex: 1 }}>
          <TextField
            label="Nombre"
            type="text"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
        </div>
        <div style={{ flex: 1 }}>
          <TextField
            label="Apellido"
            type="text"
            name="apellido"
            value={formData.apellido}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'row', gap: '10px', marginBottom: '10px' }}>
        <div style={{ flex: 1 }}>
          <TextField
            label="Correo"
            type="email"
            name="correo"
            value={formData.correo}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
        </div>
        <div style={{ flex: 1 }}>
          <TextField
            label="Numero de telefono"
            type="tel"
            name="telefono"
            value={formData.telefono}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'row', gap: '10px', marginBottom: '10px' }}>
        <div style={{ flex: 1 }}>
          <TextField
            label="Usuario"
            type="text"
            name="usuario"
            value={formData.usuario}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
        </div>
        <div style={{ flex: 1 }}>
          <TextField
            label="Contraseña"
            type="password"
            name="contraseña"
            value={formData.contraseña}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
        </div>
      </div>
      <br />
      <Button variant="contained" color="primary" type="submit">
        Registrar
      </Button>
    </form>
  );
};

export default FormularioRegistro;
