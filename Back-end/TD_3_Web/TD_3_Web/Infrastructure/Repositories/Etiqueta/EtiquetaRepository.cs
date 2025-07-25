using Microsoft.EntityFrameworkCore;
using TD_3_Web.Entities;
using TD_3_Web.Infrastructure.Database;

namespace TD_3_Web.Infrastructure.Repositories.Etiqueta
{
    public class EtiquetaRepository : IEtiquetaRepository
    {
        private readonly AppDBContext _context;
        public EtiquetaRepository(AppDBContext context)
        {
            _context = context ?? throw new ArgumentNullException(nameof(context));
        }


        public async Task<IEnumerable<Entities.Etiqueta>> GetEtiqutasUsuario(Guid usuarioId)
        {
            return await _context.Etiquetas
                .Where(e => e.UsuarioId == usuarioId)
                .ToListAsync();
        }

        public async Task<Entities.Etiqueta?> GetEtiquetaId(Guid etiquetaId, Guid usuarioId)
        {
            return await _context.Etiquetas
                .FirstOrDefaultAsync(e => e.Id == etiquetaId && e.UsuarioId == usuarioId);
        }

        public void AdicionarEtiqueta(Entities.Etiqueta etiqueta)
        {
            if (etiqueta == null) throw new ArgumentNullException(nameof(etiqueta));
            _context.Etiquetas.Add(etiqueta);
        }

        public void Atualizar(Entities.Etiqueta etiqueta)
        {
            _context.Etiquetas.Update(etiqueta);
        }

        public void Deletar(Entities.Etiqueta etiqueta)
        {
            _context.Etiquetas.Remove(etiqueta);
        }
    }
}
