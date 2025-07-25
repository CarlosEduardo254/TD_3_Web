using System.ComponentModel.DataAnnotations;

namespace TD_3_Web.DTOs.Usuario
{
    public class CadastroUsuarioDTO
    {
        [Required(ErrorMessage = "O campo Nome é obrigatório.")]
        [StringLength(100, MinimumLength = 3, ErrorMessage = "O Nome deve ter entre 3 e 100 caracteres.")]
        public string nome { get; set; }

        [Required(ErrorMessage = "O campo Email é obrigatório.")]
        [EmailAddress(ErrorMessage = "O Email fornecido não é válido.")]
        public string email { get; set; }

        [Required(ErrorMessage = "O campo Senha é obrigatório.")]
        [StringLength(50, MinimumLength = 8, ErrorMessage = "A Senha deve ter entre 8 e 50 caracteres.")]
        public string senha { get; set; }

        [Required(ErrorMessage = "A confirmação de senha é obrigatória.")]
        [Compare("senha", ErrorMessage = "As senhas não conferem.")] 
        public string confirmacaoSenha { get; set; }
    }

}

