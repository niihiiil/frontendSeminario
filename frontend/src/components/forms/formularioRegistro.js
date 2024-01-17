import React, { useState } from 'react';
import { TextField, Button, Typography, Paper, Box, Grid } from '@mui/material';
import EntityClass from '../../api/entityClass';

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await EntityClass.agregarUsuario({
        email: formData.correo,
        password: formData.contraseña,
        userName: formData.usuario,
        firstName: formData.nombre,
        lastName: formData.apellido,
        phoneNumber: formData.telefono,
      });

      console.log('Usuario registrado exitosamente:', formData);

      if (typeof onSubmit === 'function') {
        onSubmit(formData);
      }
    } catch (error) {
      console.error('Error al registrar usuario:', error.message);
    }
  };

  return (
    <Paper elevation={3} style={{ maxWidth: '700px', margin: 'auto', padding: '20px', marginTop: '20px' }}>
      <Box display="flex" flexDirection="column" alignItems="center">
        <Typography variant="h5" gutterBottom>
          Registrar nuevos usuarios
        </Typography>
        <form onSubmit={handleSubmit} style={{ width: '100%' }}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                label="Nombre"
                type="text"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                fullWidth
                margin="normal"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Apellido"
                type="text"
                name="apellido"
                value={formData.apellido}
                onChange={handleChange}
                fullWidth
                margin="normal"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Correo"
                type="email"
                name="correo"
                value={formData.correo}
                onChange={handleChange}
                fullWidth
                margin="normal"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Numero de telefono"
                type="tel"
                name="telefono"
                value={formData.telefono}
                onChange={handleChange}
                fullWidth
                margin="normal"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Usuario"
                type="text"
                name="usuario"
                value={formData.usuario}
                onChange={handleChange}
                fullWidth
                margin="normal"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Contraseña"
                type="password"
                name="contraseña"
                value={formData.contraseña}
                onChange={handleChange}
                fullWidth
                margin="normal"
              />
            </Grid>
          </Grid>
          <br />
          <Button variant="contained" color="primary" type="submit">
            Registrar
          </Button>
        </form>
      </Box>
    </Paper>
  );
};

export default FormularioRegistro;
