import React from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Divider, Typography } from '@mui/material';
import { ShoppingCart, LocalMall, Store, Build, People, CreditCard } from '@mui/icons-material';  // Importa los iconos de crédito y usuarios
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 240,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { width: 240, boxSizing: 'border-box' },
      }}
      open
    >
      {/* Header del Sidebar */}
      <div style={{ padding: '16px', textAlign: 'center', borderBottom: '1px solid #ccc' }}>
        <Typography variant="h6">
          <Link to="/main" style={{ textDecoration: 'none', color: 'inherit' }}>
            Libreria Edelweiss
          </Link>
        </Typography>
      </div>

      {/* Contenido del Sidebar */}
      <List>
        <ListItem button component={Link} to="/compras">
          <ListItemIcon><ShoppingCart /></ListItemIcon>
          <ListItemText primary="Compras" />
        </ListItem>
        <ListItem button component={Link} to="/ventas">
          <ListItemIcon><LocalMall /></ListItemIcon>
          <ListItemText primary="Ventas" />
        </ListItem>
        <ListItem button component={Link} to="/inventario">
          <ListItemIcon><Store /></ListItemIcon>
          <ListItemText primary="Inventario" />
        </ListItem>
        {/* Agrega el botón para Usuarios */}
        <ListItem button component={Link} to="/usuarios">
          <ListItemIcon><People /></ListItemIcon>
          <ListItemText primary="Usuarios" />
        </ListItem>
        {/* Agrega el botón para Créditos */}
        <ListItem button component={Link} to="/creditos">
          <ListItemIcon><CreditCard /></ListItemIcon>
          <ListItemText primary="Créditos" />
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem button component={Link} to="/configuracion">
          <ListItemIcon><Build /></ListItemIcon>
          <ListItemText primary="Configuración" />
        </ListItem>
      </List>
      <Divider />
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, textAlign: 'center', padding: '8px' }}>
        UNAN-FAREM Carazo | {new Date().getFullYear()} | Versión 1.0
      </div>
    </Drawer>
  );
};

export default Sidebar;
