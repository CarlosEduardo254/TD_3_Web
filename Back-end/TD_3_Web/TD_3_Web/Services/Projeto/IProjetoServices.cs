using TD_3_Web.DTOs.Projeto;

namespace TD_3_Web.Services.Projeto
{
    public interface IProjetoServices
    {
        Task<IEnumerable<Entities.Projeto>> ObterTodosPorUsuarioAsync(Guid usuarioId);
        Task<Entities.Projeto> ObterPorIdAsync(Guid projetoId, Guid usuarioId);
        Task<Entities.Projeto> CriarNovoProjetoAsync(ProjetoCriacaoDto projetoDto, Guid usuarioId);
        Task<bool> AtualizarProjetoAsync(Guid projetoId, ProjetoAtualizacaoDto projetoDto, Guid usuarioId);
        Task<bool> DeletarProjetoAsync(Guid projetoId, Guid usuarioId);             
    }
}
