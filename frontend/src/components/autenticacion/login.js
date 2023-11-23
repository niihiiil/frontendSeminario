import React, { useState } from 'react';
import { Container, Paper, Typography, TextField, Button, IconButton, InputAdornment } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Container component="main" maxWidth="xs" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
      <Paper elevation={3} sx={{ padding: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography variant="h5" component="h1" mb={2}>
          Libreria Edelweiss
        </Typography>
        <Typography variant="body2" color="textSecondary" align="center" mb={4}>
          Ingrese sus credenciales
        </Typography>
        <TextField
          label="Usuario"
          variant="outlined"
          margin="normal"
          required
          fullWidth
        />
        <TextField
          label="Contraseña"
          variant="outlined"
          margin="normal"
          required
          fullWidth
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handleTogglePassword} edge="end">
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <Button variant="contained" color="primary" fullWidth>
          Iniciar Sesión
        </Button>
      </Paper>
    </Container>
  );
};

export default Login;
