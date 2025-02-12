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

const PedidoRegistro = ({ 
  isEditing = false, 
  initialData = null,
  proveedores = [],
  empleados = [],
  productos = [],
  onSubmit, 
  onCancel 
}) => {
  const [formData, setFormData] = useState(
    initialData || {
      suplierId: '',
      employeeId: '',
      details: [{
        units: '',
        pricePerUnit: '',
        discountAmount: '',
        ivaAmount: '',
        isBonus: false,
        productId: ''
      }]
    }
  );

  const handleChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
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
        units: '',
        pricePerUnit: '',
        discountAmount: '',
        ivaAmount: '',
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
    
    const pedidoData = {
      ...(isEditing && { id: initialData.id }), // Incluir ID solo si es edición
      suplierId: Number(formData.suplierId),
      employeeId: Number(formData.employeeId),
      details: formData.details.map(detail => ({
        ...(isEditing && { id: detail.id }), // Incluir ID del detalle si es edición
        units: Number(detail.units),
        pricePerUnit: Number(detail.pricePerUnit),
        discountAmount: Number(detail.discountAmount || 0),
        ivaAmount: Number(detail.ivaAmount || 0),
        isBonus: Boolean(detail.isBonus),
        productId: Number(detail.productId)
      }))
    };

    onSubmit(pedidoData);
  };

  return (
    <Paper elevation={3} sx={{ p: 3, m: 2 }}>
      <Typography variant="h6" gutterBottom>
        Registro de Compra
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel>Proveedor</InputLabel>
              <Select
                value={formData.suplierId}
                onChange={(e) => handleChange('suplierId', e.target.value)}
                label="Proveedor"
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
                value={formData.employeeId}
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
                    label="Producto"
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
                  onChange={(e) => handleDetailChange(index, 'units', e.target.value)}
                  required
                />
              </Grid>

              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  label="Precio por Unidad"
                  type="number"
                  value={detail.pricePerUnit}
                  onChange={(e) => handleDetailChange(index, 'pricePerUnit', e.target.value)}
                  required
                />
              </Grid>

              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  label="Descuento"
                  type="number"
                  value={detail.discountAmount}
                  onChange={(e) => handleDetailChange(index, 'discountAmount', e.target.value)}
                />
              </Grid>

              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  label="IVA"
                  type="number"
                  value={detail.ivaAmount}
                  onChange={(e) => handleDetailChange(index, 'ivaAmount', e.target.value)}
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
              Registrar Compra
            </Button>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
};

export default PedidoRegistro; 