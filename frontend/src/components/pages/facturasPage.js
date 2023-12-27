import React from "react";
import MainPageContainer from "../layout/mainpagecontainer";
import FormularioVentas from '../forms/ventaRegistro';

const FacturasPage = () => {
    return (
        <MainPageContainer>
        <h1>Facturas</h1>
        <FormularioVentas />
        </MainPageContainer>
    );
    }

export default FacturasPage;