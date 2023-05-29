using EmpleadosAPI.Data;
using EmpleadosAPI.Models;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;

namespace EmpleadosAPI.Service
{
    public class EmpleadoService : IEmpleadoService
    {
        private readonly DataContext _dbContext;

        public EmpleadoService(DataContext dbContext)
        {
            _dbContext = dbContext;
        }
        
        public async Task<Empleado> ActualizarEmpleado(Empleado empleado)
        {
            var parameter = new List<SqlParameter>();
            parameter.Add(new SqlParameter("@id", empleado.Id));
            parameter.Add(new SqlParameter("@nombre", empleado.Nombre));
            parameter.Add(new SqlParameter("@apellido", empleado.Apellido));
            parameter.Add(new SqlParameter("@puesto", empleado.Puesto));

            var empleadoResult = await Task.Run(() =>  _dbContext.Empleado
           .FromSqlRaw(
            @"exec modificarEmpleado @id, @nombre, @apellido, @puesto", 
            parameter.ToArray())
            .AsEnumerable().First());

            return empleadoResult;
        }

        public async  Task<Empleado> GuardarEmpleado(Empleado empleado)
        {
            var parameter = new List<SqlParameter>();
            parameter.Add(new SqlParameter("@nombre", empleado.Nombre));
            parameter.Add(new SqlParameter("@apellido", empleado.Apellido));
            parameter.Add(new SqlParameter("@puesto", empleado.Puesto));

            var empleadoResult = await Task.Run(() =>  _dbContext.Empleado
           .FromSqlRaw(
            @"exec agregarEmpleado @nombre, @apellido, @puesto", 
            parameter.ToArray())
            .AsEnumerable().First());

            return empleadoResult;
        }
    }
}