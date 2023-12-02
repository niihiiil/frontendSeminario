import React from 'react';
import MainPageContainer from '../layout/mainpagecontainer';
import { Card, CardContent, Typography, Button, ButtonGroup } from '@mui/material';
import { Storefront, Assignment } from '@mui/icons-material';
import { Link } from 'react-router-dom';

const ComprasPage = () => {
  return (
    <MainPageContainer>
      <h2>Compras</h2>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
        {/* Tarjeta para la gestión de proveedores */}
        <Card style={{ width: '200px', height: '250px', display: 'flex', flexDirection: 'column' }}>
          <CardContent style={{ flexGrow: 1 }}>
            <Typography variant="h6">Gestión de Proveedores</Typography>
            <Typography variant="body2">Administra tus proveedores y sus detalles</Typography>
          </CardContent>
          <ButtonGroup fullWidth style={{ borderTop: '1px solid #ccc' }}>
            <Button
              component={Link}
              to="/compras/proveedores"
              variant="contained"
              color="primary"
              endIcon={<Storefront />}
              style={{ flex: 1, borderRadius: '0' }}
            >
              Ir a Proveedores
            </Button>
          </ButtonGroup>
        </Card>

        {/* Tarjeta para la gestión de pedidos */}
        <Card style={{ width: '200px', height: '250px', display: 'flex', flexDirection: 'column' }}>
          <CardContent style={{ flexGrow: 1 }}>
            <Typography variant="h6">Gestión de Pedidos</Typography>
            <Typography variant="body2">Administra tus pedidos y su estado</Typography>
          </CardContent>
          <ButtonGroup fullWidth style={{ borderTop: '1px solid #ccc' }}>
            <Button
              component={Link}
              to="/compras/pedidos"
              variant="contained"
              color="primary"
              endIcon={<Assignment />}
              style={{ flex: 1, borderRadius: '0' }}
            >
              Ir a Pedidos
            </Button>
          </ButtonGroup>
        </Card>
      </div>
    </MainPageContainer>
  );
};

export default ComprasPage;
