// ProtectedRoute.js
import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const ProtectedRoute = ({ component: Component, isAuthenticated, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (isAuthenticated) {
          return <Component {...props} />;
        } else {
          // Redirige a la página de inicio de sesión si el usuario no está autenticado
          return <Redirect to="/login" />;
        }
      }}
    />
  );
};

export default ProtectedRoute;
