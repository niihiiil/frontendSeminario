import React from 'react';
import MainPageContainer from '../layout/mainpagecontainer';
import { Card, CardContent, Typography, Button, ButtonGroup } from '@mui/material';
import { Group, Settings } from '@mui/icons-material';
import { Link } from 'react-router-dom';

const ConfigPage = () => {
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
      <h2>Configuración</h2>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
        {/* Tarjeta para la gestión de empleados */}
        <Card style={cardStyle}>
          <CardContent style={contentStyle}>
            <Typography variant="h6">Gestión de Empleados</Typography>
            <Typography variant="body2">Administra a tus empleados y su información</Typography>
          </CardContent>
          <ButtonGroup fullWidth style={{ ...buttonGroupStyle }}>
            <Button
              component={Link}
              to="/empleados"
              variant="contained"
              color="primary"
              endIcon={<Group />}
              style={{ flex: 1, borderRadius: '0' }}
            >
              Ir a Empleados
            </Button>
          </ButtonGroup>
        </Card>

        {/* Tarjeta para la configuración general */}
        <Card style={cardStyle}>
          <CardContent style={contentStyle}>
            <Typography variant="h6">Configuración General</Typography>
            <Typography variant="body2">Ajustes y configuración del sistema</Typography>
          </CardContent>
          <ButtonGroup fullWidth style={{ ...buttonGroupStyle }}>
            <Button
              component={Link}
              to="/configuracion"
              variant="contained"
              color="primary"
              endIcon={<Settings />}
              style={{ flex: 1, borderRadius: '0' }}
            >
              Ir a Configuración
            </Button>
          </ButtonGroup>
        </Card>
      </div>
    </MainPageContainer>
  );
};

export default ConfigPage;
