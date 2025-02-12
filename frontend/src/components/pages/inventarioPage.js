import React from 'react';
import { useHistory } from 'react-router-dom';
import MainPageContainer from '../layout/mainpagecontainer';
import { Grid, Card, CardContent, Typography, CardActionArea } from '@mui/material';
import { 
  Inventory as InventoryIcon,
  AddBox as AddBoxIcon
} from '@mui/icons-material';

const InventarioPage = () => {
  const history = useHistory();

  const cards = [
    {
      title: 'Ver Inventario',
      description: 'Consulta y gestiona el inventario actual',
      icon: <InventoryIcon sx={{ fontSize: 40, color: '#1976d2' }} />,
      onClick: () => history.push('/verInventario')
    },
    {
      title: 'Agregar al Inventario',
      description: 'Añade productos manualmente al inventario',
      icon: <AddBoxIcon sx={{ fontSize: 40, color: '#1976d2' }} />,
      onClick: () => history.push('/agregarInventario')
    }
  ];

  return (
    <MainPageContainer>
      <Grid container spacing={3} sx={{ p: 3 }}>
        {cards.map((card, index) => (
          <Grid item xs={12} sm={6} key={index}>
            <Card 
              sx={{ 
                height: '100%',
                transition: 'transform 0.2s',
                '&:hover': {
                  transform: 'scale(1.02)',
                  boxShadow: (theme) => theme.shadows[6]
                }
              }}
            >
              <CardActionArea 
                onClick={card.onClick}
                sx={{ height: '100%', p: 2 }}
              >
                <CardContent sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                  gap: 2
                }}>
                  {card.icon}
                  <Typography variant="h5" component="div" gutterBottom>
                    {card.title}
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    {card.description}
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

export default InventarioPage;
