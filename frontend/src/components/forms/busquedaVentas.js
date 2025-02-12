import React, { useState } from 'react';
import { 
  Paper,
  Grid,
  TextField,
  Button,
  Box
} from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';

const BusquedaVentas = ({ onBuscar }) => {
  const [fechaInicio, setFechaInicio] = useState(new Date().toISOString().split('T')[0]);
  const [fechaFin, setFechaFin] = useState(new Date().toISOString().split('T')[0]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onBuscar({
      fechaInicio: new Date(fechaInicio),
      fechaFin: new Date(fechaFin)
    });
  };

  return (
    <Paper sx={{ p: 2, mb: 2 }}>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label="Fecha Inicio"
              type="date"
              value={fechaInicio}
              onChange={(e) => setFechaInicio(e.target.value)}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label="Fecha Fin"
              type="date"
              value={fechaFin}
              onChange={(e) => setFechaFin(e.target.value)}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Button
                type="submit"
                variant="contained"
                startIcon={<SearchIcon />}
                fullWidth
              >
                Buscar
              </Button>
              <Button
                variant="outlined"
                onClick={() => {
                  const hoy = new Date();
                  const fechaHoy = hoy.toISOString().split('T')[0];
                  setFechaInicio(fechaHoy);
                  setFechaFin(fechaHoy);
                  onBuscar({ fechaInicio: hoy, fechaFin: hoy });
                }}
              >
                Hoy
              </Button>
            </Box>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
};

export default BusquedaVentas; 