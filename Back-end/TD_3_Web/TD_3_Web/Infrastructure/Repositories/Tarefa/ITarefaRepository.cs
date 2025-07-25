namespace TD_3_Web.Infrastructure.Repositories.Tarefa
{
    public interface ITarefaRepository
    {
        
        Task<IEnumerable<Entities.Tarefa>> GetTodosProjetoId(Guid projetoId);

        
        Task<Entities.Tarefa?> GetTarefaId(Guid tarefaId, Guid projetoId);

        
        void CriarTarefa(Entities.Tarefa tarefa);

        void AtualizarTarefa(Entities.Tarefa tarefa);

        
        void DeletarTarefa(Entities.Tarefa tarefa);
        Task<IEnumerable<Entities.Tarefa>> ObterTodasPorUsuarioAsync(Guid usuarioId);
    }
}
