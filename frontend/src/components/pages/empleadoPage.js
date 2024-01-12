import React, { useState, useEffect } from 'react';
import MainPageContainer from '../layout/mainpagecontainer';
import EmpleadosRegistro from '../forms/empleadosRegistro';
import TablaEmpleados from '../tables/tablaEmpleado';
import apiEmpleados from '../../api/apiConfig';

const EmpleadosPage = () => {
  const [empleados, setEmpleados] = useState([]);
  const [editingEmpleado, setEditingEmpleado] = useState(null);

  useEffect(() => {
    cargarEmpleados();
  }, []);

  const cargarEmpleados = async () => {
    try {
      const empleadosData = await apiEmpleados.obtenerEmpleados();
      const empleadosOrdenados = empleadosData.sort((a, b) => a.id - b.id);
      setEmpleados(empleadosOrdenados);
    } catch (error) {
      console.error('Error al obtener empleados:', error);
    }
  };

  const handleEditarClick = (empleado) => {
    setEditingEmpleado(empleado);
  };

  const handleCancelarEdicion = () => {
    setEditingEmpleado(null);
  };

  const handleEmpleadoSubmit = async (formData) => {
    try {
      await apiEmpleados.agregarEmpleado({
        firstName: formData.primerNombre,
        secondName: formData.segundoNombre,
        firstLastName: formData.primerApellido,
        secondLastName: formData.segundoApellido,
        sex: formData.genero,
        identificationNumber: formData.numeroIdentificacion,
        yearsOld: formData.edad,
      });
      console.log('Empleado registrado exitosamente:', formData);
      cargarEmpleados();
    } catch (error) {
      console.error('Error al agregar empleado:', error.message);
    }
  };

  const handleGuardarEdicion = async (editedEmpleado) => {
    try {
      console.log('Datos a enviar al servidor:', editedEmpleado);
  
      await apiEmpleados.actualizarEmpleado(editedEmpleado);
    
      console.log('Empleado actualizado exitosamente:', editedEmpleado);
    
      cargarEmpleados();
    } catch (error) {
      console.error('Error al actualizar empleado:', error);
    }
  };

  const handleEliminarEmpleado = async (empleadoId) => {
    try {
      console.log('Intentando eliminar empleado con ID:', empleadoId);
      const response = await apiEmpleados.eliminarEmpleado(empleadoId);
  
      console.log('Respuesta de eliminación:', response);
  
      if (response.status === 200) {
        console.log('Empleado eliminado exitosamente:', empleadoId);
        cargarEmpleados();
      } else {
        console.error('Error al eliminar empleado:', response.statusText);
      }
    } catch (error) {
      console.error('Error al eliminar empleado:', error);
    }
  };

  return (
    <MainPageContainer>
      <h1>Empleados</h1>
      {(editingEmpleado || !editingEmpleado) && (
        <EmpleadosRegistro
          onSubmit={(formData) => {
            if (editingEmpleado) {
              handleGuardarEdicion({ ...editingEmpleado, ...formData });
            } else {
              handleEmpleadoSubmit(formData);
            }
          }}
          onCancel={handleCancelarEdicion}
        />
      )}
      <TablaEmpleados
        empleados={empleados}
        onEditarClick={handleEditarClick}
        onEliminarClick={handleEliminarEmpleado}
        handleGuardarEdicion={handleGuardarEdicion}
      />
    </MainPageContainer>
  );
};

export default EmpleadosPage;
