import React, { useContext, useState } from 'react';
import MainPageContainer from '../layout/mainpagecontainer';
import ConfiguracionForm from '../forms/configuracionForm';
import { 
  Box, 
  Typography, 
  Tabs, 
  Tab,
  Grid, 
  Card, 
  CardContent, 
  CardActionArea 
} from '@mui/material';
import { 
  Brightness7,
  Brightness4,
  Park,
  Water,
  Palette,
  Settings
} from '@mui/icons-material';
import { ColorModeContext } from '../../context/ThemeContext';
import { useTheme } from '@mui/material/styles';

const ConfigPage = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const colorMode = useContext(ColorModeContext);
  const theme = useTheme();

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

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
      <Box sx={{ p: 3 }}>
        <Typography variant="h5" gutterBottom sx={{ mb: 3 }}>
          Configuración
        </Typography>

        <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
          <Tabs 
            value={selectedTab} 
            onChange={handleTabChange}
            aria-label="configuración tabs"
          >
            <Tab 
              icon={<Settings />} 
              label="Configuración del Sistema" 
              iconPosition="start"
            />
            <Tab 
              icon={<Palette />} 
              label="Temas" 
              iconPosition="start"
            />
          </Tabs>
        </Box>

        {selectedTab === 0 && (
          <ConfiguracionForm />
        )}

        {selectedTab === 1 && (
          <Card sx={{ mb: 4 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ mb: 3 }}>
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
        )}
      </Box>
    </MainPageContainer>
  );
};

export default ConfigPage;
