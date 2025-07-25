using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using TD_3_Web.Services.Dashboard;

namespace TD_3_Web.Controllers
{
    [ApiController]
    [Route("api/dashboard")]
    [Authorize]
    public class DashboardController : ControllerBase
    {
        private readonly IDashboardService _dashboardService;

        public DashboardController(IDashboardService dashboardService)
        {
            _dashboardService = dashboardService;
        }

        [HttpGet("stats")]
        public async Task<IActionResult> GetStats()
        {
            var usuarioId = GetCurrentUserId();
            var stats = await _dashboardService.ObterEstatisticasDoUsuarioAsync(usuarioId);
            return Ok(stats);
        }

        private Guid GetCurrentUserId()
        {
            var identity = HttpContext.User.Identity as ClaimsIdentity;
            if (identity != null)
            {
                var userClaims = identity.Claims;
                var idClaim = userClaims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier)?.Value;
                if (Guid.TryParse(idClaim, out Guid userId))
                {
                    return userId;
                }
            }
            throw new Exception("ID de usuário não encontrado no token.");
        }
    }
}
