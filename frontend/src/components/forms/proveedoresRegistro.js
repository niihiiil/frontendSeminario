import React, { useState } from 'react';
import {
  TextField,
  Button,
  Typography,
  Paper,
} from '@mui/material';
import apiCompras from '../../api/apiCompras';

const ProveedoresRegistro = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    nombre: '',
    numeroRUC: ''
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
      const response = await apiCompras.agregarProveedor({
        name: formData.nombre,
        ruccode: formData.numeroRUC,
      });

      console.log('Proveedor registrado exitosamente:', response);

      onSubmit(formData);
    } catch (error) {
      console.error('Error al agregar proveedor:', error.message);
    }
  };

  return (
    <Paper elevation={3} style={{ maxWidth: 'none', margin: '20px auto', padding: '20px' }}>
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
        style={{ marginBottom: '10px' }}
      />
      <TextField
        label="Número RUC"
        type="text"
        name="numeroRUC"
        value={formData.numeroRUC}
        onChange={handleChange}
        fullWidth
        margin="normal"
        style={{ marginBottom: '10px' }}
      />
      <Button
        variant="contained"
        color="primary"
        type="submit"
        onClick={handleSubmit}
        style={{ marginTop: '10px' }}
      >
        Registrar
      </Button>
    </Paper>
  );
};

export default ProveedoresRegistro;