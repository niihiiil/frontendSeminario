import React, { useState } from 'react';
import {
  TextField,
  Button,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';

const FormularioEmpleados = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    genero: 'Masculino',
    cedula: '',
    fechaNacimiento: '',
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
        Registrar nuevos empleados
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
      <FormControl fullWidth margin="normal">
        <InputLabel>Género</InputLabel>
        <Select name="genero" value={formData.genero} onChange={handleChange}>
          <MenuItem value="Masculino">Masculino</MenuItem>
          <MenuItem value="Femenino">Femenino</MenuItem>
          <MenuItem value="Otros">Otros</MenuItem>
        </Select>
      </FormControl>
      <TextField
        label="Cédula"
        type="text"
        name="cedula"
        value={formData.cedula}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Fecha de Nacimiento"
        type="date"
        name="fechaNacimiento"
        value={formData.fechaNacimiento}
        onChange={handleChange}
        fullWidth
        margin="normal"
        InputLabelProps={{ shrink: true }}
      />
      <br />
      <Button variant="contained" color="primary" type="submit">
        Registrar
      </Button>
    </form>
  );
};

export default FormularioEmpleados;
