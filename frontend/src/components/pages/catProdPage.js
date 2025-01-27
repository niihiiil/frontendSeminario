import React, { useState, useEffect } from 'react';
import MainPageContainer from '../layout/mainpagecontainer';
import ProdCategoriaRegistro from '../forms/proCategoriaRegistro';
import TablaProdCategoria from '../tables/tablaProdCategoria';
import apiCompras from '../../api/apiProd';

const CatProdPage = () => {
  const [categorias, setCategorias] = useState([]);
  const [editingCategoria, setEditingCategoria] = useState(null);

  useEffect(() => {
    cargarCategorias();
  }, []);

  const cargarCategorias = async () => {
    try {
      const categoriasData = await apiCompras.obtenerCategorias();
      const categoriasOrdenadas = categoriasData.sort((a, b) => a.id - b.id);
      setCategorias(categoriasOrdenadas);
    } catch (error) {
      console.error('Error al obtener categorias:', error);
    }
  };

  const handleEditarClick = (categoria) => {
    setEditingCategoria(categoria);
  };

  const handleCancelarEdicion = () => {
    setEditingCategoria(null);
  };

  const handleGuardarEdicion = async (editedCategoria) => {
    try {
      await apiCompras.actualizarCategoria(editedCategoria);
      console.log('Categoria actualizada exitosamente:', editedCategoria);
      cargarCategorias();
    } catch (error) {
      console.error('Error al actualizar categoria:', error);
    }
  };

  const handleEliminarCategoria = async (categoriaId) => {
    try {
      const response = await apiCompras.eliminarCategoria(categoriaId);
      if (response.status === 200) {
        console.log('Categoria eliminada exitosamente:', categoriaId);
        cargarCategorias();
      } else {
        console.error('Error al eliminar categoria:', response.statusText);
      }
    } catch (error) {
      console.error('Error al eliminar categoria:', error);
    }
  };

  return (
    <MainPageContainer>
      <h1>Categorías de Productos</h1>
      {(editingCategoria || !editingCategoria) && (
        <ProdCategoriaRegistro
          onSubmit={async (formData) => {
            try {
              await apiCompras.agregarCategoria({
                name: formData.name,
                description: formData.description
              });
              console.log('Categoria registrada exitosamente:', formData);
              cargarCategorias();
            } catch (error) {
              console.error('Error al agregar categoria:', error.message);
            }
          }}
          onCancel={handleCancelarEdicion}
        />
      )}
      <TablaProdCategoria
        categorias={categorias}
        onEditarClick={handleEditarClick}
        onEliminarClick={handleEliminarCategoria}
        handleGuardarEdicion={handleGuardarEdicion}
      />
    </MainPageContainer>
  );
};

export default CatProdPage;
