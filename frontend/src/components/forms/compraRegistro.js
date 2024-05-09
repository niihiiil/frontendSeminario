import React, { useState } from 'react';
import {
  TextField,
  Button,
  Typography,
  Paper,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Grid,
  FormControlLabel,
  Radio,
  RadioGroup,
} from '@mui/material';

const FormularioCompras = ({ onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    distribuidor: '',
    fechaHora: '',
    empleado: '',
    conIva: 'sinIva',
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
        Detalle de Compra
      </Typography>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit(formData);
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
            <FormControl fullWidth margin="normal">
              <InputLabel>Distribuidor</InputLabel>
              <Select
                name="distribuidor"
                value={formData.distribuidor}
                onChange={handleChange}
              >
                {/* Opciones de distribuidor */}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              label="Fecha y Hora"
              type="datetime-local"
              name="fechaHora"
              value={formData.fechaHora}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <FormControl fullWidth margin="normal">
              <InputLabel>Empleado</InputLabel>
              <Select
                name="empleado"
                value={formData.empleado}
                onChange={handleChange}
              >
                {/* Opciones de empleado */}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={4}>
            <FormControl component="fieldset" fullWidth margin="normal">
              <RadioGroup
                aria-label="conIva"
                name="conIva"
                value={formData.conIva}
                onChange={handleChange}
                row
              >
                <FormControlLabel value="conIva" control={<Radio />} label="Con IVA" />
                <FormControlLabel value="sinIva" control={<Radio />} label="Sin IVA" />
              </RadioGroup>
            </FormControl>
          </Grid>
        </Grid>
        <Button
          variant="contained"
          color="primary"
          type="submit"
          style={{ marginTop: '10px' }}
        >
          Detalle de Compra
        </Button>
      </form>
    </Paper>
  );
};

export default FormularioCompras;
