using TD_3_Web.DTOs.Dashboard;
using TD_3_Web.Infrastructure.Repositories.Etiqueta;
using TD_3_Web.Infrastructure.Repositories.Projeto;
using TD_3_Web.Infrastructure.Repositories.Tarefa;

namespace TD_3_Web.Services.Dashboard
{
    public class DashboardService : IDashboardService
    {
        private readonly IProjetoRepository _projetoRepository;
        private readonly IEtiquetaRepository _etiquetaRepository;
        private readonly ITarefaRepository _tarefaRepository;

        public DashboardService(
            IProjetoRepository projetoRepository,
            IEtiquetaRepository etiquetaRepository,
            ITarefaRepository tarefaRepository)
        {
            _projetoRepository = projetoRepository;
            _etiquetaRepository = etiquetaRepository;
            _tarefaRepository = tarefaRepository;
        }

        public async Task<DashboardStatsDto> ObterEstatisticasDoUsuarioAsync(Guid usuarioId)
        {
            var projetosTask = _projetoRepository.GetProjetsoUsuario(usuarioId);
            var etiquetasTask = _etiquetaRepository.GetEtiqutasUsuario(usuarioId);
            var tarefasTask = _tarefaRepository.ObterTodasPorUsuarioAsync(usuarioId);

            await Task.WhenAll(projetosTask, etiquetasTask, tarefasTask);

            var projetos = await projetosTask;
            var etiquetas = await etiquetasTask;
            var tarefas = await tarefasTask;

            var stats = new DashboardStatsDto
            {
                TotalDeProjetos = projetos.Count(),
                TotalDeEtiquetas = etiquetas.Count(),
                TotalDeTarefas = tarefas.Count(),
                TarefasPendentes = tarefas.Count(t => t.Status == "Pendente")
            };

            return stats;
        }
    }
}
