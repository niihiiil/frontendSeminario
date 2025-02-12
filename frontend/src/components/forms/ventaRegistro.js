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
  Box,
  InputAdornment,
  Divider,
  Alert
} from '@mui/material';
import { Add as AddIcon, Remove as RemoveIcon } from '@mui/icons-material';
import apiVentas from '../../api/apiVentas';
import apiProd from '../../api/apiProd';
import apiConfig from '../../api/apiConfig';

const VentaRegistro = ({ onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    employeeId: '',
    clientId: '',
    discountAmount: 0,
    saleBillDetails: [{
      units: '',
      pricePerUnit: '',
      productId: ''
    }]
  });

  const [clientes, setClientes] = useState([]);
  const [empleados, setEmpleados] = useState([]);
  const [inventario, setInventario] = useState([]);
  const [loading, setLoading] = useState(true);
  const [configuracion, setConfiguracion] = useState(null);
  const [metodoPago, setMetodoPago] = useState('NIO'); // NIO o USD
  const [montoPagado, setMontoPagado] = useState('');
  const [vuelto, setVuelto] = useState({ NIO: 0, USD: 0 });
  const [errorPago, setErrorPago] = useState('');

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        const [clientesData, empleadosData, inventarioData] = await Promise.all([
          apiVentas.obtenerClientes(),
          apiVentas.obtenerEmpleados(),
          apiProd.obtenerInventario('Disponible') // Solo productos disponibles
        ]);

        console.log('Clientes cargados:', clientesData);
        console.log('Empleados cargados:', empleadosData);
        console.log('Inventario cargado:', inventarioData);

        setClientes(clientesData);
        setEmpleados(empleadosData);
        setInventario(inventarioData);
      } catch (error) {
        console.error('Error al cargar datos:', error);
      } finally {
        setLoading(false);
      }
    };

    cargarDatos();
  }, []);

  useEffect(() => {
    const cargarConfiguracion = async () => {
      try {
        const config = await apiConfig.obtenerConfiguracion();
        setConfiguracion(config);
      } catch (error) {
        console.error('Error al cargar configuración:', error);
      }
    };
    cargarConfiguracion();
  }, []);

  const handleChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleDetailChange = (index, field, value) => {
    const newDetails = [...formData.saleBillDetails];
    
    if (field === 'productId') {
      const productoSeleccionado = inventario.find(item => item.product.id === value);
      if (productoSeleccionado) {
        newDetails[index] = {
          ...newDetails[index],
          productId: value,
          pricePerUnit: productoSeleccionado.salePrice,
          maxUnits: productoSeleccionado.units // Guardamos las unidades disponibles
        };
      }
    } else {
      newDetails[index] = {
        ...newDetails[index],
        [field]: value
      };
    }

    setFormData(prev => ({
      ...prev,
      saleBillDetails: newDetails
    }));
  };

  const addDetail = () => {
    setFormData(prev => ({
      ...prev,
      saleBillDetails: [...prev.saleBillDetails, {
        units: '',
        pricePerUnit: '',
        productId: ''
      }]
    }));
  };

  const removeDetail = (index) => {
    if (formData.saleBillDetails.length > 1) {
      setFormData(prev => ({
        ...prev,
        saleBillDetails: prev.saleBillDetails.filter((_, i) => i !== index)
      }));
    }
  };

  const calcularTotal = () => {
    const subtotal = formData.saleBillDetails.reduce((sum, detail) => {
      return sum + (Number(detail.units) * Number(detail.pricePerUnit) || 0);
    }, 0);
    
    const descuento = Number(formData.discountAmount) || 0;
    const total = Math.max(subtotal - descuento, 0); // Evitar totales negativos
    
    return total;
  };

  const calcularVuelto = (monto) => {
    if (!monto || !configuracion) return;
    
    const total = calcularTotal();
    let montoEnCordobas;
    
    if (metodoPago === 'USD') {
      montoEnCordobas = parseFloat(monto) * configuracion.dollarPrice;
    } else {
      montoEnCordobas = parseFloat(monto);
    }

    if (montoEnCordobas < total) {
      setErrorPago('El monto pagado es insuficiente');
      setVuelto({ NIO: 0, USD: 0 });
      return;
    }

    const vueltoEnCordobas = montoEnCordobas - total;
    const vueltoEnDolares = vueltoEnCordobas / configuracion.dollarPrice;

    setVuelto({
      NIO: vueltoEnCordobas,
      USD: vueltoEnDolares
    });
    setErrorPago('');
  };

  const handleMontoPagadoChange = (e) => {
    const valor = e.target.value;
    setMontoPagado(valor);
    calcularVuelto(valor);
  };

  const handleMetodoPagoChange = (e) => {
    setMetodoPago(e.target.value);
    setMontoPagado('');
    setVuelto({ NIO: 0, USD: 0 });
    setErrorPago('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (errorPago) {
      return;
    }
    
    const ventaData = {
      employeeId: Number(formData.employeeId),
      clientId: Number(formData.clientId),
      discountAmount: Number(formData.discountAmount),
      saleBillDetails: formData.saleBillDetails.map(detail => ({
        units: Number(detail.units),
        pricePerUnit: Number(detail.pricePerUnit),
        productId: Number(detail.productId)
      }))
    };

    onSubmit(ventaData);
  };

  const formatCurrency = (amount, currency = 'NIO') => {
    return new Intl.NumberFormat('es-NI', {
      style: 'currency',
      currency: currency
    }).format(amount);
  };

  if (loading) {
    return <Typography>Cargando...</Typography>;
  }

  return (
    <Paper elevation={3} sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>
        Registro de Venta
      </Typography>
      
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <FormControl fullWidth required>
              <InputLabel>Cliente</InputLabel>
              <Select
                value={formData.clientId}
                onChange={(e) => handleChange('clientId', e.target.value)}
                label="Cliente"
              >
                {clientes.map((cliente) => (
                  <MenuItem key={cliente.id} value={cliente.id}>
                    {`${cliente.firstName} ${cliente.firstLastName} ${cliente.secondLastName || ''}`}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} md={6}>
            <FormControl fullWidth required>
              <InputLabel>Empleado</InputLabel>
              <Select
                value={formData.employeeId}
                onChange={(e) => handleChange('employeeId', e.target.value)}
                label="Empleado"
              >
                {empleados.map((empleado) => (
                  <MenuItem key={empleado.id} value={empleado.id}>
                    {`${empleado.firstName} ${empleado.firstLastName}`}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Descuento Total"
              type="number"
              value={formData.discountAmount}
              onChange={(e) => handleChange('discountAmount', e.target.value)}
              InputProps={{ inputProps: { min: 0, step: "0.01" } }}
            />
          </Grid>

          {formData.saleBillDetails.map((detail, index) => (
            <Grid container item xs={12} spacing={2} key={index}>
              <Grid item xs={12}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Typography variant="subtitle1">
                    Detalle #{index + 1}
                  </Typography>
                  {formData.saleBillDetails.length > 1 && (
                    <IconButton 
                      color="error" 
                      onClick={() => removeDetail(index)}
                      size="small"
                    >
                      <RemoveIcon />
                    </IconButton>
                  )}
                </Box>
              </Grid>

              <Grid item xs={12} md={4}>
                <FormControl fullWidth required>
                  <InputLabel>Producto</InputLabel>
                  <Select
                    value={detail.productId}
                    onChange={(e) => handleDetailChange(index, 'productId', e.target.value)}
                    label="Producto"
                  >
                    {inventario.map((item) => (
                      <MenuItem 
                        key={item.product.id} 
                        value={item.product.id}
                        disabled={item.units === 0} // Deshabilitar si no hay unidades disponibles
                      >
                        {`${item.product.name} - ${new Intl.NumberFormat('es-NI', {
                          style: 'currency',
                          currency: 'NIO'
                        }).format(item.salePrice)} (${item.units} disponibles)`}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  label="Unidades"
                  type="number"
                  value={detail.units}
                  onChange={(e) => handleDetailChange(index, 'units', e.target.value)}
                  required
                  InputProps={{ 
                    inputProps: { 
                      min: 1,
                      max: inventario.find(item => item.product.id === detail.productId)?.units || 1
                    } 
                  }}
                  helperText={`Máximo: ${inventario.find(item => item.product.id === detail.productId)?.units || 0} unidades`}
                />
              </Grid>

              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  label="Precio por Unidad"
                  type="number"
                  value={detail.pricePerUnit}
                  disabled
                  InputProps={{ 
                    inputProps: { min: 0, step: "0.01" },
                    readOnly: true
                  }}
                  helperText="Precio fijo del inventario"
                />
              </Grid>
            </Grid>
          ))}

          <Grid item xs={12}>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Button
                startIcon={<AddIcon />}
                onClick={addDetail}
                variant="outlined"
              >
                Agregar Producto
              </Button>
              <Button
                type="submit"
                variant="contained"
                color="primary"
              >
                Registrar Venta
              </Button>
              {onCancel && (
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={onCancel}
                >
                  Cancelar
                </Button>
              )}
            </Box>
          </Grid>
        </Grid>

        <Divider sx={{ my: 3 }} />
        
        <Typography variant="h6" gutterBottom>
          Información de Pago
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Alert severity="info">
              Total a pagar: {formatCurrency(calcularTotal())}
            </Alert>
          </Grid>

          <Grid item xs={12} md={4}>
            <FormControl fullWidth>
              <InputLabel>Método de Pago</InputLabel>
              <Select
                value={metodoPago}
                onChange={handleMetodoPagoChange}
                label="Método de Pago"
              >
                <MenuItem value="NIO">Córdobas (C$)</MenuItem>
                <MenuItem value="USD">Dólares (US$)</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              label="Monto Recibido"
              type="number"
              value={montoPagado}
              onChange={handleMontoPagadoChange}
              required
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    {metodoPago === 'USD' ? '$' : 'C$'}
                  </InputAdornment>
                ),
                inputProps: { 
                  min: 0, 
                  step: "0.01",
                  // Establecer el mínimo según el método de pago
                  min: metodoPago === 'USD' ? 
                    (calcularTotal() / (configuracion?.dollarPrice || 1)) : 
                    calcularTotal()
                }
              }}
              error={!!errorPago}
              helperText={errorPago || `Mínimo: ${formatCurrency(
                metodoPago === 'USD' ? 
                  (calcularTotal() / (configuracion?.dollarPrice || 1)) : 
                  calcularTotal(),
                metodoPago
              )}`}
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <Paper 
              elevation={2} 
              sx={{ 
                p: 2, 
                bgcolor: 'background.default',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center'
              }}
            >
              <Typography variant="subtitle2" gutterBottom>
                Vuelto:
              </Typography>
              <Typography variant="h6" color="primary">
                {formatCurrency(vuelto.NIO)}
              </Typography>
              {metodoPago === 'USD' && (
                <Typography variant="body2" color="text.secondary">
                  ({formatCurrency(vuelto.USD, 'USD')})
                </Typography>
              )}
            </Paper>
          </Grid>

          {configuracion && (
            <Grid item xs={12}>
              <Alert severity="info">
                Tipo de cambio actual: 1 USD = {formatCurrency(configuracion.dollarPrice)}
              </Alert>
            </Grid>
          )}
        </Grid>
      </form>
    </Paper>
  );
};

export default VentaRegistro;
