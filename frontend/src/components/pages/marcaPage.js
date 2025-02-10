import React, { useState, useEffect } from 'react';
import MainPageContainer from '../layout/mainpagecontainer';
import MarcaRegistro from '../forms/marcaRegistro';
import TablaMarca from '../tables/tablaMarcas';
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
      const marcasActualizadas = await apiProd.actualizarMarca({
        id: editedMarca.id,
        name: editedMarca.name,
        description: editedMarca.description
      });
      const marcasOrdenadas = marcasActualizadas.sort((a, b) => a.id - b.id);
      setMarcas(marcasOrdenadas);
      setEditingMarca(null);
    } catch (error) {
      console.error('Error al actualizar marca:', error);
    }
  };

  const handleEliminarMarca = async (marcaId) => {
    try {
      const marcasActualizadas = await apiProd.eliminarMarca(marcaId);
      const marcasOrdenadas = marcasActualizadas.sort((a, b) => a.id - b.id);
      setMarcas(marcasOrdenadas);
    } catch (error) {
      console.error('Error al eliminar marca:', error);
    }
  };

  return (
    <MainPageContainer>
      <h1>Marcas</h1>
      <MarcaRegistro
        marca={editingMarca}
        onSubmit={async (formData) => {
          try {
            const marcasActualizadas = await apiProd.agregarMarca({
              name: formData.nombre,
              description: formData.descripcion
            });
            const marcasOrdenadas = marcasActualizadas.sort((a, b) => a.id - b.id);
            setMarcas(marcasOrdenadas);
          } catch (error) {
            console.error('Error al agregar marca:', error.message);
          }
        }}
        onCancel={handleCancelarEdicion}
      />
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