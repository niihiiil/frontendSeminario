import React from 'react';
import MainPageContainer from '../layout/mainpagecontainer';
import { Card, CardContent, Typography, Button, ButtonGroup } from '@mui/material';
import { Storefront, Assignment, History } from '@mui/icons-material';
import { Link } from 'react-router-dom';


const ProductosPage = () => {
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
        <h2>Productos</h2>
  
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
          {/* Tarjeta para la gestión de categorias*/}
          <Card style={cardStyle}>
            <CardContent style={contentStyle}>
              <Typography variant="h6">Categorias</Typography>
              <Typography variant="body2">Administra tus categorias y sus detalles</Typography>
            </CardContent>
            <ButtonGroup fullWidth style={{ ...buttonGroupStyle }}>
              <Button
                component={Link}
                to="/prodCategoria"
                variant="contained"
                color="primary"
                endIcon={<Storefront />}
                style={{ flex: 1, borderRadius: '0' }}
              >
                Ir a Categorias
              </Button>
            </ButtonGroup>
          </Card>
  
          {/* Tarjeta para la unidad de medida */}
          <Card style={cardStyle}>
            <CardContent style={contentStyle}>
              <Typography variant="h6">Marca</Typography>
              <Typography variant="body2">Administra tus marcas</Typography>
            </CardContent>
            <ButtonGroup fullWidth style={{ ...buttonGroupStyle }}>
              <Button
                component={Link}
                to="/marca"
                variant="contained"
                color="primary"
                endIcon={<Assignment />}
                style={{ flex: 1, borderRadius: '0' }}
              > 
                Ir a Marcas
              </Button>
            </ButtonGroup>
          </Card>

          {/* Tarjeta para la gestión de productos */}
          <Card style={cardStyle}>
            <CardContent style={contentStyle}>
              <Typography variant="h6">Productos</Typography>
              <Typography variant="body2">Administra tus productos y sus detalles</Typography>
            </CardContent>
            <ButtonGroup fullWidth style={{ ...buttonGroupStyle }}>
              <Button
                component={Link}
                to="/prodHistorial"
                variant="contained"
                color="primary"
                endIcon={<Storefront />}
                style={{ flex: 1, borderRadius: '0' }}
              >
                Ir a Productos
              </Button>
            </ButtonGroup>
          </Card>
        </div>
      </MainPageContainer>
    );
  };
  
  export default ProductosPage;
  