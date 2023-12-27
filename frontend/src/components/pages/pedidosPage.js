import React from "react";
import MainPageContainer from "../layout/mainpagecontainer";
import FormularioCompras from "../forms/compraRegistro";

const PedidosPage = () => {
    return (
        <MainPageContainer>
        <h1>Pedidos</h1>
        <FormularioCompras />
        </MainPageContainer>
    );
    }

export default PedidosPage;