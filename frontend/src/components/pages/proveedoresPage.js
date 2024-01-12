import React, { useState, useEffect } from 'react';
import MainPageContainer from '../layout/mainpagecontainer';
import ProveedoresRegistro from '../forms/proveedoresRegistro';
import TablaProveedores from '../tables/tablaProveedores';
import apiCompras from '../../api/apiCompras';

const ProveedoresPage = () => {
  const [proveedores, setProveedores] = useState([]);
  const [editingProveedor, setEditingProveedor] = useState(null);

  useEffect(() => {
    cargarProveedores();
  }, []);

  const cargarProveedores = async () => {
    try {
      const proveedoresData = await apiCompras.obtenerProveedores();
      const proveedoresOrdenados = proveedoresData.sort((a, b) => a.id - b.id);
      setProveedores(proveedoresOrdenados);
    } catch (error) {
      console.error('Error al obtener proveedores:', error);
    }
  };

  const handleEditarClick = (proveedor) => {
    setEditingProveedor(proveedor);
  };

  const handleCancelarEdicion = () => {
    setEditingProveedor(null);
  };

  const handleProveedorSubmit = async (formData) => {
    try {
      await apiCompras.agregarProveedor({
        name: formData.nombre,
        ruccode: formData.numeroRUC,
      });
      console.log('Proveedor registrado exitosamente:', formData);
      cargarProveedores();
    } catch (error) {
      console.error('Error al agregar proveedor:', error.message);
    }
  };

  const handleGuardarEdicion = async (editedProveedor) => {
    try {
      console.log('Datos a enviar al servidor:', editedProveedor);
  
      await apiCompras.actualizarProveedor(editedProveedor);
    
      console.log('Proveedor actualizado exitosamente:', editedProveedor);
    
      cargarProveedores();
    } catch (error) {
      console.error('Error al actualizar proveedor:', error);
    }
  };
  
  
  


  const handleEliminarProveedor = async (proveedorId) => {
    try {
      console.log('Intentando eliminar proveedor con ID:', proveedorId);
      const response = await apiCompras.eliminarProveedor(proveedorId);
  
      console.log('Respuesta de eliminación:', response);
  
      if (response.status === 200) {
        console.log('Proveedor eliminado exitosamente:', proveedorId);
        cargarProveedores();
      } else {
        console.error('Error al eliminar proveedor:', response.statusText);
      }
    } catch (error) {
      console.error('Error al eliminar proveedor:', error);
    }
  };
  
  

  return (
    <MainPageContainer>
      <h1>Proveedores</h1>
      {(editingProveedor || !editingProveedor) && (
        <ProveedoresRegistro
          onSubmit={(formData) => {
            if (editingProveedor) {
              handleGuardarEdicion({ ...editingProveedor, ...formData });
            } else {
              handleProveedorSubmit(formData);
            }
          }}
          onCancel={handleCancelarEdicion}
        />
      )}
      <TablaProveedores
        proveedores={proveedores}
        onEditarClick={handleEditarClick}
        onEliminarClick={handleEliminarProveedor}
        handleGuardarEdicion={handleGuardarEdicion}
      />
    </MainPageContainer>
  );
};

export default ProveedoresPage;