import React from 'react';
import MainPageContainer from '../layout/mainpagecontainer';
import FormularioRegistro from '../forms/formularioRegistro';
import ContraseñaRegistro from '../forms/contraseñaRegistro';
import EntityClass from '../../api/entityClass';

const UsuariosPage = () => {
  const handleRegistroSubmit = async (formData) => {
    try {
      await EntityClass.agregarUsuario({
        email: formData.correo,
        password: formData.contraseña,
        userName: formData.usuario,
        firstName: formData.nombre,
        lastName: formData.apellido,
        phoneNumber: formData.telefono,
      });

      console.log('Usuario registrado exitosamente:', formData);
    } catch (error) {
      console.error('Error al registrar usuario:', error.message);
    }
  };

  const handleChangePasswordSubmit = async (passwordFormData) => {
    try {
      await EntityClass.cambiarContraseña({
        user: passwordFormData.user,
        oldPassword: passwordFormData.oldPassword,
        newPassword: passwordFormData.newPassword,
      });

      console.log('Contraseña cambiada exitosamente:', passwordFormData);
    } catch (error) {
      console.error('Error al cambiar contraseña:', error.message);
    }
  };

  return (
    <MainPageContainer>
      <h1>Gestor de usuarios</h1>
      <FormularioRegistro onSubmit={handleRegistroSubmit} />
      <ContraseñaRegistro onSubmit={handleChangePasswordSubmit} />
    </MainPageContainer>
  );
};

export default UsuariosPage;
