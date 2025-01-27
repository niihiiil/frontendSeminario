import React, { useState, useEffect } from 'react';
import MainPageContainer from '../layout/mainpagecontainer';
import MarcaRegistro from '../forms/marcaRegistro';
import TablaMarca from '../tables/tablaMarca';
import apiProd from '../../api/apiProd';

const MarcaPage = () => {
  const [marcas, setMarcas] = useState([]);
  const [editingMarca, setEditingMarca] = useState(null);

  useEffect(() => {
    cargarMarcas();
  }, []);

  const cargarMarcas = async () => {
    try {
      const marcasData = await apiProd.obtenerMarcas();
      const marcasOrdenadas = marcasData.sort((a, b) => a.id - b.id);
      setMarcas(marcasOrdenadas);
    } catch (error) {
      console.error('Error al obtener marcas:', error);
    }
  };

  const handleEditarClick = (marca) => {
    setEditingMarca(marca);
  };

  const handleCancelarEdicion = () => {
    setEditingMarca(null);
  };

  const handleGuardarEdicion = async (editedMarca) => {
    try {
      await apiProd.actualizarMarca(editedMarca);
      console.log('Marca actualizada exitosamente:', editedMarca);
      cargarMarcas();
    } catch (error) {
      console.error('Error al actualizar marca:', error);
    }
  };

  const handleEliminarMarca = async (marcaId) => {
    try {
      const response = await apiProd.eliminarMarca(marcaId);
      if (response.status === 200) {
        console.log('Marca eliminada exitosamente:', marcaId);
        cargarMarcas();
      } else {
        console.error('Error al eliminar marca:', response.statusText);
      }
    } catch (error) {
      console.error('Error al eliminar marca:', error);
    }
  };

  return (
    <MainPageContainer>
      <h1>Marcas</h1>
      {(editingMarca || !editingMarca) && (
        <MarcaRegistro
          onSubmit={async (formData) => {
            try {
              await apiProd.agregarMarca({
                name: formData.nombre,
                description: formData.descripcion
              });
              console.log('Marca registrada exitosamente:', formData);
              cargarMarcas();
            } catch (error) {
              console.error('Error al agregar marca:', error.message);
            }
          }}
          onCancel={handleCancelarEdicion}
        />
      )}
      <TablaMarca
        marcas={marcas}
        onEditarClick={handleEditarClick}
        onEliminarClick={handleEliminarMarca}
        handleGuardarEdicion={handleGuardarEdicion}
      />
    </MainPageContainer>
  );
};

export default MarcaPage; 