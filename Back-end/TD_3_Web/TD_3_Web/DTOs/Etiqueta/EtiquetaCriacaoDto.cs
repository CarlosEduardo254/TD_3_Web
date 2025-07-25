using System.ComponentModel.DataAnnotations;

namespace TD_3_Web.DTOs.Etiqueta
{
    public class EtiquetaCriacaoDto
    {
        [Required(ErrorMessage = "O Nome da etiqueta é obrigatório.")]
        [StringLength(50, MinimumLength = 3, ErrorMessage = "O Nome deve ter entre 3 e 50 caracteres.")]
        public string Nome { get; set; }

        [Required(ErrorMessage = "A Cor da etiqueta é obrigatória.")]
        [RegularExpression(@"^#([A-Fa-f0-9]{6})$", ErrorMessage = "A Cor deve estar no formato hexadecimal de 6 dígitos (ex: #FF5733).")]
        public string Cor { get; set; }
    }
}
