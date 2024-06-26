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
} from '@mui/material';


const ClientesRegistro = ({ onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    nombre: '',
    segundoNombre: '',
    apellidoPaterno: '',
    apellidoMaterno: '',
    numeroIdentificacion: '',
    candidatoCredito: true,
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
        Registrar nuevos clientes
      </Typography>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit(formData);
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
            <TextField
              label="Nombre"
              type="text"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
          </Grid>
          <Grid item xs={12} sm={4}>
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
          <Grid item xs={12} sm={4}>
            <TextField
              label="Apellido Paterno"
              type="text"
              name="apellidoPaterno"
              value={formData.apellidoPaterno}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              label="Apellido Materno"
              type="text"
              name="apellidoMaterno"
              value={formData.apellidoMaterno}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              label="Número Identificación"
              type="text"
              name="numeroIdentificacion"
              value={formData.numeroIdentificacion}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <FormControl fullWidth margin="normal">
              <InputLabel>Candidato a Crédito</InputLabel>
              <Select
                name="candidatoCredito"
                value={formData.candidatoCredito}
                onChange={handleChange}
              >
                <MenuItem value={true}>Sí</MenuItem>
                <MenuItem value={false}>No</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
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

export default ClientesRegistro;
