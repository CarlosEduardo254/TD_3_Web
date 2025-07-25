using TD_3_Web.Entities;

namespace TD_3_Web.Infrastructure.Repositories.Usuario
{
    public interface IUserRepository
    {
        Task Add(Entities.Usuario usuario);
        
        Task<Entities.Usuario?> InfoUsuario(Guid id);


        Task<Entities.Usuario> ObterPorEmailAsync(string email);

    }
}
