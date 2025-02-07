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
      const productosData = await apiProd.obtenerProductos();
      const productosOrdenados = productosData.sort((a, b) => a.id - b.id);
      setProductos(productosOrdenados);
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
      const productosActualizados = await apiProd.actualizarProducto(editedProducto);
      const productosOrdenados = productosActualizados.sort((a, b) => a.id - b.id);
      setProductos(productosOrdenados);
      setEditingProducto(null);
    } catch (error) {
      console.error('Error al actualizar producto:', error);
    }
  };

  const handleEliminarProducto = async (productoId) => {
    try {
      const productosActualizados = await apiProd.eliminarProducto(productoId);
      const productosOrdenados = productosActualizados.sort((a, b) => a.id - b.id);
      setProductos(productosOrdenados);
    } catch (error) {
      console.error('Error al eliminar producto:', error);
    }
  };

  return (
    <MainPageContainer>
      <h1>Productos</h1>
      {(editingProducto || !editingProducto) && (
        <ProductosRegistro
          categorias={productos.map(p => p.productCategory).filter(Boolean)}
          marcas={productos.map(p => p.brand).filter(Boolean)}
          onSubmit={async (formData) => {
            try {
              const productosActualizados = await apiProd.agregarProducto({
                name: formData.nombre,
                description: formData.descripcion,
                isPack: formData.isPack,
                productCategory: {
                  id: formData.categoriaId
                },
                productInPack: formData.isPack ? formData.productoEnPackId : null,
                packUnits: formData.isPack ? formData.unidadesPack : 0,
                brand: {
                  id: formData.marcaId
                }
              });
              const productosOrdenados = productosActualizados.sort((a, b) => a.id - b.id);
              setProductos(productosOrdenados);
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
