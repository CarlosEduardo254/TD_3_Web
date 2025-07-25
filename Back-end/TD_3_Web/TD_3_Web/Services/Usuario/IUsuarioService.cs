using TD_3_Web.DTOs.Usuario;

namespace TD_3_Web.Services.Usuario
{
    public interface IUsuarioService
    {
        Task<(Entities.Usuario, string? Erro)> RegistrarAsync(CadastroUsuarioDTO dto);
        Task<Entities.Usuario> AutenticarAsync(string email, string senha);
        Task<Entities.Usuario?> GetInfoUsuario(Guid id);
    }
}
