import React, { useState } from 'react';
import {
  TextField,
  Button,
  Typography,
  Paper,
  FormControlLabel,
  Checkbox,
} from '@mui/material';

const ProductoRegistro = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    isPack: false,
    productCategoryId: 0,
    brandId: 0,
    productInPackId: 0,
    packUnits: 0
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  return (
    <Paper elevation={3} style={{ maxWidth: 'none', margin: '20px auto', padding: '20px' }}>
      <Typography variant="h5" gutterBottom>
        Registrar nuevo producto
      </Typography>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit(formData);
        }}
      >
        <TextField
          label="Nombre del producto"
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          fullWidth
          margin="normal"
          style={{ marginBottom: '10px' }}
        />
        <TextField
          label="Descripción"
          type="text"
          name="description"
          value={formData.description}
          onChange={handleChange}
          fullWidth
          margin="normal"
          multiline
          rows={3}
          style={{ marginBottom: '10px' }}
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={formData.isPack}
              onChange={handleChange}
              name="isPack"
            />
          }
          label="¿Es un pack?"
          style={{ marginBottom: '10px' }}
        />
        <TextField
          label="Categoría ID"
          type="number"
          name="productCategoryId"
          value={formData.productCategoryId}
          onChange={handleChange}
          fullWidth
          margin="normal"
          style={{ marginBottom: '10px' }}
        />
        <TextField
          label="Marca ID"
          type="number"
          name="brandId"
          value={formData.brandId}
          onChange={handleChange}
          fullWidth
          margin="normal"
          style={{ marginBottom: '10px' }}
        />
        {formData.isPack && (
          <>
            <TextField
              label="ID del producto en el pack"
              type="number"
              name="productInPackId"
              value={formData.productInPackId}
              onChange={handleChange}
              fullWidth
              margin="normal"
              style={{ marginBottom: '10px' }}
            />
            <TextField
              label="Unidades en el pack"
              type="number"
              name="packUnits"
              value={formData.packUnits}
              onChange={handleChange}
              fullWidth
              margin="normal"
              style={{ marginBottom: '10px' }}
            />
          </>
        )}
        <Button
          variant="contained"
          color="primary"
          type="submit"
          style={{ marginTop: '10px' }}
        >
          Registrar Producto
        </Button>
      </form>
    </Paper>
  );
};

export default ProductoRegistro;