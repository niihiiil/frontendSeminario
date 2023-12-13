import React, { useState } from 'react';
import MainPageContainer from '../layout/mainpagecontainer';
import FormularioRegistro from '../forms/formularioRegistro';
import TablaUsuarios from '../tables/tablaUsuarios';

const UsuariosPage = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [editingUser, setEditingUser] = useState(null);

  const handleEditarClick = (user) => {
    setEditingUser(user);
  };

  const handleCancelarEdicion = () => {
    setEditingUser(null);
  };

  const handleRegistroSubmit = (formData) => {
    // Conectar al API
    console.log(formData);
  };

  const handleGuardarEdicion = (editedUser) => {
    // Conectar al API 
    
  };

  return (
    <MainPageContainer>
      <h1>Gestor de usuarios</h1>
      <FormularioRegistro onSubmit={handleRegistroSubmit} />
      <TablaUsuarios usuarios={usuarios} onEditarClick={handleEditarClick} />
      {/* Mostrar formulario de edición solo si se está editando un usuario */}
      {editingUser && (
        <FormularioRegistro
          onSubmit={(formData) => {
            handleGuardarEdicion({ ...editingUser, ...formData });
          }}
        />
      )}
    </MainPageContainer>
  );
};

export default UsuariosPage;
