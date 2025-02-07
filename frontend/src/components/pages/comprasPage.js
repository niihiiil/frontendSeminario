import React from 'react';
import { useHistory } from 'react-router-dom';
import MainPageContainer from '../layout/mainpagecontainer';
import { Grid, Card, CardContent, Typography, CardActionArea } from '@mui/material';
import { 
  ShoppingCart, 
  People, 
  History,
  ListAlt
} from '@mui/icons-material';

const ComprasPage = () => {
  const history = useHistory();

  const menuItems = [
    {
      title: 'Nueva Compra',
      description: 'Registrar una nueva compra',
      icon: <ShoppingCart sx={{ fontSize: 60, color: '#1976d2', marginBottom: 2 }} />,
      path: '/pedidos'
    },
    {
      title: 'Proveedores',
      description: 'Gestión de proveedores',
      icon: <People sx={{ fontSize: 60, color: '#1976d2', marginBottom: 2 }} />,
      path: '/proveedores'
    },
    {
      title: 'Historial',
      description: 'Historial de compras realizadas',
      icon: <History sx={{ fontSize: 60, color: '#1976d2', marginBottom: 2 }} />,
      path: '/registroCompras'
    },
    {
      title: 'Órdenes',
      description: 'Gestión de órdenes de compra',
      icon: <ListAlt sx={{ fontSize: 60, color: '#1976d2', marginBottom: 2 }} />,
      path: '/pedidos'
    }
  ];

  return (
    <MainPageContainer>
      <Grid container spacing={3} sx={{ marginBottom: 3 }}>
        {menuItems.map((item, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
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
    </MainPageContainer>
  );
};

export default ComprasPage;
