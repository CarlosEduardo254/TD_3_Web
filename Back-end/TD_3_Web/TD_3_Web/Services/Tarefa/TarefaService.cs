using Microsoft.EntityFrameworkCore;
using TD_3_Web.DTOs.Tarefa;
using TD_3_Web.Infrastructure.Database;
using TD_3_Web.Infrastructure.Repositories.Etiqueta;
using TD_3_Web.Infrastructure.Repositories.Projeto;
using TD_3_Web.Infrastructure.Repositories.Tarefa;

namespace TD_3_Web.Services.Tarefa
{
    public class TarefaService : ITarefaService
    {
        private readonly ITarefaRepository _tarefaRepository;
        private readonly IProjetoRepository _projetoRepository;
        private readonly IEtiquetaRepository _etiquetaRepository;
        private readonly AppDBContext _context;

        public TarefaService(
            ITarefaRepository tarefaRepository,
            IProjetoRepository projetoRepository,
            IEtiquetaRepository etiquetaRepository,
            AppDBContext context)
        {
            _tarefaRepository = tarefaRepository;
            _projetoRepository = projetoRepository;
            _etiquetaRepository = etiquetaRepository;
            _context = context;
        }

        public async Task<IEnumerable<Entities.Tarefa>?> ObterTodasPorProjeto(Guid projetoId, Guid usuarioId)
        {
            if (!await VerificarDonoDoProjeto(projetoId, usuarioId))
                return null;

            return await _tarefaRepository.GetTodosProjetoId(projetoId);
        }

        public async Task<Entities.Tarefa?> ObterPorId(Guid tarefaId, Guid projetoId, Guid usuarioId)
        {
            if (!await VerificarDonoDoProjeto(projetoId, usuarioId))
                return null;

            return await _tarefaRepository.GetTarefaId(tarefaId, projetoId);
        }

        public async Task<Entities.Tarefa?> CriarNovaTarefa(TarefaCriacaoDto tarefaDto, Guid projetoId, Guid usuarioId)
        {
            if (!await VerificarDonoDoProjeto(projetoId, usuarioId))
                return null;

            var novaTarefa = new Entities.Tarefa(
                tarefaDto.Titulo,
                tarefaDto.Prazo.Value,
                tarefaDto.Status,
                projetoId
            );

            if (tarefaDto.EtiquetaIds != null && tarefaDto.EtiquetaIds.Any())
            {
                var etiquetasParaAdicionar = await _context.Etiquetas
                    .Where(e => tarefaDto.EtiquetaIds.Contains(e.Id) && e.UsuarioId == usuarioId)
                    .ToListAsync();

                novaTarefa.SincronizarEtiquetas(etiquetasParaAdicionar);
            }

            _tarefaRepository.CriarTarefa(novaTarefa);

            await _context.SaveChangesAsync();

            return novaTarefa;
        }

        public async Task<bool> DeletarTarefa(Guid tarefaId, Guid projetoId, Guid usuarioId)
        {
            if (!await VerificarDonoDoProjeto(projetoId, usuarioId))
                return false;

            var tarefa = await _tarefaRepository.GetTarefaId(tarefaId, projetoId);
            if (tarefa == null)
                return false;

            _tarefaRepository.DeletarTarefa(tarefa);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> AtualizarTarefa(Guid tarefaId, Guid projetoId, TarefaAtualizacaoDto tarefaDto, Guid usuarioId)
        {
            if (!await VerificarDonoDoProjeto(projetoId, usuarioId))
                return false;

            var tarefa = await _context.Tarefas
                .Include(t => t.Etiquetas)
                .FirstOrDefaultAsync(t => t.Id == tarefaId && t.ProjetoId == projetoId);

            if (tarefa == null)
                return false;

            tarefa.AtualizarDetalhes(tarefaDto.Titulo, tarefaDto.Status, tarefaDto.Prazo.Value);

            var etiquetasParaSincronizar = await _context.Etiquetas
                .Where(e => tarefaDto.EtiquetaIds.Contains(e.Id) && e.UsuarioId == usuarioId)
                .ToListAsync();

            tarefa.SincronizarEtiquetas(etiquetasParaSincronizar);

            _tarefaRepository.AtualizarTarefa(tarefa);
            await _context.SaveChangesAsync();

            return true;
        }

        public async Task<bool> MoverTarefa(Guid tarefaId, Guid novoProjetoId, Guid usuarioId)
        {
            var tarefa = await _context.Tarefas.FindAsync(tarefaId);
            if (tarefa == null)
            {
                return false; 
            }

            if (!await VerificarDonoDoProjeto(tarefa.ProjetoId, usuarioId))
            {
                return false; 
            }

            if (!await VerificarDonoDoProjeto(novoProjetoId, usuarioId))
            {
                return false; 
            }

            tarefa.MoverParaProjeto(novoProjetoId);

            await _context.SaveChangesAsync();
            return true;
        }

        
        private async Task<bool> VerificarDonoDoProjeto(Guid projetoId, Guid usuarioId)
        {
            var projeto = await _projetoRepository.GetProjetoId(projetoId, usuarioId);
            return projeto != null;
        }


    }
}
