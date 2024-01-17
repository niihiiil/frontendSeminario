import React, { useState } from 'react';
import { TextField, Button, Typography, Paper, Box, Grid, InputAdornment, IconButton } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';


const FormularioRegistro = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    correo: '',
    telefono: '',
    usuario: '',
    contraseña: '',
  });

  const [passwordError, setPasswordError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Validación de la contraseña
    if (name === 'contraseña') {
      validatePassword(value);
    }
  };

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{1,}$/;
    if (!passwordRegex.test(password)) {
      setPasswordError('La contraseña debe contener al menos 1 mayúscula, 1 número y 1 caracter especial.');
    } else {
      setPasswordError('');
    }
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Verifica si hay errores en la contraseña antes de enviar el formulario
    if (passwordError) {
      console.error('No se puede enviar el formulario debido a errores en la contraseña.');
      return;
    }
  
    if (typeof onSubmit === 'function') {
      onSubmit(formData);
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
                type={showPassword ? 'text' : 'password'}
                name="contraseña"
                value={formData.contraseña}
                onChange={handleChange}
                fullWidth
                margin="normal"
                error={Boolean(passwordError)}
                helperText={passwordError}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={handleTogglePasswordVisibility} edge="end">
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
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
