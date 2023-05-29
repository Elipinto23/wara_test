using Microsoft.AspNetCore.Mvc;
using EmpleadosAPI.Service;
using EmpleadosAPI.Models;

namespace EmpleadosAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmpleadoController : ControllerBase
    {
        private readonly IEmpleadoService empleadoService;

        public EmpleadoController(IEmpleadoService empleadoService)
        {
            this.empleadoService = empleadoService;
        }

        [HttpPost(Name = "GuardarEmpleado")]
        public async Task<IActionResult> GuardarEmpleado(Empleado empleado)
        {
            if (empleado == null)
            {
                return BadRequest();
            }

            try
            {
                empleado.Id = null;
                var response = await empleadoService.GuardarEmpleado(empleado);

                return CreatedAtAction("GuardarEmpleado", response);
            }
            catch
            {
                throw;
            }
        }

        [HttpPut(Name = "ActualizarEmpleado")]
        public async Task<IActionResult> ActualizarEmpleado(Empleado empleado)
        {
            if (empleado == null)
            {
                return BadRequest();
            }

            try
            {
                var response = await empleadoService.ActualizarEmpleado(empleado);

                return Ok(response);
            }
            catch
            {
                throw;
            }
        }
    }
}