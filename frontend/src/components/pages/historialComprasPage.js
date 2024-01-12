import React from 'react';
import MainPageContainer from '../layout/mainpagecontainer';
import TablaCompras from '../tables/tablaCompras'; 

const HistorialComprasPage = () => {
  return (
    <MainPageContainer>
    
      <h2>Registro de Compras</h2>
         <TablaCompras
          />
    </MainPageContainer>
  );
};

export default HistorialComprasPage;
