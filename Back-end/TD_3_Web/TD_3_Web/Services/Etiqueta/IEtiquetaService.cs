using TD_3_Web.DTOs.Etiqueta;

namespace TD_3_Web.Services.Etiqueta
{
    public interface IEtiquetaService
    {
        Task<IEnumerable<Entities.Etiqueta>> ObterTodasPorUsuarioAsync(Guid usuarioId);
        Task<Entities.Etiqueta?> ObterPorIdAsync(Guid etiquetaId, Guid usuarioId);
        Task<Entities.Etiqueta> CriarNovaEtiquetaAsync(EtiquetaCriacaoDto etiquetaDto, Guid usuarioId);
        Task<bool> AtualizarEtiquetaAsync(Guid etiquetaId, EtiquetaAtualizacaoDto etiquetaDto, Guid usuarioId);
        Task<bool> DeletarEtiquetaAsync(Guid etiquetaId, Guid usuarioId);
    }
}
