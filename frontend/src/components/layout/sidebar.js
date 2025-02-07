import React, { useState, useContext } from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Divider, Typography, IconButton } from '@mui/material';
import { 
  ShoppingCart,        // Para Compras
  LocalMall,          // Para Ventas
  Inventory,          // Para Inventario
  Person,             // Para Personal
  Category,           // Para Productos
  Settings,           // Para Configuración
  Brightness4,        // Para Modo Oscuro
  Brightness7,        // Para Modo Claro
  Logout,             // Para Cerrar Sesión
  ChevronLeft,        // Para Colapsar
  Menu as MenuIcon,   // Para Expandir
  Store               // Para Logo
} from '@mui/icons-material';
import { Link, useHistory } from 'react-router-dom';
import EntityClass from '../../api/entityClass'; 
import { ColorModeContext } from '../../context/ThemeContext';
import { useTheme } from '@mui/material/styles';

const Sidebar = () => {
  const [isExpanded, setIsExpanded] = useState(true);
  const history = useHistory();
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);
  
  const handleLogout = () => {
    EntityClass.logout();
    history.push('/login');
  };

  return (
    <>
      <IconButton 
        onClick={() => setIsExpanded(!isExpanded)}
        sx={{ 
          position: 'fixed', 
          left: isExpanded ? '240px' : '65px', 
          top: '10px', 
          zIndex: 1200,
          transition: 'left 0.3s',
          backgroundColor: 'background.paper',
          '&:hover': {
            backgroundColor: 'action.hover',
          }
        }}
      >
        {isExpanded ? <ChevronLeft /> : <MenuIcon />}
      </IconButton>

      <Drawer
        variant="permanent"
        sx={{
          width: isExpanded ? 240 : 65,
          flexShrink: 0,
          transition: 'width 0.3s',
          [`& .MuiDrawer-paper`]: { 
            width: isExpanded ? 240 : 65, 
            boxSizing: 'border-box',
            overflowX: 'hidden',
            transition: 'width 0.3s'
          },
        }}
      >
        <div style={{ 
          height: '80px', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          borderBottom: '2px solid',
          borderColor: theme.palette.primary.main,
          background: theme.palette.mode === 'dark' 
            ? 'linear-gradient(180deg, rgba(25,118,210,0.2) 0%, rgba(25,118,210,0) 100%)'
            : 'linear-gradient(180deg, rgba(25,118,210,0.1) 0%, rgba(25,118,210,0) 100%)',
          padding: '0 16px'
        }}>
          {isExpanded && (
            <Typography 
              variant="h6" 
              sx={{
                fontWeight: 'bold',
                color: theme.palette.primary.main,
                textAlign: 'center',
                textShadow: theme.palette.mode === 'dark' 
                  ? '0 0 10px rgba(144,202,249,0.4)'
                  : 'none'
              }}
            >
              <Link 
                to="/main" 
                style={{ 
                  textDecoration: 'none', 
                  color: 'inherit',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
              >
                <Store sx={{ fontSize: 30 }} />
                Libreria Edelweiss
              </Link>
            </Typography>
          )}
        </div>

        <List>
          <ListItem button component={Link} to="/compras">
            <ListItemIcon>
              <ShoppingCart sx={{ color: theme.palette.primary.main }} />
            </ListItemIcon>
            {isExpanded && <ListItemText primary="Compras" />}
          </ListItem>

          <ListItem button component={Link} to="/ventas">
            <ListItemIcon>
              <LocalMall sx={{ color: theme.palette.primary.main }} />
            </ListItemIcon>
            {isExpanded && <ListItemText primary="Ventas" />}
          </ListItem>

          <ListItem button component={Link} to="/inventario">
            <ListItemIcon>
              <Inventory sx={{ color: theme.palette.primary.main }} />
            </ListItemIcon>
            {isExpanded && <ListItemText primary="Inventario" />}
          </ListItem>

          <ListItem button onClick={() => history.push('/personal')}>
            <ListItemIcon>
              <Person sx={{ color: theme.palette.primary.main }} />
            </ListItemIcon>
            {isExpanded && <ListItemText primary="Personal" />}
          </ListItem>

          <ListItem button component={Link} to="/productos">
            <ListItemIcon>
              <Category sx={{ color: theme.palette.primary.main }} />
            </ListItemIcon>
            {isExpanded && <ListItemText primary="Productos" />}
          </ListItem>
        </List>
        <Divider />
        <List>
          <ListItem button component={Link} to="/configuracion">
            <ListItemIcon>
              <Settings sx={{ color: theme.palette.primary.main }} />
            </ListItemIcon>
            {isExpanded && <ListItemText primary="Configuración" />}
          </ListItem>
          
          <ListItem button onClick={() => colorMode.changeTheme(theme.palette.mode === 'dark' ? 'light' : 'dark')}>
            <ListItemIcon>
              {theme.palette.mode === 'dark' ? (
                <Brightness7 sx={{ color: theme.palette.primary.main }} />
              ) : (
                <Brightness4 sx={{ color: theme.palette.primary.main }} />
              )}
            </ListItemIcon>
            {isExpanded && (
              <ListItemText 
                primary={theme.palette.mode === 'dark' ? 'Modo Claro' : 'Modo Oscuro'} 
              />
            )}
          </ListItem>

          <ListItem button onClick={handleLogout}>
            <ListItemIcon>
              <Logout sx={{ color: theme.palette.primary.main }} />
            </ListItemIcon>
            {isExpanded && <ListItemText primary="Cerrar Sesión" />}
          </ListItem>
        </List>
        {isExpanded && (
          <div style={{ 
            position: 'absolute', 
            bottom: 0, 
            left: 0, 
            right: 0,
            borderTop: '2px solid',
            borderColor: theme.palette.primary.main,
            background: theme.palette.mode === 'dark' 
              ? 'linear-gradient(0deg, rgba(25,118,210,0.2) 0%, rgba(25,118,210,0) 100%)'
              : 'linear-gradient(0deg, rgba(25,118,210,0.1) 0%, rgba(25,118,210,0) 100%)',
            padding: '12px 8px'
          }}>
            <Typography 
              variant="caption" 
              component="div" 
              sx={{ 
                textAlign: 'center',
                color: theme.palette.text.secondary,
                fontWeight: 500,
                '& span': {
                  color: theme.palette.primary.main,
                  fontWeight: 'bold'
                }
              }}
            >
              <span>UNAN-FAREM</span> Carazo
            </Typography>
            <Typography 
              variant="caption" 
              component="div"
              sx={{ 
                textAlign: 'center',
                color: theme.palette.text.secondary,
                mt: 0.5
              }}
            >
              {new Date().getFullYear()} | Versión 1.0
            </Typography>
          </div>
        )}
      </Drawer>
    </>
  );
};

export default Sidebar;
