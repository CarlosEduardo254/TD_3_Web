using System.ComponentModel.DataAnnotations;

namespace TD_3_Web.DTOs.Tarefa
{
    public class TarefaAtualizacaoDto
    {
        [Required(ErrorMessage = "O Título da tarefa é obrigatório.")]
        [StringLength(150, MinimumLength = 3, ErrorMessage = "O Título deve ter entre 3 e 150 caracteres.")]
        public string Titulo { get; set; }

        [Required(ErrorMessage = "O Prazo da tarefa é obrigatório.")]
        public DateTime? Prazo { get; set; }

        [Required(ErrorMessage = "O Status da tarefa é obrigatório.")]
        [RegularExpression("^(Pendente|Em Andamento|Concluído)$", ErrorMessage = "O Status deve ser 'Pendente', 'Em Andamento' ou 'Concluído'.")]
        public string Status { get; set; }

        public List<Guid> EtiquetaIds { get; set; } = new List<Guid>();
    }
    

    
}
