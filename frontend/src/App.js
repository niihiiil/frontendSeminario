import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import ProtectedRoute from './protectedRoutes';
import Login from './components/autenticacion/login';
import MainPage from './components/layout/mainpage';
import ComprasPage from './components/pages/comprasPage';
import VentasPage from './components/pages/ventasPage';
import InventarioPage from './components/pages/inventarioPage';
import ConfigPage from './components/pages/configPage';
import EmpleadosPage from './components/pages/empleadoPage';
import UsuariosPage from './components/pages/usuariosPage';
import FacturasPage from './components/pages/facturasPage';
import ClientesPage from './components/pages/clientesPage';
import ProveedoresPage from './components/pages/proveedoresPage';
import PedidosPage from './components/pages/pedidosPage';
import HistorialVentasPage from './components/pages/historialVentasPage';
import HistorialComprasPage from './components/pages/historialComprasPage';
import ProductosPage from './components/pages/productosPage';
import MarcaPage from './components/pages/marcaPage';
import catProdPage from './components/pages/catProdPage';
import HistorialProductosPage from './components/pages/historialProductos';
import Error404 from './components/autenticacion/error404';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  useEffect(() => {
    setIsAuthenticated(true);
  console.log('isAuthenticated establecido a true');
  }, []); 


  return (
    <Router>
      <Switch>

          {/* Redirección predeterminada a /login */}
          <Redirect from="/" to="/login" exact />

        {/* Página de inicio de sesión */}
        <Route path="/login" exact>
          <Login onLogin={() => setIsAuthenticated(true)} />
        </Route>

        {/* Rutas protegidas que solo pueden ser accedidas por usuarios autenticados */}
        <ProtectedRoute path="/main" component={MainPage} isAuthenticated={isAuthenticated} />

        <ProtectedRoute path="/compras" component={ComprasPage} isAuthenticated={isAuthenticated} />
        <ProtectedRoute path="/pedidos" component={PedidosPage} isAuthenticated={isAuthenticated} />
        <ProtectedRoute path="/proveedores" component={ProveedoresPage} isAuthenticated={isAuthenticated} />
        <ProtectedRoute path="/registroCompras" component={HistorialComprasPage} isAuthenticated={isAuthenticated} />

        <ProtectedRoute path="/ventas" component={VentasPage} isAuthenticated={isAuthenticated} />
        <ProtectedRoute path="/facturas" component={FacturasPage} isAuthenticated={isAuthenticated} />
        <ProtectedRoute path="/clientes" component={ClientesPage} isAuthenticated={isAuthenticated} />
        <ProtectedRoute path="/registroVentas" component={HistorialVentasPage} isAuthenticated={isAuthenticated} />

        <ProtectedRoute path="/inventario" component={InventarioPage} isAuthenticated={isAuthenticated} />
        <ProtectedRoute path="/usuarios" component={UsuariosPage} isAuthenticated={isAuthenticated} />
        <ProtectedRoute path="/configuracion" component={ConfigPage} isAuthenticated={isAuthenticated} />
        <ProtectedRoute path="/empleados" component={EmpleadosPage} isAuthenticated={isAuthenticated} />

        <ProtectedRoute path="/productos" component={ProductosPage} isAuthenticated={isAuthenticated} />
        <ProtectedRoute path="/prodHistorial" component={HistorialProductosPage} isAuthenticated={isAuthenticated} />
        <ProtectedRoute path="/prodCategoria" component={catProdPage} isAuthenticated={isAuthenticated} />
        <ProtectedRoute path="/marca" component={MarcaPage} isAuthenticated={isAuthenticated} />
        
        {/* Página de error 404 */}
        <Route path="/error404" exact>
          <Error404 />
        </Route>

        {/* Redirige a /error404 para cualquier otra ruta no coincidente */}
        <Route render={() => <Redirect to="/error404" />} />
      </Switch>
    </Router>
  );
}

export default App;

//usuario: konerholker666@gmail.com
//contraseña: Qwer1234*