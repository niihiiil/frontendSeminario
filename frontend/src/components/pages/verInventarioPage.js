import React, { useState, useEffect } from 'react';
import MainPageContainer from '../layout/mainpagecontainer';
import {
  Typography,
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tabs,
  Tab,
  Chip,
  CircularProgress,
  Tooltip
} from '@mui/material';
import apiProd from '../../api/apiProd';
import EntityClass from '../../api/entityClass';

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
};

const VerInventarioPage = () => {
  const [inventarioDisponible, setInventarioDisponible] = useState([]);
  const [inventarioBaja, setInventarioBaja] = useState([]);
  const [inventarioVendido, setInventarioVendido] = useState([]);
  const [tabValue, setTabValue] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const cargarInventario = async () => {
      setIsLoading(true);
      try {
        const [disponible, baja] = await Promise.all([
          apiProd.obtenerInventario(EntityClass.estados.DISPONIBLE),
          apiProd.obtenerInventario(EntityClass.estados.DADO_DE_BAJA)
        ]);

        setInventarioDisponible(disponible || []);
        setInventarioBaja(baja || []);
        setInventarioVendido([]); // Este estado no está implementado aún
      } catch (error) {
        console.error('Error al cargar inventario:', error);
      } finally {
        setIsLoading(false);
      }
    };

    cargarInventario();
  }, []);

  const handleChangeTab = (event, newValue) => {
    setTabValue(newValue);
  };

  const getInventarioPorTab = (tabIndex) => {
    switch (tabIndex) {
      case 0:
        return inventarioDisponible;
      case 1:
        return inventarioBaja;
      case 2:
        return inventarioVendido;
      default:
        return [];
    }
  };

  const TablaInventario = ({ items }) => (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Producto</TableCell>
            <TableCell>Descripción</TableCell>
            <TableCell>Categoría</TableCell>
            <TableCell>Marca</TableCell>
            <TableCell>Unidades</TableCell>
            <TableCell>Último Precio de Compra</TableCell>
            <TableCell>Precio de Venta</TableCell>
            <TableCell>Tipo</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {items.map((item) => (
            <TableRow key={item.product.id}>
              <TableCell>{item.product.name}</TableCell>
              <TableCell>{item.product.description}</TableCell>
              <TableCell>{item.product.productCategory.name}</TableCell>
              <TableCell>{item.product.brand.name}</TableCell>
              <TableCell>{item.units}</TableCell>
              <TableCell>
                {new Intl.NumberFormat('es-NI', {
                  style: 'currency',
                  currency: 'NIO'
                }).format(item.lastBuyPrice)}
              </TableCell>
              <TableCell>
                {new Intl.NumberFormat('es-NI', {
                  style: 'currency',
                  currency: 'NIO'
                }).format(item.salePrice)}
              </TableCell>
              <TableCell>
                {item.product.isPack ? (
                  <Tooltip title={`${item.product.packUnits} unidades por paquete`}>
                    <Chip 
                      label="Pack" 
                      size="small" 
                      color="info"
                    />
                  </Tooltip>
                ) : 'Unidad'}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );

  return (
    <MainPageContainer>
      <Box sx={{ p: 3 }}>
        <Typography variant="h5" gutterBottom>
          Inventario
        </Typography>

        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs 
            value={tabValue} 
            onChange={handleChangeTab}
            variant="fullWidth"
          >
            <Tab 
              label={
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <span>Disponible</span>
                  <Chip 
                    label={inventarioDisponible.length} 
                    size="small" 
                    color="success"
                  />
                </Box>
              } 
            />
            <Tab 
              label={
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <span>Dado de Baja</span>
                  <Chip 
                    label={inventarioBaja.length} 
                    size="small" 
                    color="error"
                  />
                </Box>
              }
            />
            <Tab 
              label={
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <span>Vendidos</span>
                  <Chip 
                    label={inventarioVendido.length} 
                    size="small" 
                    color="primary"
                  />
                </Box>
              }
            />
          </Tabs>
        </Box>

        {isLoading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
            <CircularProgress />
          </Box>
        ) : (
          <>
            <TabPanel value={tabValue} index={0}>
              <TablaInventario items={inventarioDisponible} />
            </TabPanel>

            <TabPanel value={tabValue} index={1}>
              <TablaInventario items={inventarioBaja} />
            </TabPanel>

            <TabPanel value={tabValue} index={2}>
              <TablaInventario items={inventarioVendido} />
            </TabPanel>
          </>
        )}
      </Box>
    </MainPageContainer>
  );
};

export default VerInventarioPage; 