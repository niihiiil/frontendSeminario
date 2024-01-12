import React, { useState } from 'react';
import {
  TextField,
  Button,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Paper,
  Grid,
} from '@mui/material';

const EmpleadosRegistro = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    primerNombre: '',
    segundoNombre: '',
    primerApellido: '',
    segundoApellido: '',
    genero: 'Masculino',
    numeroIdentificacion: '',
    edad: '',
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
    if (typeof onSubmit === 'function') {
      onSubmit(formData);
    }
  };

  return (
    <Paper elevation={3} style={{ maxWidth: 'none', margin: '20px auto', padding: '20px' }}>
      <form onSubmit={handleSubmit}>
        <Typography variant="h5" gutterBottom>
          Registrar nuevos empleados
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Primer Nombre"
              type="text"
              name="primerNombre"
              value={formData.primerNombre}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Segundo Nombre"
              type="text"
              name="segundoNombre"
              value={formData.segundoNombre}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Primer Apellido"
              type="text"
              name="primerApellido"
              value={formData.primerApellido}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Segundo Apellido"
              type="text"
              name="segundoApellido"
              value={formData.segundoApellido}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth margin="normal">
              <InputLabel>Género</InputLabel>
              <Select name="genero" value={formData.genero} onChange={handleChange}>
                <MenuItem value="Masculino">Masculino</MenuItem>
                <MenuItem value="Femenino">Femenino</MenuItem>
                <MenuItem value="Otros">Otros</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Número de Identificación"
              type="text"
              name="numeroIdentificacion"
              value={formData.numeroIdentificacion}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Edad"
              type="text"
              name="edad"
              value={formData.edad}
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
    </Paper>
  );
};

export default EmpleadosRegistro;
