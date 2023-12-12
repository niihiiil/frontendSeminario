import React from 'react';
import MainPageContainer from '../layout/mainpagecontainer';
import FormularioRegistro from '../forms/formularioRegistro';



const UsuariosPage = () => {

  const handleRegistroSubmit = (formData) => {
    //Conectar al API
    console.log(formData);
  };

  return (
   <MainPageContainer>
      <h1>Gestor de usuarios</h1>
      <FormularioRegistro onSubmit={handleRegistroSubmit} />
    </MainPageContainer>
  );
};

export default UsuariosPage;
