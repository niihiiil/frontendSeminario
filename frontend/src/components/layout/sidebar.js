import React, { useState } from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Divider, Typography, IconButton } from '@mui/material';
import { ShoppingCart, LocalMall, Store, Build, People, CreditCard, ExitToApp, Menu, ChevronLeft } from '@mui/icons-material';  // Importa los iconos de crédito y usuarios
import { Link, useHistory } from 'react-router-dom';
import EntityClass from '../../api/entityClass'; 

const Sidebar = () => {
  const [isExpanded, setIsExpanded] = useState(true);
  const history = useHistory();
  
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
          transition: 'left 0.3s'
        }}
      >
        {isExpanded ? <ChevronLeft /> : <Menu />}
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
          height: '64px', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          borderBottom: '1px solid #ccc'
        }}>
          {isExpanded && (
            <Typography variant="h6">
              <Link to="/main" style={{ textDecoration: 'none', color: 'inherit' }}>
                Libreria Edelweiss
              </Link>
            </Typography>
          )}
        </div>

        <List>
          <ListItem button component={Link} to="/compras">
            <ListItemIcon><ShoppingCart /></ListItemIcon>
            {isExpanded && <ListItemText primary="Compras" />}
          </ListItem>
          <ListItem button component={Link} to="/ventas">
            <ListItemIcon><LocalMall /></ListItemIcon>
            {isExpanded && <ListItemText primary="Ventas" />}
          </ListItem>
          <ListItem button component={Link} to="/inventario">
            <ListItemIcon><Store /></ListItemIcon>
            {isExpanded && <ListItemText primary="Inventario" />}
          </ListItem>
          <ListItem button component={Link} to="/usuarios">
            <ListItemIcon><People /></ListItemIcon>
            {isExpanded && <ListItemText primary="Usuarios" />}
          </ListItem>
          <ListItem button component={Link} to="/productos">
            <ListItemIcon><CreditCard /></ListItemIcon>
            {isExpanded && <ListItemText primary="Productos" />}
          </ListItem>
        </List>
        <Divider />
        <List>
          <ListItem button component={Link} to="/configuracion">
            <ListItemIcon><Build /></ListItemIcon>
            {isExpanded && <ListItemText primary="Configuración" />}
          </ListItem>
          <ListItem button onClick={handleLogout}>
            <ListItemIcon><ExitToApp /></ListItemIcon>
            {isExpanded && <ListItemText primary="Cerrar Sesión" />}
          </ListItem>
        </List>
        {isExpanded && (
          <div style={{ 
            position: 'absolute', 
            bottom: 0, 
            left: 0, 
            right: 0, 
            textAlign: 'center', 
            padding: '8px' 
          }}>
            UNAN-FAREM Carazo | {new Date().getFullYear()} | Versión 1.0
          </div>
        )}
      </Drawer>
    </>
  );
};

export default Sidebar;
