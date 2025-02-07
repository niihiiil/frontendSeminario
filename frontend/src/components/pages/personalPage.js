import React from 'react';
import { useHistory } from 'react-router-dom';
import MainPageContainer from '../layout/mainpagecontainer';
import { Grid, Card, CardContent, Typography, CardActionArea } from '@mui/material';
import { Person, Group } from '@mui/icons-material';

const PersonalPage = () => {
  const history = useHistory();

  return (
    <MainPageContainer>
      <Grid container spacing={3} sx={{ marginBottom: 3 }}>
        <Grid item xs={12} sm={6}>
          <Card sx={{ height: '100%' }}>
            <CardActionArea onClick={() => history.push('/usuarios')}>
              <CardContent sx={{ textAlign: 'center', padding: 3 }}>
                <Person sx={{ fontSize: 60, color: '#1976d2', marginBottom: 2 }} />
                <Typography variant="h5" component="div" gutterBottom>
                  Usuarios
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Gestión de usuarios del sistema
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Card sx={{ height: '100%' }}>
            <CardActionArea onClick={() => history.push('/empleados')}>
              <CardContent sx={{ textAlign: 'center', padding: 3 }}>
                <Group sx={{ fontSize: 60, color: '#1976d2', marginBottom: 2 }} />
                <Typography variant="h5" component="div" gutterBottom>
                  Empleados
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Gestión de información de empleados
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
      </Grid>
    </MainPageContainer>
  );
};

export default PersonalPage;
