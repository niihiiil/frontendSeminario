import React, { useState } from 'react';
import {
  TextField,
  Button,
  Typography,
  Paper,
  Alert,
} from '@mui/material';

const ProveedoresRegistro = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    nombre: '',
    numeroRUC: ''
  });
  const [mensaje, setMensaje] = useState({ tipo: '', texto: '' });

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
      await onSubmit(formData);
      setFormData({ nombre: '', numeroRUC: '' }); // Limpiar formulario
    } catch (error) {
      console.error('Error al registrar proveedor:', error);
    }
  };

  return (
    <Paper elevation={3} style={{ maxWidth: 'none', margin: '20px auto', padding: '20px' }}>
      <Typography variant="h5" gutterBottom>
        Registrar nuevos proveedores
      </Typography>

      <form onSubmit={handleSubmit}>
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
          style={{ marginTop: '10px' }}
        >
          Registrar
        </Button>
      </form>
    </Paper>
  );
};

export default ProveedoresRegistro;
