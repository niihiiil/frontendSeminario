import React from 'react';
import MainPageContainer from '../layout/mainpagecontainer';
import FormularioProveedores from '../forms/proveedoresRegistro';

const ProveedoresPage = () => {
  const handleProveedorSubmit = (formData) => {
    // Conectar al API
    console.log('Datos del proveedor enviados:', formData);
  };

  return (
    <MainPageContainer>
      <h1>Proveedores</h1>
      <FormularioProveedores onSubmit={handleProveedorSubmit} />
    </MainPageContainer>
  );
}

export default ProveedoresPage;
