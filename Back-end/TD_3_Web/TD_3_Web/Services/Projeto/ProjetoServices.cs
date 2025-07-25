using TD_3_Web.DTOs.Projeto;
using TD_3_Web.Infrastructure.Database;
using TD_3_Web.Infrastructure.Repositories.Projeto;

namespace TD_3_Web.Services.Projeto
{
    public class ProjetoServices : IProjetoServices
    {
        private readonly IProjetoRepository _projetoRepository;
        private readonly AppDBContext _context; // Injetamos o DbContext para salvar

        public ProjetoServices(IProjetoRepository projetoRepository, AppDBContext context)
        {
            _projetoRepository = projetoRepository;
            _context = context;
        }

        public async Task<IEnumerable<Entities.Projeto>> ObterTodosPorUsuarioAsync(Guid usuarioId)
        {
            return await _projetoRepository.GetProjetsoUsuario(usuarioId);
        }

        public async Task<Entities.Projeto> ObterPorIdAsync(Guid projetoId, Guid usuarioId)
        {
            return await _projetoRepository.GetProjetoId(projetoId, usuarioId);
        }

        public async Task<Entities.Projeto> CriarNovoProjetoAsync(ProjetoCriacaoDto projetoDto, Guid usuarioId)
        {
            var novoProjeto = new Entities.Projeto(
                projetoDto.Titulo,
                projetoDto.Descricao,
                usuarioId
            );

            _projetoRepository.CriarProjeto(novoProjeto);
            await _context.SaveChangesAsync();

            return novoProjeto;
        }

        public async Task<bool> AtualizarProjetoAsync(Guid projetoId, ProjetoAtualizacaoDto projetoDto, Guid usuarioId)
        {
            var projetoExistente = await _projetoRepository.GetProjetoId(projetoId, usuarioId);

            if (projetoExistente == null)
            {
                return false; // Não encontrado ou não autorizado
            }

            projetoExistente.AtualizarDetalhes(projetoDto.Titulo, projetoDto.Descricao);

            _projetoRepository.Atualizar(projetoExistente);
            await _context.SaveChangesAsync();

            return true;
        }

        public async Task<bool> DeletarProjetoAsync(Guid projetoId, Guid usuarioId)
        {
            var projetoParaDeletar = await _projetoRepository.GetProjetoId(projetoId, usuarioId);

            if (projetoParaDeletar == null)
            {
                return false;
            }

            _projetoRepository.Deletar(projetoParaDeletar);
            await _context.SaveChangesAsync();

            return true;
        }
    }
}
