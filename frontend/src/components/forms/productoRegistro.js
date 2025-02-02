import React, { useState } from 'react';
import {
  TextField,
  Button,
  Typography,
  Paper,
  Grid,
  FormControlLabel,
  Checkbox,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';

const ProductosRegistro = ({ categorias, marcas, onSubmit }) => {
  const [formData, setFormData] = useState({
    nombre: '',
    descripcion: '',
    isPack: false,
    categoriaId: '',
    marcaId: '',
    productoEnPackId: '',
    unidadesPack: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleCheckboxChange = (e) => {
    setFormData({
      ...formData,
      isPack: e.target.checked,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await onSubmit(formData);
      setFormData({
        nombre: '',
        descripcion: '',
        isPack: false,
        categoriaId: '',
        marcaId: '',
        productoEnPackId: '',
        unidadesPack: ''
      });
    } catch (error) {
      console.error('Error al registrar producto:', error);
    }
  };

  return (
    <Paper elevation={3} style={{ maxWidth: 'none', margin: '20px auto', padding: '20px' }}>
      <Typography variant="h5" gutterBottom>
        Registrar nuevo producto
      </Typography>

      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          {/* Primera fila */}
          <Grid item xs={12} md={6}>
            <TextField
              label="Nombre del producto"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={formData.isPack}
                  onChange={handleCheckboxChange}
                  name="isPack"
                />
              }
              label="Es paquete"
              style={{ marginTop: '15px' }}
            />
          </Grid>

          {/* Segunda fila */}
          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel>Categoría</InputLabel>
              <Select
                name="categoriaId"
                value={formData.categoriaId}
                onChange={handleChange}
                required
              >
                {categorias.map((categoria) => (
                  <MenuItem key={categoria.id} value={categoria.id}>
                    {categoria.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel>Marca</InputLabel>
              <Select
                name="marcaId"
                value={formData.marcaId}
                onChange={handleChange}
                required
              >
                {marcas.map((marca) => (
                  <MenuItem key={marca.id} value={marca.id}>
                    {marca.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          {/* Tercera fila - Descripción que abarca todo el ancho */}
          <Grid item xs={12}>
            <TextField
              label="Descripción"
              name="descripcion"
              value={formData.descripcion}
              onChange={handleChange}
              fullWidth
              multiline
              rows={3}
              required
            />
          </Grid>

          {/* Campos adicionales que aparecen solo si es paquete */}
          {formData.isPack && (
            <>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Unidades en paquete"
                  name="unidadesPack"
                  type="number"
                  value={formData.unidadesPack}
                  onChange={handleChange}
                  fullWidth
                  required={formData.isPack}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <InputLabel>Producto en paquete</InputLabel>
                  <Select
                    name="productoEnPackId"
                    value={formData.productoEnPackId}
                    onChange={handleChange}
                    required={formData.isPack}
                  >
                    {/* Aquí deberías mapear los productos disponibles */}
                  </Select>
                </FormControl>
              </Grid>
            </>
          )}

          {/* Botón de submit */}
          <Grid item xs={12}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              style={{ marginTop: '20px' }}
            >
              Registrar Producto
            </Button>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
};

export default ProductosRegistro;