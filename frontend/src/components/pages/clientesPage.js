import React, { useState, useEffect } from 'react';
import MainPageContainer from '../layout/mainpagecontainer';
import ClientesRegistro from '../forms/clientesRegistro';
import TablaClientes from '../tables/tablaClientes';
import apiVentas from '../../api/apiVentas';

const ClientesPage = () => {
  const [clientes, setClientes] = useState([]);
  const [editingCliente, setEditingCliente] = useState(null);

  useEffect(() => {
    cargarClientes();
  }, []);

  const cargarClientes = async () => {
    try {
      const clientesData = await apiVentas.obtenerClientes();
      const clientesOrdenados = clientesData.sort((a, b) => a.id - b.id);
      setClientes(clientesOrdenados);
    } catch (error) {
      console.error('Error al obtener clientes:', error);
    }
  };

  const handleEditarClick = (cliente) => {
    setEditingCliente(cliente);
  };

  const handleCancelarEdicion = () => {
    setEditingCliente(null);
  };

  const handleGuardarEdicion = async (editedCliente) => {
    try {
      await apiVentas.actualizarCliente(editedCliente);
      console.log('Cliente actualizado exitosamente:', editedCliente);
      cargarClientes();
    } catch (error) {
      console.error('Error al actualizar cliente:', error);
    }
  };

  const handleEliminarCliente = async (clienteId) => {
    try {
      const response = await apiVentas.eliminarCliente(clienteId);
      if (response.status === 200) {
        console.log('Cliente eliminado exitosamente:', clienteId);
        cargarClientes();
      } else {
        console.error('Error al eliminar cliente:', response.statusText);
      }
    } catch (error) {
      console.error('Error al eliminar cliente:', error);
    }
  };

  return (
    <MainPageContainer>
      <h1>Clientes</h1>
      {(editingCliente || !editingCliente) && (
        <ClientesRegistro
          onSubmit={async (formData) => {
            try {
              await apiVentas.agregarCliente({
                firstName: formData.nombre,
                secondName: formData.segundoNombre,
                firstLastName: formData.apellidoPaterno,
                secondLastName: formData.apellidoMaterno,
                identificationNumber: formData.numeroIdentificacion,
                isCreditCandidate: formData.candidatoCredito,
              });
              console.log('Cliente registrado exitosamente:', formData);
              cargarClientes();
            } catch (error) {
              console.error('Error al agregar cliente:', error.message);
            }
          }}
          onCancel={handleCancelarEdicion}
        />
      )}
      <TablaClientes
        clientes={clientes}
        onEditarClick={handleEditarClick}
        onEliminarClick={handleEliminarCliente}
        handleGuardarEdicion={handleGuardarEdicion}
      />
    </MainPageContainer>
  );
};

export default ClientesPage;
