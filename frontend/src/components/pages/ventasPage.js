import React from 'react';
import MainPageContainer from '../layout/mainpagecontainer';
import { Card, CardContent, Typography, Button, ButtonGroup } from '@mui/material';
import { Person, Description, History } from '@mui/icons-material';  
import { Link } from 'react-router-dom';

const VentasPage = () => {
  return (
    <MainPageContainer>

<h2>Ventas</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
        {/* Tarjeta para la gestión de clientes */}
        <Card style={{ width: '200px', height: '250px', display: 'flex', flexDirection: 'column' }}>
          <CardContent style={{ flexGrow: 1 }}>
            <Typography variant="h6">Gestión de Clientes</Typography>
            <Typography variant="body2">Registro y modificación de clientes</Typography>
          </CardContent>
          <ButtonGroup fullWidth style={{ borderTop: '1px solid #ccc' }}>
            <Button
              component={Link}
              to="/ventas/clientes"
              variant="contained"
              color="primary"
              endIcon={<Person />}
              style={{ flex: 1, borderRadius: '0' }}
            >
              Ir a Clientes
            </Button>
          </ButtonGroup>
        </Card>

        {/* Tarjeta para la gestión de facturas */}
        <Card style={{ width: '200px', height: '250px', display: 'flex', flexDirection: 'column' }}>
          <CardContent style={{ flexGrow: 1 }}>
            <Typography variant="h6">Gestión de Facturas</Typography>
            <Typography variant="body2">Registro y modificación de facturas</Typography>
          </CardContent>
          <ButtonGroup fullWidth style={{ borderTop: '1px solid #ccc' }}>
            <Button
              component={Link}
              to="/ventas/facturas"
              variant="contained"
              color="primary"
              endIcon={<Description />}
              style={{ flex: 1, borderRadius: '0' }}
            >
              Ir a Facturas
            </Button>
          </ButtonGroup>
        </Card>

        {/* Tarjeta para la gestión de registros de ventas */}
        <Card style={{ width: '200px', height: '250px', display: 'flex', flexDirection: 'column' }}>
          <CardContent style={{ flexGrow: 1 }}>
            <Typography variant="h6">Registros de Ventas</Typography>
            <Typography variant="body2">Acceda a todos los registros de ventas</Typography>
          </CardContent>
          <ButtonGroup fullWidth style={{ borderTop: '1px solid #ccc' }}>
            <Button
              component={Link}
              to="/ventas/registros"
              variant="contained"
              color="primary"
              endIcon={<History />}
              style={{ flex: 1, borderRadius: '0' }}
            >
              Ir a Registros
            </Button>
          </ButtonGroup>
        </Card>
      </div>
    </MainPageContainer>
  );
};

export default VentasPage;
