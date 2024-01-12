import React from 'react';
import { Card, CardContent, Typography, Button, ButtonGroup } from '@mui/material';
import { ShoppingCart, LocalMall, Store, Group, Settings, CreditCard } from '@mui/icons-material';
import { Link } from 'react-router-dom';


const MainPageContent = () => {
  const cardData = [
    { title: 'Compras', description: 'Gestión de compras, proveedores, facturas de compra', link: '/compras', icon: <ShoppingCart /> },
    { title: 'Ventas', description: 'Gestión de facturas, créditos, clientes', link: '/ventas', icon: <LocalMall /> },
    { title: 'Inventario', description: 'Control de bodega, productos, categorías', link: '/inventario', icon: <Store /> },
    { title: 'Usuarios', description: 'Registro y modificación de usuarios, roles y la información de los empleados', link: '/usuarios', icon: <Group /> },
    { title: 'Config', description: 'Ajustes y configuración del sistema', link: '/configuracion', icon: <Settings /> },
    { title: 'Créditos', description: 'Créditos de compra y créditos de venta', link: '/creditos', icon: <CreditCard /> }
    //Agregar mas s tarjetas
  ];

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
      {cardData.map((card, index) => (
        <Card key={index} style={{ width: '200px', height: '250px', display: 'flex', flexDirection: 'column' }}>
          <CardContent style={{ flexGrow: 1 }}>
            <Typography variant="h6">{card.title}</Typography>
            <Typography variant="body2">{card.description}</Typography>
          </CardContent>
          <ButtonGroup fullWidth style={{ borderTop: '1px solid #ccc' }}>
            <Button
              component={Link}
              to={card.link}
              variant="contained"
              color="primary"
              endIcon={card.icon}
              style={{ flex: 1, borderRadius: '0' }}
            >
              Ir a {card.title}
            </Button>
          </ButtonGroup>
        </Card>
      ))}
    </div>
  );
};

export default MainPageContent;
