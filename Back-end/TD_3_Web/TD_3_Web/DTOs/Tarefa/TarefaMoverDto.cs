using System.ComponentModel.DataAnnotations;

namespace TD_3_Web.DTOs.Tarefa
{
    public class TarefaMoverDto
    {
        [Required]
        public Guid NovoProjetoId { get; set; }
    }
}
