using TD_3_Web.Entities;

namespace TD_3_Web.Infrastructure.Repositories.Projeto
{
    public interface IProjetoRepository
    {
        Task<IEnumerable<Entities.Projeto>> GetProjetsoUsuario(Guid usuarioId);

        // Obtém um projeto específico pelo seu ID, mas também verifica se ele pertence ao usuário.
        Task<Entities.Projeto> GetProjetoId(Guid projetoId, Guid userId);

        Task CriarProjeto(Entities.Projeto projeto);

        void Deletar(Entities.Projeto projeto);

        
        void Atualizar(Entities.Projeto projeto);
    }
}
