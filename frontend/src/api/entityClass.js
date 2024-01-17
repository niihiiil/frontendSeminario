import axios from 'axios';
import Cookies from 'js-cookie';

class EntityClass {
  static async login({ email, password }) {
    try {
      const response = await axios.post('http://rsandy-001-site1.atempurl.com/api/authentication/login', {
        email,
        password,
      });

      const { accessToken } = response.data;

      // Almacena el token en una cookie
      Cookies.set('token', accessToken);

      // Adjunta el token a los encabezados de todas las solicitudes futuras
      axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;

      return response; 
    } catch (error) {
      throw new Error('Authentication error: ' + error.message);
    }
  }

  static async logout() {
    try {
      // Elimina la cookie y el token de los encabezados
      Cookies.remove('token');
      delete axios.defaults.headers.common['Authorization'];
    } catch (error) {
      console.error('Error logging out:', error);
    }
  }

  static async agregarUsuario(usuarioData) {
    try {
      const response = await axios.post('http://rsandy-001-site1.atempurl.com/api/user', usuarioData);
      console.log('Agregar Usuario:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error en agregarUsuario:', error);
      throw error;
    }
  }

  static async cambiarContraseña(passwordData) {
    try {
      const response = await axios.post('http://rsandy-001-site1.atempurl.com/api/user/password', passwordData);

      console.log('Cambio de contraseña exitoso:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error en cambiarContraseña:', error);
      throw error;
    }
  }
}



export default EntityClass;
