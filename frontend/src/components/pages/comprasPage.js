import React from 'react';
import MainPageContainer from '../layout/mainpagecontainer';
import { Card, CardContent, Typography, Button, ButtonGroup } from '@mui/material';
import { Storefront, Assignment, History } from '@mui/icons-material';
import { Link } from 'react-router-dom';

const ComprasPage = () => {
  const cardStyle = {
    width: '200px',
    height: '250px',
    display: 'flex',
    flexDirection: 'column',
  };

  const contentStyle = {
    flexGrow: 1,
    padding: '16px',
  };

  const buttonGroupStyle = {
    borderTop: '1px solid #ccc',
    height: '48px', 
  };

  return (
    <MainPageContainer>
      <h2>Compras</h2>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
        {/* Tarjeta para la gestión de proveedores */}
        <Card style={cardStyle}>
          <CardContent style={contentStyle}>
            <Typography variant="h6">Gestión de Proveedores</Typography>
            <Typography variant="body2">Administra tus proveedores y sus detalles</Typography>
          </CardContent>
          <ButtonGroup fullWidth style={{ ...buttonGroupStyle }}>
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
        <Card style={cardStyle}>
          <CardContent style={contentStyle}>
            <Typography variant="h6">Gestión de Pedidos</Typography>
            <Typography variant="body2">Administra tus pedidos y su estado</Typography>
          </CardContent>
          <ButtonGroup fullWidth style={{ ...buttonGroupStyle }}>
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

        {/* Tarjeta para ver el historial de compras */}
        <Card style={cardStyle}>
          <CardContent style={contentStyle}>
            <Typography variant="h6">Historial de Compras</Typography>
            <Typography variant="body2">Accede al historial de todas las compras realizadas</Typography>
          </CardContent>
          <ButtonGroup fullWidth style={{ ...buttonGroupStyle }}>
            <Button
              component={Link}
              to="/compras/registros"
              variant="contained"
              color="primary"
              endIcon={<History />}
              style={{ flex: 1, borderRadius: '0' }}
            >
              Ver Historial
            </Button>
          </ButtonGroup>
        </Card>
      </div>
    </MainPageContainer>
  );
};

export default ComprasPage;
