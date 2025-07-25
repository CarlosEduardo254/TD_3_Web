using TD_3_Web.DTOs.Tarefa;

namespace TD_3_Web.Services
{
    public interface ITarefaService
    {
        Task<IEnumerable<Entities.Tarefa>?> ObterTodasPorProjeto(Guid projetoId, Guid usuarioId);
        Task<Entities.Tarefa?> ObterPorId(Guid tarefaId, Guid projetoId, Guid usuarioId);
        Task<Entities.Tarefa?> CriarNovaTarefa(TarefaCriacaoDto tarefaDto, Guid projetoId, Guid usuarioId);
        Task<bool> AtualizarTarefa(Guid tarefaId, Guid projetoId, TarefaAtualizacaoDto tarefaDto, Guid usuarioId);
        Task<bool> DeletarTarefa(Guid tarefaId, Guid projetoId, Guid usuarioId);
        Task<bool> MoverTarefa(Guid tarefaId, Guid novoProjetoId, Guid usuarioId);
    }
}
