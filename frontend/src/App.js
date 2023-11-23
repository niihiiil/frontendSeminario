import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './components/autenticacion/login';
import MainPage from './components/layout/mainpage';
import ComprasPage from './components/pages/comprasPage';
import VentasPage from './components/pages/ventasPage';
import InventarioPage from './components/pages/inventarioPage';
import ConfigPage from './components/pages/configPage';
import UsuariosPage from './components/pages/usuariosPage';

function App() {
  return (
    <Router>
      <Switch>
        {/* Página de inicio de sesión */}
        <Route path="/login" exact>
          <Login />
        </Route>

        {/* Páginas principales después de iniciar sesión */}
        <Route path="/main" exact>
          <MainPage />
        </Route>

        <Route path="/compras" exact>
          <ComprasPage />
        </Route>

        <Route path="/ventas" exact>
          <VentasPage />
        </Route>

        <Route path="/inventario" exact>
          <InventarioPage />
        </Route>

        <Route path="/usuarios" exact>
          <UsuariosPage />
        </Route>

        <Route path="/configuracion" exact>
          <ConfigPage />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
