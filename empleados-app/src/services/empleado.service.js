import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8000/api/empleado/';

class EmpleadoService {
    getEmpleados() {
      return axios.get(API_URL, { headers: authHeader() });
    }
  
    deleteEmpleado(id) {
      return axios.delete(API_URL + id, { headers: authHeader() });
    }
  }
  
  export default new EmpleadoService();