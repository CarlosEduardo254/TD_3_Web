using System.ComponentModel.DataAnnotations;

namespace TD_3_Web.DTOs.Projeto
{
    public class ProjetoCriacaoDto
    {
        [Required(ErrorMessage = "O Título do projeto é obrigatório.")]
        [StringLength(100, MinimumLength = 3, ErrorMessage = "O Título deve ter entre 3 e 100 caracteres.")]
        public string Titulo { get; set; }

        [Required(ErrorMessage = "A Descrição do projeto é obrigatória.")]
        [StringLength(500, ErrorMessage = "A Descrição não pode exceder 500 caracteres.")]
        public string Descricao { get; set; }
    }
}
