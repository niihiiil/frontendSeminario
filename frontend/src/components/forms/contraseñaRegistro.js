import React, { useState } from 'react';
import { TextField, Button, Typography, Paper, Box, Grid, InputAdornment, IconButton } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

const ContraseñaRegistro = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    user: '',
    oldPassword: '',
    newPassword: '',
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
    if (name === 'newPassword') {
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

  const handleSubmit = (e) => {
    e.preventDefault();

    if (typeof onSubmit === 'function') {
      onSubmit(formData);
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
                type={showPassword ? 'text' : 'password'}
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
                type={showPassword ? 'text' : 'password'}
                name="newPassword"
                value={formData.newPassword}
                onChange={handleChange}
                fullWidth
                margin="normal"
                error={Boolean(passwordError)}
                helperText={passwordError}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={handleTogglePasswordVisibility} edge="end">
                        {showPassword ? (
                          <VisibilityOffIcon />
                        ) : (
                          <VisibilityIcon />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
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
