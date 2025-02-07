import React from 'react';
import { useHistory } from 'react-router-dom';
import { Grid, Card, CardContent, Typography, CardActionArea } from '@mui/material';
import { 
  ShoppingCart, 
  LocalMall, 
  Store, 
  Person, 
  Inventory,
  Assessment,
  People,
  Receipt
} from '@mui/icons-material';

const MainPageContent = () => {
  const history = useHistory();

  const menuItems = [
    {
      title: 'Compras',
      description: 'Gestión de compras y proveedores',
      icon: <ShoppingCart sx={{ fontSize: 60, color: '#1976d2', marginBottom: 2 }} />,
      path: '/compras'
    },
    {
      title: 'Ventas',
      description: 'Gestión de ventas y clientes',
      icon: <LocalMall sx={{ fontSize: 60, color: '#1976d2', marginBottom: 2 }} />,
      path: '/ventas'
    },
    {
      title: 'Inventario',
      description: 'Control de inventario y stock',
      icon: <Store sx={{ fontSize: 60, color: '#1976d2', marginBottom: 2 }} />,
      path: '/inventario'
    },
    {
      title: 'Personal',
      description: 'Gestión de usuarios y empleados',
      icon: <Person sx={{ fontSize: 60, color: '#1976d2', marginBottom: 2 }} />,
      path: '/personal'
    },
    {
      title: 'Productos',
      description: 'Gestión de productos y categorías',
      icon: <Inventory sx={{ fontSize: 60, color: '#1976d2', marginBottom: 2 }} />,
      path: '/productos'
    },
    {
      title: 'Reportes',
      description: 'Informes y estadísticas',
      icon: <Assessment sx={{ fontSize: 60, color: '#1976d2', marginBottom: 2 }} />,
      path: '/reportes'
    },
    {
      title: 'Clientes',
      description: 'Gestión de clientes',
      icon: <People sx={{ fontSize: 60, color: '#1976d2', marginBottom: 2 }} />,
      path: '/clientes'
    },
    {
      title: 'Facturas',
      description: 'Gestión de facturas',
      icon: <Receipt sx={{ fontSize: 60, color: '#1976d2', marginBottom: 2 }} />,
      path: '/facturas'
    }
  ];

  return (
    <Grid container spacing={3} sx={{ padding: 3 }}>
      {menuItems.map((item, index) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
          <Card sx={{ height: '100%' }}>
            <CardActionArea onClick={() => history.push(item.path)}>
              <CardContent sx={{ textAlign: 'center', padding: 3 }}>
                {item.icon}
                <Typography variant="h5" component="div" gutterBottom>
                  {item.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {item.description}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default MainPageContent;
