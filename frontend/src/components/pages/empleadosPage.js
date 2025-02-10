import React, { useState, useEffect, useCallback } from 'react';
import MainPageContainer from '../layout/mainpagecontainer';
import TablaEmpleados from '../tables/tablaEmpleados';
import EmpleadosRegistro from '../forms/empleadosRegistro';
import { 
  Alert, 
  Snackbar,
  Typography,
  Box
} from '@mui/material';
import apiEmpleados from '../../api/apiConfig';

const EmpleadosPage = () => {
  const [empleados, setEmpleados] = useState([]);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  const cargarEmpleados = useCallback(async () => {
    try {
      const data = await apiEmpleados.obtenerEmpleados();
      setEmpleados(data);
    } catch (error) {
      console.error('Error al cargar empleados:', error);
      mostrarMensaje('Error al cargar los empleados', 'error');
    }
  }, []);

  useEffect(() => {
    cargarEmpleados();
  }, [cargarEmpleados]);

  const handleSubmit = async (formData) => {
    try {
      await apiEmpleados.crearEmpleado(formData);
      mostrarMensaje('Empleado creado exitosamente');
      cargarEmpleados();
    } catch (error) {
      console.error('Error al crear empleado:', error);
      mostrarMensaje('Error al crear el empleado', 'error');
    }
  };

  const handleGuardarEdicion = async (empleadoEditado) => {
    try {
      await apiEmpleados.actualizarEmpleado(empleadoEditado);
      mostrarMensaje('Empleado actualizado exitosamente');
      cargarEmpleados();
    } catch (error) {
      console.error('Error al actualizar empleado:', error);
      mostrarMensaje('Error al actualizar el empleado', 'error');
    }
  };

  const handleEliminar = async (id) => {
    try {
      await apiEmpleados.eliminarEmpleado(id);
      mostrarMensaje('Empleado eliminado exitosamente');
      cargarEmpleados();
    } catch (error) {
      console.error('Error al eliminar empleado:', error);
      mostrarMensaje('Error al eliminar el empleado', 'error');
    }
  };

  const mostrarMensaje = (mensaje, severidad = 'success') => {
    setSnackbarMessage(mensaje);
    setSnackbarSeverity(severidad);
    setOpenSnackbar(true);
  };

  return (
    <MainPageContainer>
      <Box sx={{ p: 3 }}>
        <Typography variant="h5" gutterBottom>
          Gestión de Empleados
        </Typography>

        {/* Formulario de Registro */}
        <EmpleadosRegistro onSubmit={handleSubmit} />

        {/* Tabla de Empleados */}
        <TablaEmpleados
          empleados={empleados}
          handleGuardarEdicion={handleGuardarEdicion}
          onEliminarClick={handleEliminar}
        />
      </Box>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert 
          onClose={() => setOpenSnackbar(false)} 
          severity={snackbarSeverity}
          sx={{ width: '100%' }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </MainPageContainer>
  );
};

export default EmpleadosPage; 