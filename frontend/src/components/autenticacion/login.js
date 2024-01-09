import React, { useState } from 'react';
import { Container, Paper, Typography, TextField, Button, IconButton, InputAdornment } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import EntityClass from '../../api/entityClass';
import { useHistory } from 'react-router-dom';  
import Cookies from 'js-cookie';

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const history = useHistory();  

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async () => {
    try {
      const response = await EntityClass.login({
        email,
        password,
      });
      console.log('Server response:', response);

      const { accessToken } = response.data;

      // Almacena el token en una cookie
      Cookies.set('token', accessToken);

      console.log('Login successful');
      onLogin();
      console.log('onLog');
      console.log('The token is:', Cookies.get('token'));
      history.push('/main'); 
    } catch (error) {
      console.error('Authentication error:', error);
    }
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
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          label="Contraseña"
          variant="outlined"
          margin="normal"
          required
          fullWidth
          type={showPassword ? 'text' : 'password'}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
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
        <Button variant="contained" color="primary" fullWidth onClick={handleLogin}>
          Iniciar Sesión
        </Button>
      </Paper>
    </Container>
  );
};

export default Login;
