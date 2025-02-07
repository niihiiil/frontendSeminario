import React, { useContext } from 'react';
import MainPageContainer from '../layout/mainpagecontainer';
import { Grid, Card, CardContent, Typography, CardActionArea } from '@mui/material';
import { 
  Brightness7,
  Brightness4,
  Park,
  Water,
  Palette
} from '@mui/icons-material';
import { ColorModeContext } from '../../context/ThemeContext';
import { useTheme } from '@mui/material/styles';

const ConfigPage = () => {
  const colorMode = useContext(ColorModeContext);
  const theme = useTheme();

  const themeCards = [
    {
      id: 'light',
      title: 'Tema Claro',
      description: 'Tema claro predeterminado',
      icon: <Brightness7 sx={{ fontSize: 60, color: '#1976d2', marginBottom: 2 }} />
    },
    {
      id: 'dark',
      title: 'Tema Oscuro',
      description: 'Tema oscuro para uso nocturno',
      icon: <Brightness4 sx={{ fontSize: 60, color: '#1976d2', marginBottom: 2 }} />
    },
    {
      id: 'nature',
      title: 'Tema Naturaleza',
      description: 'Tema inspirado en colores naturales',
      icon: <Park sx={{ fontSize: 60, color: '#2e7d32', marginBottom: 2 }} />
    },
    {
      id: 'ocean',
      title: 'Tema Océano',
      description: 'Tema con tonos oceánicos',
      icon: <Water sx={{ fontSize: 60, color: '#0288d1', marginBottom: 2 }} />
    }
  ];

  return (
    <MainPageContainer>
      <Typography variant="h4" gutterBottom sx={{ mb: 4 }}>
        Configuración
      </Typography>

      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Typography variant="h5" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
            <Palette sx={{ mr: 1 }} /> Temas
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            Selecciona el tema que prefieras para personalizar la apariencia de la aplicación
          </Typography>
          
          <Grid container spacing={3}>
            {themeCards.map((themeOption) => (
              <Grid item xs={12} sm={6} md={3} key={themeOption.id}>
                <Card 
                  sx={{ 
                    height: '100%',
                    border: theme.palette.mode === themeOption.id ? '2px solid' : 'none',
                    borderColor: 'primary.main'
                  }}
                >
                  <CardActionArea 
                    onClick={() => colorMode.changeTheme(themeOption.id)}
                    sx={{ height: '100%' }}
                  >
                    <CardContent sx={{ textAlign: 'center', padding: 3 }}>
                      {themeOption.icon}
                      <Typography variant="h6" component="div" gutterBottom>
                        {themeOption.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {themeOption.description}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            ))}
          </Grid>
        </CardContent>
      </Card>

      {/* Aquí puedes agregar más secciones de configuración */}
    </MainPageContainer>
  );
};

export default ConfigPage;
