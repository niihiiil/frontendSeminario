import React, { useState } from 'react';
import {
  TextField,
  Button,
  Typography,
  Paper,
} from '@mui/material';


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

  return (
    <Paper elevation={3} style={{ maxWidth: 'none', margin: '20px auto', padding: '20px' }}>
      <Typography variant="h5" gutterBottom>
        Registrar nuevos proveedores
      </Typography>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit(formData);
        }}
      >
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
