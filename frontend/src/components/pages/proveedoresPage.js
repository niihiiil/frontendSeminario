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

  const handleGuardarEdicion = async (editedProveedor) => {
    try {
      const proveedoresActualizados = await apiCompras.actualizarProveedor(editedProveedor);
      const proveedoresOrdenados = proveedoresActualizados.sort((a, b) => a.id - b.id);
      setProveedores(proveedoresOrdenados);
      setEditingProveedor(null);
    } catch (error) {
      console.error('Error al actualizar proveedor:', error);
    }
  };

  const handleEliminarProveedor = async (proveedorId) => {
    try {
      const proveedoresActualizados = await apiCompras.eliminarProveedor(proveedorId);
      const proveedoresOrdenados = proveedoresActualizados.sort((a, b) => a.id - b.id);
      setProveedores(proveedoresOrdenados);
    } catch (error) {
      console.error('Error al eliminar proveedor:', error);
    }
  };

  return (
    <MainPageContainer>
      <h1>Proveedores</h1>
      {(editingProveedor || !editingProveedor) && (
        <ProveedoresRegistro
          onSubmit={async (formData) => {
            try {
              const proveedoresActualizados = await apiCompras.agregarProveedor({
                name: formData.nombre,
                ruccode: formData.numeroRUC,
              });
              const proveedoresOrdenados = proveedoresActualizados.sort((a, b) => a.id - b.id);
              setProveedores(proveedoresOrdenados);
            } catch (error) {
              console.error('Error al agregar proveedor:', error.message);
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