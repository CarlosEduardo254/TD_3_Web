using TD_3_Web.DTOs.Etiqueta;
using TD_3_Web.Infrastructure.Database;
using TD_3_Web.Infrastructure.Repositories.Etiqueta;

namespace TD_3_Web.Services.Etiqueta
{
    public class EtiquetaService : IEtiquetaService
    {
        private readonly IEtiquetaRepository _etiquetaRepository;
        private readonly AppDBContext _context;

        public EtiquetaService(IEtiquetaRepository etiquetaRepository, AppDBContext context)
        {
            _etiquetaRepository = etiquetaRepository;
            _context = context;
        }

        public async Task<IEnumerable<Entities.Etiqueta>> ObterTodasPorUsuarioAsync(Guid usuarioId)
        {
            return await _etiquetaRepository.GetEtiqutasUsuario(usuarioId);
        }

        public async Task<Entities.Etiqueta?> ObterPorIdAsync(Guid etiquetaId, Guid usuarioId)
        {
            return await _etiquetaRepository.GetEtiquetaId(etiquetaId, usuarioId);
        }

        public async Task<Entities.Etiqueta> CriarNovaEtiquetaAsync(EtiquetaCriacaoDto etiquetaDto, Guid usuarioId)
        {
            var novaEtiqueta = new Entities.Etiqueta(
                etiquetaDto.Nome,
                etiquetaDto.Cor,
                usuarioId
            );

            _etiquetaRepository.AdicionarEtiqueta(novaEtiqueta);
            await _context.SaveChangesAsync();

            return novaEtiqueta;
        }

        public async Task<bool> AtualizarEtiquetaAsync(Guid etiquetaId, EtiquetaAtualizacaoDto etiquetaDto, Guid usuarioId)
        {
            var etiquetaExistente = await _etiquetaRepository.GetEtiquetaId(etiquetaId, usuarioId);

            if (etiquetaExistente == null)
            {
                return false; 
            }

            etiquetaExistente.AtualizarDetalhes(etiquetaDto.Nome, etiquetaDto.Cor);

            _etiquetaRepository.Atualizar(etiquetaExistente);
            await _context.SaveChangesAsync();

            return true;
        }

        public async Task<bool> DeletarEtiquetaAsync(Guid etiquetaId, Guid usuarioId)
        {
            var etiquetaParaDeletar = await _etiquetaRepository.GetEtiquetaId(etiquetaId, usuarioId);

            if (etiquetaParaDeletar == null)
            {
                return false;
            }

            _etiquetaRepository.Deletar(etiquetaParaDeletar);
            await _context.SaveChangesAsync();

            return true;
        }
    }
}
