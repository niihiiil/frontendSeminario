import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './components/autenticacion/login';
import MainPage from './components/layout/mainpage';
import ComprasPage from './components/pages/comprasPage';
import VentasPage from './components/pages/ventasPage';
import InventarioPage from './components/pages/inventarioPage';
import ConfigPage from './components/pages/configPage';
import UsuariosPage from './components/pages/usuariosPage';
import CreditosPage from './components/pages/creditosPage';
import FacturasPage from './components/pages/facturasPage';
import ClientesPage from './components/pages/clientesPage';
import ProveedoresPage from './components/pages/proveedoresPage';
import PedidosPage from './components/pages/pedidosPage';


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

        <Route path="/pedidos" exact>
          <PedidosPage />
        </Route>

        <Route path="/compras/proveedores" exact>
          <ProveedoresPage />
        </Route>

        <Route path="/ventas" exact>
          <VentasPage />
        </Route>

        <Route path="/facturas" exact>
          <FacturasPage />
        </Route>

        <Route path="/ventas/clientes" exact>  
          <ClientesPage />
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

        <Route path="/creditos" exact>
          <CreditosPage />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
