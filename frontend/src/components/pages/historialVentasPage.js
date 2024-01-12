import React from 'react';
import MainPageContainer from '../layout/mainpagecontainer';
import TablaVentas from '../tables/tablaVentas';


const HistorialVentasPage = () => {
  return (
    <MainPageContainer>
    
      <h2>Registro de Ventas</h2>
       <TablaVentas/>
    </MainPageContainer>
  );
};

export default HistorialVentasPage;

