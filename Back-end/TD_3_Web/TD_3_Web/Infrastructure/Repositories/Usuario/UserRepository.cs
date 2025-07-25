using Microsoft.EntityFrameworkCore;
using TD_3_Web.Entities;
using TD_3_Web.Infrastructure.Database;

namespace TD_3_Web.Infrastructure.Repositories.Usuario
{
    public class UserRepository : IUserRepository
    {
        private readonly AppDBContext _context;

        public UserRepository(AppDBContext context)
        {
            _context = context ?? throw new ArgumentNullException(nameof(context));
        }


        public async Task Add(Entities.Usuario usuario)
        {
            await _context.Usuarios.AddAsync(usuario);
        }

        public async Task<Entities.Usuario?> InfoUsuario(Guid id)
        {
            return await _context.Usuarios
                .FirstOrDefaultAsync(u => u.Id == id);
        }

        

        public async Task<Entities.Usuario> ObterPorEmailAsync(string email)
        {
            return await _context.Usuarios
                .FirstOrDefaultAsync(u => u.Email.ToLower() == email.ToLower());
        }
    }
}