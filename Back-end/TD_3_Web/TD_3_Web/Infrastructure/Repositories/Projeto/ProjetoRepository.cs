using Microsoft.EntityFrameworkCore;
using TD_3_Web.Entities;
using TD_3_Web.Infrastructure.Database;

namespace TD_3_Web.Infrastructure.Repositories.Projeto
{
    public class ProjetoRepository : IProjetoRepository
    {
        private readonly AppDBContext _context;

        public ProjetoRepository(AppDBContext context)
        {
            _context = context ?? throw new ArgumentNullException(nameof(context));
        }


        public async Task<IEnumerable<Entities.Projeto>> GetProjetsoUsuario(Guid usuarioId)
        {
            return await _context.Projetos
                .Where(p => p.UsuarioId == usuarioId)
                .ToListAsync();
        }

        public async Task<Entities.Projeto> GetProjetoId(Guid projetoId, Guid userId)
        {
            return await _context.Projetos
                .FirstOrDefaultAsync(p => p.Id == projetoId && p.UsuarioId == userId);
        }

        public async Task CriarProjeto(Entities.Projeto projeto)
        {
            await _context.Projetos.AddAsync(projeto);
            
        }

        public void Deletar(Entities.Projeto projeto)
        {
            var tarefasDoProjeto = _context.Tarefas
                .Where(t => t.ProjetoId == projeto.Id);
            _context.Tarefas.RemoveRange(tarefasDoProjeto);
            _context.Projetos.Remove(projeto);
            
        }

        public void Atualizar(Entities.Projeto projeto)
        {
            _context.Projetos.Update(projeto);
            
        }
    }
}
