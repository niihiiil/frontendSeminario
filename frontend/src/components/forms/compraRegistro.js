import React, { useState } from 'react';
import { TextField, Button, Typography, Paper, Box, Grid, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const FormularioCompras = ({ onSubmit }) => {
  const [compraData, setCompraData] = useState({
    fecha: '',
    proveedor: '',
    idEmpleado: '',
    subtotal: '',
    iva: '',
    descuento: '',
    total: '',
    detallesCompra: [],
  });

  const handleCompraChange = (e) => {
    const { name, value } = e.target;
    setCompraData({
      ...compraData,
      [name]: value,
    });
  };

  const handleDetallesChange = (index, e) => {
    const { name, value } = e.target;
    const detallesCompra = [...compraData.detallesCompra];
    detallesCompra[index][name] = value;

    setCompraData({
      ...compraData,
      detallesCompra,
    });
  };

  const handleDetallesAdd = () => {
    setCompraData({
      ...compraData,
      detallesCompra: [...compraData.detallesCompra, { cantidad: '', precioCompra: '', descuento: '', iva: '', precioFinal: '', idCompra: '' }],
    });
  };

  const handleDetallesRemove = (index) => {
    const detallesCompra = [...compraData.detallesCompra];
    detallesCompra.splice(index, 1);

    setCompraData({
      ...compraData,
      detallesCompra,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(compraData);
  };

  return (
    <Paper elevation={3} style={{ maxWidth: '800px', margin: 'auto', padding: '20px', marginTop: '20px' }}>
      <Box display="flex" flexDirection="column" alignItems="center">
        <Typography variant="h5" gutterBottom>
          Registrar nueva compra
        </Typography>
        <form onSubmit={handleSubmit} style={{ width: '100%' }}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                label="Fecha"
                type="date"
                name="fecha"
                value={compraData.fecha}
                onChange={handleCompraChange}
                fullWidth
                margin="normal"
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Proveedor"
                type="text"
                name="proveedor"
                value={compraData.proveedor}
                onChange={handleCompraChange}
                fullWidth
                margin="normal"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Identificador de Empleado"
                type="text"
                name="idEmpleado"
                value={compraData.idEmpleado}
                onChange={handleCompraChange}
                fullWidth
                margin="normal"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Subtotal"
                type="text"
                name="subtotal"
                value={compraData.subtotal}
                onChange={handleCompraChange}
                fullWidth
                margin="normal"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Descuento"
                type="text"
                name="descuento"
                value={compraData.descuento}
                onChange={handleCompraChange}
                fullWidth
                margin="normal"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="IVA"
                type="text"
                name="iva"
                value={compraData.iva}
                onChange={handleCompraChange}
                fullWidth
                margin="normal"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Total"
                type="text"
                name="total"
                value={compraData.total}
                onChange={handleCompraChange}
                fullWidth
                margin="normal"
              />
            </Grid>
          </Grid>

          {/* Detalles de compra */}
          <Typography variant="h6" gutterBottom style={{ marginTop: '20px' }}>
            Detalles de compra
          </Typography>
          {compraData.detallesCompra.map((detalle, index) => (
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
                  label="Precio de Compra"
                  type="text"
                  name="precioCompra"
                  value={detalle.precioCompra}
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
                <TextField
                  label="Identificador de Compra"
                  type="text"
                  name="idCompra"
                  value={detalle.idCompra}
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
            Registrar Compra
          </Button>
        </form>
      </Box>
    </Paper>
  );
};

export default FormularioCompras;
