import React from 'react';
import { useHistory } from 'react-router-dom';
import MainPageContainer from '../layout/mainpagecontainer';
import { Grid, Card, CardContent, Typography, CardActionArea } from '@mui/material';
import { 
  Inventory, 
  Category, 
  History,
  BrandingWatermark
} from '@mui/icons-material';

const ProductosPage = () => {
  const history = useHistory();

  const menuItems = [
    {
      title: 'Productos',
      description: 'Gestión de productos y packs',
      icon: <Inventory sx={{ fontSize: 60, color: '#1976d2', marginBottom: 2 }} />,
      path: '/prodHistorial'
    },
    {
      title: 'Categorías',
      description: 'Gestión de categorías de productos',
      icon: <Category sx={{ fontSize: 60, color: '#1976d2', marginBottom: 2 }} />,
      path: '/prodCategoria'
    },
    {
      title: 'Marcas',
      description: 'Gestión de marcas de productos',
      icon: <BrandingWatermark sx={{ fontSize: 60, color: '#1976d2', marginBottom: 2 }} />,
      path: '/marca'
    },
    {
      title: 'Historial',
      description: 'Historial de cambios en productos',
      icon: <History sx={{ fontSize: 60, color: '#1976d2', marginBottom: 2 }} />,
      path: '/prodHistorial'
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

export default ProductosPage;
  