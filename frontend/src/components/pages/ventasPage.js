import React from 'react';
import { useHistory } from 'react-router-dom';
import MainPageContainer from '../layout/mainpagecontainer';
import { Grid, Card, CardContent, Typography, CardActionArea } from '@mui/material';
import { 
  LocalMall, 
  People, 
  History,
  Receipt
} from '@mui/icons-material';

const VentasPage = () => {
  const history = useHistory();

  const menuItems = [
    {
      title: 'Nueva Venta',
      description: 'Registrar una nueva venta',
      icon: <LocalMall sx={{ fontSize: 60, color: '#1976d2', marginBottom: 2 }} />,
      path: '/facturas'
    },
    {
      title: 'Clientes',
      description: 'Gestión de clientes',
      icon: <People sx={{ fontSize: 60, color: '#1976d2', marginBottom: 2 }} />,
      path: '/clientes'
    },
    {
      title: 'Historial',
      description: 'Historial de ventas realizadas',
      icon: <History sx={{ fontSize: 60, color: '#1976d2', marginBottom: 2 }} />,
      path: '/registroVentas'
    },
    {
      title: 'Facturas',
      description: 'Gestión de facturas',
      icon: <Receipt sx={{ fontSize: 60, color: '#1976d2', marginBottom: 2 }} />,
      path: '/facturas'
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

export default VentasPage;
