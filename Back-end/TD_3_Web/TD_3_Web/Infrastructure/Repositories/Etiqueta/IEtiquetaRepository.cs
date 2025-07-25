using TD_3_Web.Entities;

namespace TD_3_Web.Infrastructure.Repositories.Etiqueta
{
    public interface IEtiquetaRepository
    {
        
        Task<IEnumerable<Entities.Etiqueta>> GetEtiqutasUsuario(Guid usuarioId);

        Task<Entities.Etiqueta?> GetEtiquetaId(Guid etiquetaId, Guid usuarioId);

        
        void AdicionarEtiqueta(Entities.Etiqueta etiqueta);

        
        void Atualizar(Entities.Etiqueta etiqueta);

        
        void Deletar(Entities.Etiqueta etiqueta);
    }
}
