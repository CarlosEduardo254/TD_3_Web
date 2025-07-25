using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using TD_3_Web.DTOs.Etiqueta;
using TD_3_Web.Services.Etiqueta;

namespace TD_3_Web.Controllers
{
    [ApiController]
    [Route("api/etiquetas")]
    [Authorize]
    public class EtiquetasController : ControllerBase 
    {
        private readonly IEtiquetaService _etiquetaService;

        public EtiquetasController(IEtiquetaService etiquetaService)
        {
            _etiquetaService = etiquetaService;
        }

        // GET: /api/etiquetas
        [HttpGet]
        public async Task<IActionResult> ListarEtiquetasDoUsuario()
        {
            var usuarioId = GetCurrentUserId();
            var etiquetas = await _etiquetaService.ObterTodasPorUsuarioAsync(usuarioId);

            var etiquetasDto = etiquetas.Select(e => new EtiquetaRetornoDTO
            {
                Id = e.Id,
                Nome = e.Nome,
                Cor = e.Cor
            });

            return Ok(etiquetasDto);
        }

        // GET: /api/etiquetas/{id}
        [HttpGet("{id}", Name = "GetEtiquetaPorId")]
        public async Task<IActionResult> GetEtiquetaPorId(Guid id)
        {
            var usuarioId = GetCurrentUserId();
            var etiqueta = await _etiquetaService.ObterPorIdAsync(id, usuarioId);

            if (etiqueta == null)
            {
                return NotFound();
            }

            var etiquetaDto = new EtiquetaRetornoDTO
            {
                Id = etiqueta.Id,
                Nome = etiqueta.Nome,
                Cor = etiqueta.Cor
            };

            return Ok(etiquetaDto);
        }

        // POST: /api/adicionarEtiqueta
        [HttpPost("adicionarEtiqueta")]
        public async Task<IActionResult> CriarEtiqueta([FromBody] EtiquetaCriacaoDto etiquetaCriacaoDto)
        {
            var usuarioId = GetCurrentUserId();
            var novaEtiqueta = await _etiquetaService.CriarNovaEtiquetaAsync(etiquetaCriacaoDto, usuarioId);

            var EtiquetaRetornoDTO = new EtiquetaRetornoDTO
            {
                Id = novaEtiqueta.Id,
                Nome = novaEtiqueta.Nome,
                Cor = novaEtiqueta.Cor
            };

            return CreatedAtAction(nameof(GetEtiquetaPorId), new { id = EtiquetaRetornoDTO.Id }, EtiquetaRetornoDTO);
        }

        // PUT: /api/etiquetas/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> AtualizarEtiqueta(Guid id, [FromBody] EtiquetaAtualizacaoDto etiquetaAtualizacaoDto)
        {
            var usuarioId = GetCurrentUserId();
            var sucesso = await _etiquetaService.AtualizarEtiquetaAsync(id, etiquetaAtualizacaoDto, usuarioId);

            if (!sucesso)
            {
                return NotFound();
            }

            return NoContent();
        }

        // DELETE: /api/etiquetas/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletarEtiqueta(Guid id)
        {
            var usuarioId = GetCurrentUserId();
            var sucesso = await _etiquetaService.DeletarEtiquetaAsync(id, usuarioId);

            if (!sucesso)
            {
                return NotFound();
            }

            return NoContent();
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
