import React, { useState } from 'react';
import {
  Paper,
  TextField,
  Button,
  Grid,
  Box,
  Typography,
  FormControl,
  FormControlLabel,
  RadioGroup,
  Radio
} from '@mui/material';

const BusquedaCompras = ({ onBuscar }) => {
  const [tipoBusqueda, setTipoBusqueda] = useState('hoy');
  const [fechaInicio, setFechaInicio] = useState(
    new Date().toISOString().slice(0, 16)
  );
  const [fechaFin, setFechaFin] = useState(
    new Date().toISOString().slice(0, 16)
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    if (tipoBusqueda === 'hoy') {
      const hoy = new Date();
      // Configurar inicio del día (00:00:00)
      const inicioDia = new Date(hoy.setHours(0, 0, 0, 0));
      // Configurar fin del día (23:59:59)
      const finDia = new Date(hoy.setHours(23, 59, 59, 999));
      
      onBuscar({ 
        fechaInicio: inicioDia,
        fechaFin: finDia
      });
    } else {
      onBuscar({ 
        fechaInicio: new Date(fechaInicio), 
        fechaFin: new Date(fechaFin) 
      });
    }
  };

  const handleLimpiar = () => {
    setFechaInicio(new Date().toISOString().slice(0, 16));
    setFechaFin(new Date().toISOString().slice(0, 16));
    setTipoBusqueda('hoy');
    
    // Al limpiar, mostrar datos del día actual
    const hoy = new Date();
    const inicioDia = new Date(hoy.setHours(0, 0, 0, 0));
    const finDia = new Date(hoy.setHours(23, 59, 59, 999));
    onBuscar({ 
      fechaInicio: inicioDia,
      fechaFin: finDia
    });
  };

  return (
    <Paper sx={{ p: 2, mb: 2 }}>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12}>
            <Typography variant="subtitle1" gutterBottom>
              Búsqueda de Compras
            </Typography>
            <FormControl component="fieldset">
              <RadioGroup
                row
                value={tipoBusqueda}
                onChange={(e) => setTipoBusqueda(e.target.value)}
              >
                <FormControlLabel 
                  value="hoy" 
                  control={<Radio />} 
                  label="Día Actual" 
                />
                <FormControlLabel 
                  value="rango" 
                  control={<Radio />} 
                  label="Por Rango de Fechas"
                />
              </RadioGroup>
            </FormControl>
          </Grid>
          
          {tipoBusqueda === 'rango' && (
            <Grid item xs={12} md={11}>
              <Box sx={{ display: 'flex', gap: 2 }}>
                <TextField
                  label="Fecha Inicio"
                  type="datetime-local"
                  value={fechaInicio}
                  onChange={(e) => setFechaInicio(e.target.value)}
                  fullWidth
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
                <TextField
                  label="Fecha Fin"
                  type="datetime-local"
                  value={fechaFin}
                  onChange={(e) => setFechaFin(e.target.value)}
                  fullWidth
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Box>
            </Grid>
          )}

          <Grid item xs={12} md={tipoBusqueda === 'rango' ? 1 : 12}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Button 
                variant="contained" 
                type="submit"
                fullWidth
              >
                {tipoBusqueda === 'hoy' ? 'Buscar Compras de Hoy' : 'Buscar'}
              </Button>
              <Button 
                variant="outlined" 
                onClick={handleLimpiar}
                fullWidth
              >
                Limpiar
              </Button>
            </Box>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
};

export default BusquedaCompras; 