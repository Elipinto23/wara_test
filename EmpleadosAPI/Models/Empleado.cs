using System.ComponentModel.DataAnnotations.Schema;

namespace EmpleadosAPI.Models
{
    public class Empleado
    {
        public long? Id {get; set;}
        public string Nombre {get; set;} = string.Empty;
        public string Apellido {get; set;} = string.Empty;
        public string Puesto {get; set;} = string.Empty;
        [Column("created_at")]
        public DateTime? CreatedAt {get; set;}
        [Column("updated_at")]
        public DateTime? UpdatedAt {get; set;}
    }
}