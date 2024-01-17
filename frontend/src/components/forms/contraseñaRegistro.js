import React, { useState } from 'react';
import { TextField, Button, Typography, Paper, Box, Grid } from '@mui/material';
import EntityClass from '../../api/entityClass';

const ContraseñaRegistro = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    user: '',
    oldPassword: '',
    newPassword: '',
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
      // Aquí debes utilizar el método correspondiente para gestionar contraseñas
      await EntityClass.cambiarContraseña({
        user: formData.user,
        oldPassword: formData.oldPassword,
        newPassword: formData.newPassword,
      });

      console.log('Contraseña cambiada exitosamente:', formData);

      if (typeof onSubmit === 'function') {
        onSubmit(formData);
      }
    } catch (error) {
      console.error('Error al cambiar contraseña:', error.message);
    }
  };

  return (
    <Paper elevation={3} style={{ maxWidth: '700px', margin: 'auto', padding: '20px', marginTop: '20px' }}>
      <Box display="flex" flexDirection="column" alignItems="center">
        <Typography variant="h5" gutterBottom>
          Cambiar Contraseña
        </Typography>
        <form onSubmit={handleSubmit} style={{ width: '100%' }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Usuario"
                type="text"
                name="user"
                value={formData.user}
                onChange={handleChange}
                fullWidth
                margin="normal"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Contraseña Actual"
                type="password"
                name="oldPassword"
                value={formData.oldPassword}
                onChange={handleChange}
                fullWidth
                margin="normal"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Nueva Contraseña"
                type="password"
                name="newPassword"
                value={formData.newPassword}
                onChange={handleChange}
                fullWidth
                margin="normal"
              />
            </Grid>
          </Grid>
          <br />
          <Button variant="contained" color="primary" type="submit">
            Cambiar Contraseña
          </Button>
        </form>
      </Box>
    </Paper>
  );
};

export default ContraseñaRegistro;
