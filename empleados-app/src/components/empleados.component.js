import React, { Component } from "react";
import { Navigate } from "react-router-dom";
import AuthService from "../services/auth.service";
import EmpleadoService from "../services/empleado.service";

export default class EmpleadosComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      redirect: null,
      empleados: [],
      successful: false,
      message: ""
    };
  }

  listarEmpleados() {
    EmpleadoService.getEmpleados().then(
      response => {
        if (!response.data || response.data.length < 1) {
          this.setState({
            empleados : [],
            successful: false,
            message: 'No hay empleados para listar'
          });
        } else {
          this.setState({
            empleados: response.data
          });
        }
      },
      error => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.error) ||
          error.message ||
          error.toString();
        this.setState({
          successful: false,
          message: resMessage
        });
      }
    );
  }

  eliminarEmpleado(id) {
    this.setState({
      empleados : [],
      message: "Eliminado empleado",
      successful: false
    });
    EmpleadoService.deleteEmpleado(id).then(response => {
      this.setState({
        successful: true,
        message: 'Usuario eliminado: ' + response.data.empleado.nombre
      });
      this.listarEmpleados();
    },
      error => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.error) ||
          error.message ||
          error.toString();
        this.setState({
          empleados : [],
          successful: false,
          message: resMessage
        });
      });
  }

  componentDidMount() {
    const currentUser = AuthService.getCurrentUser();
    if (!currentUser) this.setState({ redirect: "/login" });
    this.listarEmpleados();
  }

  render() {
    if (this.state.redirect) {
      return <Navigate to={this.state.redirect} />
    }
    return (
      <div>
        <header className="blockquote text-center">
          <h1>Listado de empleados</h1>
        </header>
        <div className='d-grid gap-2'>
          {this.state.message && (
            <div
              className={
                this.state.successful
                  ? "alert alert-success"
                  : "alert alert-danger"
              }
              role="alert"
            >
              {this.state.message}
            </div>
          )}
        </div>
        {this.state.empleados.length > 0 && (
          <table className='table table-striped'>
            <thead className='bg-primary text-white'>
              <tr>
                <th>Nombre</th>
                <th>Apellido</th>
                <th>Puesto</th>
                <th>Acción</th>
              </tr>
            </thead>
            <tbody>
              {this.state.empleados.map((empleado) => (
                <tr key={empleado.id}>
                  <td>{empleado.nombre}</td>
                  <td>{empleado.apellido}</td>
                  <td>{empleado.puesto}</td>
                  <td>
                    <button onClick={ ()=>this.eliminarEmpleado(empleado.id)} className='btn btn-danger'>Eliminar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    );
  }
}
