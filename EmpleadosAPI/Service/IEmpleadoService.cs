using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using EmpleadosAPI.Models;

namespace EmpleadosAPI.Service
{
    public interface IEmpleadoService
    {
        public Task<Empleado> GuardarEmpleado(Empleado empleado);
        public Task<Empleado> ActualizarEmpleado(Empleado empleado);
    }
}