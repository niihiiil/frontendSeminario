import React, { useState } from 'react';
import { TextField, Button, Typography, Paper, Box, Grid, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const FormularioVentas = ({ onSubmit }) => {
  const [ventaData, setVentaData] = useState({
    fecha: '',
    idEmpleado: '',
    idCliente: '',
    tipoCompra: '',
    subtotal: '',
    descuento: '',
    iva: '',
    total: '',
    detallesVenta: [],
  });

  const handleVentaChange = (e) => {
    const { name, value } = e.target;
    setVentaData({
      ...ventaData,
      [name]: value,
    });
  };

  const handleDetallesChange = (index, e) => {
    const { name, value } = e.target;
    const detallesVenta = [...ventaData.detallesVenta];
    detallesVenta[index][name] = value;

    setVentaData({
      ...ventaData,
      detallesVenta,
    });
  };

  const handleDetallesAdd = () => {
    setVentaData({
      ...ventaData,
      detallesVenta: [...ventaData.detallesVenta, { producto: '', cantidad: '', precioVenta: '', descuento: '', iva: '', precioFinal: '' }],
    });
  };

  const handleDetallesRemove = (index) => {
    const detallesVenta = [...ventaData.detallesVenta];
    detallesVenta.splice(index, 1);

    setVentaData({
      ...ventaData,
      detallesVenta,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(ventaData);
  };

  return (
    <Paper elevation={3} style={{ maxWidth: '800px', margin: 'auto', padding: '20px', marginTop: '20px' }}>
      <Box display="flex" flexDirection="column" alignItems="center">
        <Typography variant="h5" gutterBottom>
          Registrar nueva venta
        </Typography>
        <form onSubmit={handleSubmit} style={{ width: '100%' }}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                label="Fecha"
                type="date"
                name="fecha"
                value={ventaData.fecha}
                onChange={handleVentaChange}
                fullWidth
                margin="normal"
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Identificador de Empleado"
                type="text"
                name="idEmpleado"
                value={ventaData.idEmpleado}
                onChange={handleVentaChange}
                fullWidth
                margin="normal"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Identificador de Cliente"
                type="text"
                name="idCliente"
                value={ventaData.idCliente}
                onChange={handleVentaChange}
                fullWidth
                margin="normal"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Tipo de Compra"
                type="text"
                name="tipoCompra"
                value={ventaData.tipoCompra}
                onChange={handleVentaChange}
                fullWidth
                margin="normal"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Subtotal"
                type="text"
                name="subtotal"
                value={ventaData.subtotal}
                onChange={handleVentaChange}
                fullWidth
                margin="normal"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Descuento"
                type="text"
                name="descuento"
                value={ventaData.descuento}
                onChange={handleVentaChange}
                fullWidth
                margin="normal"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="IVA"
                type="text"
                name="iva"
                value={ventaData.iva}
                onChange={handleVentaChange}
                fullWidth
                margin="normal"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Total"
                type="text"
                name="total"
                value={ventaData.total}
                onChange={handleVentaChange}
                fullWidth
                margin="normal"
              />
            </Grid>
          </Grid>

          {/* Detalles de venta */}
          <Typography variant="h6" gutterBottom style={{ marginTop: '20px' }}>
            Detalles de venta
          </Typography>
          {ventaData.detallesVenta.map((detalle, index) => (
            <Grid container spacing={2} key={index}>
              <Grid item xs={12}>
                <TextField
                  label="Producto"
                  type="text"
                  name="producto"
                  value={detalle.producto}
                  onChange={(e) => handleDetallesChange(index, e)}
                  fullWidth
                  margin="normal"
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  label="Cantidad"
                  type="text"
                  name="cantidad"
                  value={detalle.cantidad}
                  onChange={(e) => handleDetallesChange(index, e)}
                  fullWidth
                  margin="normal"
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  label="Precio de Venta"
                  type="text"
                  name="precioVenta"
                  value={detalle.precioVenta}
                  onChange={(e) => handleDetallesChange(index, e)}
                  fullWidth
                  margin="normal"
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  label="Descuento"
                  type="text"
                  name="descuento"
                  value={detalle.descuento}
                  onChange={(e) => handleDetallesChange(index, e)}
                  fullWidth
                  margin="normal"
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  label="IVA"
                  type="text"
                  name="iva"
                  value={detalle.iva}
                  onChange={(e) => handleDetallesChange(index, e)}
                  fullWidth
                  margin="normal"
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  label="Precio Final"
                  type="text"
                  name="precioFinal"
                  value={detalle.precioFinal}
                  onChange={(e) => handleDetallesChange(index, e)}
                  fullWidth
                  margin="normal"
                />
              </Grid>
              <Grid item xs={4}>
                <IconButton onClick={() => handleDetallesRemove(index)}>
                  <DeleteIcon />
                </IconButton>
              </Grid>
            </Grid>
          ))}
          <Button variant="contained" color="primary" onClick={handleDetallesAdd} style={{ marginTop: '10px' }}>
            Agregar Detalle
          </Button>

          <br />
          <Button variant="contained" color="primary" type="submit" style={{ marginTop: '20px' }}>
            Registrar Venta
          </Button>
        </form>
      </Box>
    </Paper>
  );
};

export default FormularioVentas;
