using TD_3_Web.DTOs.Usuario;
using TD_3_Web.Infrastructure.Database;
using TD_3_Web.Infrastructure.Repositories.Usuario;

namespace TD_3_Web.Services.Usuario
{
    public class UsuarioService : IUsuarioService
    {
        private readonly IUserRepository _userRepository;
        private readonly AppDBContext _context;

        public UsuarioService(IUserRepository userRepository, AppDBContext context)
        {
            _userRepository = userRepository ?? throw new ArgumentNullException(nameof(userRepository));
            _context = context;
        }

        public async Task<(Entities.Usuario, string? Erro)> RegistrarAsync(CadastroUsuarioDTO dto)
        {
            var usuarioExistente = await _userRepository.ObterPorEmailAsync(dto.email);
            if (usuarioExistente != null)
            {
                return (null, "Este email já está em uso.");
            }

            
            string senhaHash = BCrypt.Net.BCrypt.HashPassword(dto.senha);
            var novoUsuario = new Entities.Usuario(dto.nome, dto.email, senhaHash);

            await _userRepository.Add(novoUsuario);
            await _context.SaveChangesAsync(); 

            return (novoUsuario, null);
        }

        




        public async Task<Entities.Usuario> AutenticarAsync(string email, string senha)
        {
            var usuario = await _userRepository.ObterPorEmailAsync(email);

            if (usuario == null)
            {
                return null;
            }

            if (!BCrypt.Net.BCrypt.Verify(senha, usuario.Senha))
            {
                return null;
            }

            return usuario;
        }

        public async Task<Entities.Usuario?> GetInfoUsuario(Guid id)
        {
            return await _userRepository.InfoUsuario(id);
        }
    }
}
