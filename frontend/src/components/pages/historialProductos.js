import React, { useState, useEffect } from 'react';
import MainPageContainer from '../layout/mainpagecontainer';
import ProductosRegistro from '../forms/productoRegistro';
import TablaProductos from '../tables/tablaProductos';
import apiProd from '../../api/apiProd';

const ProductosPage = () => {
  const [productos, setProductos] = useState([]);
  const [editingProducto, setEditingProducto] = useState(null);

  useEffect(() => {
    cargarProductos();
  }, []);

  const cargarProductos = async () => {
    try {
      const data = await apiProd.obtenerProductos();
      setProductos(data);
    } catch (error) {
      console.error('Error al obtener productos:', error);
    }
  };

  const handleEditarClick = (producto) => {
    setEditingProducto(producto);
  };

  const handleCancelarEdicion = () => {
    setEditingProducto(null);
  };

  const handleGuardarEdicion = async (editedProducto) => {
    try {
      await apiProd.actualizarProducto(editedProducto);
      console.log('Producto actualizado exitosamente:', editedProducto);
      cargarProductos();
    } catch (error) {
      console.error('Error al actualizar producto:', error);
    }
  };

  const handleEliminarProducto = async (productoId) => {
    try {
      const response = await apiProd.eliminarProducto(productoId);
      if (response.status === 200) {
        console.log('Producto eliminado exitosamente:', productoId);
        cargarProductos();
      } else {
        console.error('Error al eliminar producto:', response.statusText);
      }
    } catch (error) {
      console.error('Error al eliminar producto:', error);
    }
  };

  return (
    <MainPageContainer>
      <h1>Productos</h1>
      {(editingProducto || !editingProducto) && (
        <ProductosRegistro
          onSubmit={async (formData) => {
            try {
                await apiProd.agregarProducto({
                name: formData.nombre,
                description: formData.descripcion,
                isPack: formData.isPack,
                productCategoryId: formData.categoriaId,
                brandId: formData.marcaId,
                productInPackId: formData.productoEnPackId,
                packUnits: formData.unidadesPack
              });
              console.log('Producto registrado exitosamente:', formData);
              cargarProductos();
            } catch (error) {
              console.error('Error al agregar producto:', error.message);
            }
          }}
          onCancel={handleCancelarEdicion}
        />
      )}
      <TablaProductos
        productos={productos}
        onEditarClick={handleEditarClick}
        onEliminarClick={handleEliminarProducto}
        handleGuardarEdicion={handleGuardarEdicion}
      />
    </MainPageContainer>
  );
};

export default ProductosPage;
