import React from 'react';
import { 
  Document, 
  Page, 
  Text, 
  View, 
  StyleSheet, 
  PDFViewer 
} from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#ffffff',
    padding: 30
  },
  header: {
    marginBottom: 20,
    borderBottom: 1,
    paddingBottom: 10
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 10
  },
  section: {
    margin: 10,
    padding: 10
  },
  row: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#000000',
    borderBottomStyle: 'solid',
    alignItems: 'center',
    height: 24,
    fontStyle: 'bold',
  },
  description: {
    width: '60%'
  },
  qty: {
    width: '10%'
  },
  rate: {
    width: '15%'
  },
  amount: {
    width: '15%'
  },
  totals: {
    marginTop: 20,
    paddingRight: 10,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  label: {
    width: 100,
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 30,
    right: 30,
    textAlign: 'center',
    borderTop: 1,
    paddingTop: 10
  }
});

const FacturaPDF = ({ venta, configuracion }) => {
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('es-NI', {
      style: 'currency',
      currency: 'NIO'
    }).format(amount);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <PDFViewer style={{ width: '100%', height: '600px' }}>
      <Document>
        <Page size="A4" style={styles.page}>
          {/* Encabezado */}
          <View style={styles.header}>
            <Text style={styles.title}>{configuracion.establishmentName}</Text>
            <Text>{configuracion.establismentDirection}</Text>
            <Text>Tel: {configuracion.establismentCellPhone}</Text>
            <Text>Email: {configuracion.establismentEmail}</Text>
          </View>

          {/* Información de la Factura */}
          <View style={styles.section}>
            <Text>Factura #: {venta.id}</Text>
            <Text>Fecha: {formatDate(venta.date)}</Text>
            <Text>Cliente: {`${venta.client.firstName} ${venta.client.firstLastName}`}</Text>
            <Text>Atendido por: {`${venta.employee.firstName} ${venta.employee.firstLastName}`}</Text>
          </View>

          {/* Detalles de Productos */}
          <View style={styles.section}>
            <View style={styles.row}>
              <Text style={styles.description}>Descripción</Text>
              <Text style={styles.qty}>Cant.</Text>
              <Text style={styles.rate}>Precio</Text>
              <Text style={styles.amount}>Total</Text>
            </View>

            {venta.details.map((detalle, index) => (
              <View key={index} style={styles.row}>
                <Text style={styles.description}>
                  {detalle.product.name}
                  {detalle.product.isPack && ` (Pack ${detalle.product.packUnits} unid.)`}
                </Text>
                <Text style={styles.qty}>{detalle.units}</Text>
                <Text style={styles.rate}>{formatCurrency(detalle.pricePerUnit)}</Text>
                <Text style={styles.amount}>{formatCurrency(detalle.finalPrice)}</Text>
              </View>
            ))}
          </View>

          {/* Totales */}
          <View style={styles.totals}>
            <View style={styles.totalRow}>
              <Text style={styles.label}>Subtotal:</Text>
              <Text>{formatCurrency(venta.subTotal)}</Text>
            </View>
            <View style={styles.totalRow}>
              <Text style={styles.label}>Descuento:</Text>
              <Text>{formatCurrency(venta.discountAmount)}</Text>
            </View>
            <View style={styles.totalRow}>
              <Text style={styles.label}>IVA ({configuracion.ivaPercentageOfSale}%):</Text>
              <Text>{formatCurrency(venta.ivaAmount)}</Text>
            </View>
            <View style={styles.totalRow}>
              <Text style={styles.label}>Total:</Text>
              <Text>{formatCurrency(venta.total)}</Text>
            </View>
          </View>

          {/* Pie de página */}
          <View style={styles.footer}>
            <Text>¡Gracias por su compra!</Text>
          </View>
        </Page>
      </Document>
    </PDFViewer>
  );
};

export default FacturaPDF; 