import React from 'react';
import MainPageContainer from '../layout/mainpagecontainer';
import FormularioClientes from '../forms/clientesRegistro';

const ClientesPage = () => {
  const handleClienteSubmit = (formData) => {
    // Conectar al API
    console.log('Datos del cliente enviados:', formData);
  };

  return (
    <MainPageContainer>
      <h1>Clientes</h1>
      <FormularioClientes onSubmit={handleClienteSubmit} />
    </MainPageContainer>
  );
};

export default ClientesPage;
