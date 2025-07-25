using TD_3_Web.DTOs.Etiqueta;

namespace TD_3_Web.DTOs.Tarefa
{
    public class TarefaRetornoDto
    {
        public Guid Id { get; set; }
        public string Titulo { get; set; }
        public DateTime Prazo { get; set; }
        public string Status { get; set; }
        public Guid ProjetoId { get; set; }

        public ICollection<EtiquetaRetornoDTO> Etiquetas { get; set; } = new List<EtiquetaRetornoDTO>();
    }
}
