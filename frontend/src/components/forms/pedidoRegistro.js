import React, { useState, useEffect } from 'react';
import {
  TextField,
  Button,
  Typography,
  Paper,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
  FormControlLabel,
  Checkbox,
} from '@mui/material';
import { Add as AddIcon, Remove as RemoveIcon } from '@mui/icons-material';

const PedidoRegistro = ({ proveedores, empleados, productos, onSubmit }) => {
  const [formData, setFormData] = useState({
    suplierId: '',
    employeeId: '',
    details: [
      {
        units: 0,
        pricePerUnit: 0,
        discountAmount: 0,
        ivaAmount: 0,
        isBonus: false,
        productId: ''
      }
    ]
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleDetailChange = (index, field, value) => {
    const newDetails = [...formData.details];
    newDetails[index] = {
      ...newDetails[index],
      [field]: value
    };
    setFormData(prev => ({
      ...prev,
      details: newDetails
    }));
  };

  const addDetail = () => {
    setFormData(prev => ({
      ...prev,
      details: [...prev.details, {
        units: 0,
        pricePerUnit: 0,
        discountAmount: 0,
        ivaAmount: 0,
        isBonus: false,
        productId: ''
      }]
    }));
  };

  const removeDetail = (index) => {
    if (formData.details.length > 1) {
      const newDetails = formData.details.filter((_, i) => i !== index);
      setFormData(prev => ({
        ...prev,
        details: newDetails
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Paper elevation={3} sx={{ p: 3, m: 2 }}>
      <Typography variant="h6" gutterBottom>
        Registro de Pedido
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel>Proveedor</InputLabel>
              <Select
                name="suplierId"
                value={formData.suplierId}
                onChange={handleChange}
                required
              >
                {proveedores.map((proveedor) => (
                  <MenuItem key={proveedor.id} value={proveedor.id}>
                    {proveedor.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel>Empleado</InputLabel>
              <Select
                value={formData.employeeId || ''}
                onChange={(e) => handleChange('employeeId', e.target.value)}
                label="Empleado"
                required
              >
                {empleados.map((empleado) => (
                  <MenuItem key={empleado.id} value={empleado.id}>
                    {`${empleado.firstName} ${empleado.firstLastName}`}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          {formData.details.map((detail, index) => (
            <Grid container item xs={12} spacing={2} key={index}>
              <Grid item xs={12}>
                <Typography variant="subtitle1">
                  Detalle #{index + 1}
                  {formData.details.length > 1 && (
                    <IconButton 
                      color="error" 
                      onClick={() => removeDetail(index)}
                      size="small"
                    >
                      <RemoveIcon />
                    </IconButton>
                  )}
                </Typography>
              </Grid>

              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <InputLabel>Producto</InputLabel>
                  <Select
                    value={detail.productId}
                    onChange={(e) => handleDetailChange(index, 'productId', e.target.value)}
                    required
                  >
                    {productos.map((producto) => (
                      <MenuItem key={producto.id} value={producto.id}>
                        {producto.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Unidades"
                  type="number"
                  value={detail.units}
                  onChange={(e) => handleDetailChange(index, 'units', parseInt(e.target.value))}
                  required
                />
              </Grid>

              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  label="Precio por Unidad"
                  type="number"
                  value={detail.pricePerUnit}
                  onChange={(e) => handleDetailChange(index, 'pricePerUnit', parseFloat(e.target.value))}
                  required
                />
              </Grid>

              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  label="Descuento"
                  type="number"
                  value={detail.discountAmount}
                  onChange={(e) => handleDetailChange(index, 'discountAmount', parseFloat(e.target.value))}
                />
              </Grid>

              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  label="IVA"
                  type="number"
                  value={detail.ivaAmount}
                  onChange={(e) => handleDetailChange(index, 'ivaAmount', parseFloat(e.target.value))}
                />
              </Grid>

              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={detail.isBonus}
                      onChange={(e) => handleDetailChange(index, 'isBonus', e.target.checked)}
                    />
                  }
                  label="Es bonificación"
                />
              </Grid>
            </Grid>
          ))}

          <Grid item xs={12}>
            <Button
              startIcon={<AddIcon />}
              onClick={addDetail}
              variant="outlined"
              sx={{ mr: 1 }}
            >
              Agregar Detalle
            </Button>
            <Button
              type="submit"
              variant="contained"
              color="primary"
            >
              Registrar Pedido
            </Button>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
};

export default PedidoRegistro; 