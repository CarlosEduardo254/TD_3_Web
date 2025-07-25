using System.ComponentModel.DataAnnotations;

namespace TD_3_Web.DTOs.Usuario
{
    public class LoginDTO
    {
        [Required(ErrorMessage = "O campo Email é obrigatório.")]
        [EmailAddress(ErrorMessage = "O Email fornecido não é válido.")]
        public string Email { get; set; }

        [Required(ErrorMessage = "O campo Senha é obrigatório.")]
        public string Senha { get; set; }


    }
}
