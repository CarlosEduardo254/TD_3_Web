using TD_3_Web.DTOs.Dashboard;

namespace TD_3_Web.Services.Dashboard
{
    public interface IDashboardService
    {
        Task<DashboardStatsDto> ObterEstatisticasDoUsuarioAsync(Guid usuarioId);
    }
}
