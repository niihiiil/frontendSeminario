import React, { useState } from 'react';
import { TextField, Button, Typography, Paper, Box, Grid } from '@mui/material';

const MarcaRegistro = ({ onSubmit }) => {
  const [marcaData, setMarcaData] = useState({
    name: '',
    description: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMarcaData({
      ...marcaData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(marcaData);
  };

  return (
    <Paper elevation={3} style={{ maxWidth: '800px', margin: 'auto', padding: '20px', marginTop: '20px' }}>
      <Box display="flex" flexDirection="column" alignItems="center">
        <Typography variant="h5" gutterBottom>
          Registrar nueva marca
        </Typography>
        <form onSubmit={handleSubmit} style={{ width: '100%' }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Nombre"
                type="text"
                name="name"
                value={marcaData.name}
                onChange={handleChange}
                fullWidth
                margin="normal"
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Descripción"
                type="text"
                name="description"
                value={marcaData.description}
                onChange={handleChange}
                fullWidth
                margin="normal"
                multiline
                rows={4}
                required
              />
            </Grid>
          </Grid>

          <Button 
            variant="contained" 
            color="primary" 
            type="submit" 
            style={{ marginTop: '20px' }}
            fullWidth
          >
            Registrar Marca
          </Button>
        </form>
      </Box>
    </Paper>
  );
};

export default MarcaRegistro;
