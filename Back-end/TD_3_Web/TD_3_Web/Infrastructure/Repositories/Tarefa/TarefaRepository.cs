using Microsoft.EntityFrameworkCore;
using TD_3_Web.Infrastructure.Database;

namespace TD_3_Web.Infrastructure.Repositories.Tarefa
{
    public class TarefaRepository : ITarefaRepository
    {
        private readonly AppDBContext _context;

        public TarefaRepository(AppDBContext context)
        {
            _context = context ?? throw new ArgumentNullException(nameof(context));
        }

        public async Task<IEnumerable<Entities.Tarefa>> GetTodosProjetoId(Guid projetoId)
        {
            return await _context.Tarefas
                .Where(t => t.ProjetoId == projetoId)
                .ToListAsync();
        }

        public async Task<Entities.Tarefa?> GetTarefaId(Guid tarefaId, Guid projetoId)
        {
            return await _context.Tarefas
                .FirstOrDefaultAsync(t => t.Id == tarefaId && t.ProjetoId == projetoId);
        }

        public void CriarTarefa(Entities.Tarefa tarefa)
        {
            _context.Tarefas.Add(tarefa);
        }

        public void AtualizarTarefa(Entities.Tarefa tarefa)
        {
            _context.Tarefas.Update(tarefa);
        }

        public void DeletarTarefa(Entities.Tarefa tarefa)
        {
            _context.Tarefas.Remove(tarefa);
        }

        public async Task<IEnumerable<Entities.Tarefa>> ObterTodasPorUsuarioAsync(Guid usuarioId)
        {
            return await _context.Tarefas
                .Where(t => t.Projeto.UsuarioId == usuarioId)
                .ToListAsync();
        }
    }
}
