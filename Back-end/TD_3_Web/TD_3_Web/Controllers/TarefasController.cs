using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using TD_3_Web.DTOs.Etiqueta;
using TD_3_Web.DTOs.Tarefa;
using TD_3_Web.Services;

namespace TD_3_Web.Controllers
{
    [ApiController]
    [Route("api/projetos/{projetoId}/tarefas")]
    [Authorize]
    public class TarefasController : ControllerBase
    {
        private readonly ITarefaService _tarefaService;

        public TarefasController(ITarefaService tarefaService)
        {
            _tarefaService = tarefaService;
        }

        // GET: /api/projetos/{projetoId}/tarefas
        [HttpGet]
        public async Task<IActionResult> ListarTarefasDoProjeto(Guid projetoId)
        {
            var usuarioId = GetCurrentUserId();
            var tarefas = await _tarefaService.ObterTodasPorProjeto(projetoId, usuarioId);

            if (tarefas == null)
            {
                return NotFound(new { message = "Projeto não encontrado ou acesso não autorizado." });
            }

            var tarefasDto = tarefas.Select(t => MapearTarefaParaDto(t));

            return Ok(tarefasDto);
        }

        // GET: /api/projetos/{projetoId}/tarefas/{tarefaId}
        [HttpGet("{tarefaId}", Name = "GetTarefaPorId")]
        public async Task<IActionResult> GetTarefaPorId(Guid projetoId, Guid tarefaId)
        {
            var usuarioId = GetCurrentUserId();
            var tarefa = await _tarefaService.ObterPorId(tarefaId, projetoId, usuarioId);

            if (tarefa == null)
            {
                return NotFound();
            }

            return Ok(MapearTarefaParaDto(tarefa));
        }

        // POST: /api/projetos/{projetoId}/tarefas
        [HttpPost]
        public async Task<IActionResult> CriarTarefa(Guid projetoId, [FromBody] TarefaCriacaoDto tarefaDto)
        {
            var usuarioId = GetCurrentUserId();
            var novaTarefa = await _tarefaService.CriarNovaTarefa(tarefaDto, projetoId, usuarioId);

            if (novaTarefa == null)
            {
                return NotFound(new { message = "Projeto não encontrado ou acesso não autorizado para criar tarefa." });
            }

            var tarefaRetorno = MapearTarefaParaDto(novaTarefa);

            return CreatedAtAction(nameof(GetTarefaPorId), new { projetoId = projetoId, tarefaId = tarefaRetorno.Id }, tarefaRetorno);
        }

        // PUT: /api/projetos/{projetoId}/tarefas/{tarefaId}
        [HttpPut("{tarefaId}")]
        public async Task<IActionResult> AtualizarTarefa(Guid projetoId, Guid tarefaId, [FromBody] TarefaAtualizacaoDto tarefaDto)
        {
            var usuarioId = GetCurrentUserId();
            var sucesso = await _tarefaService.AtualizarTarefa(tarefaId, projetoId, tarefaDto, usuarioId);

            if (!sucesso)
            {
                return NotFound();
            }

            return NoContent();
        }


        // DELETE: /api/projetos/{projetoId}/tarefas/{tarefaId}
        [HttpDelete("{tarefaId}")]
        public async Task<IActionResult> DeletarTarefa(Guid projetoId, Guid tarefaId)
        {
            var usuarioId = GetCurrentUserId();
            var sucesso = await _tarefaService.DeletarTarefa(tarefaId, projetoId, usuarioId);

            if (!sucesso)
            {
                return NotFound();
            }

            return NoContent();
        }

        [HttpPost("/api/tarefas/{tarefaId}/mover")]
        public async Task<IActionResult> MoverTarefa(Guid tarefaId, [FromBody] TarefaMoverDto dto)
        {
            var usuarioId = GetCurrentUserId();
            var sucesso = await _tarefaService.MoverTarefa(tarefaId, dto.NovoProjetoId, usuarioId);

            if (!sucesso)
            {
                return NotFound();
            }

            return NoContent();
        }


        // --- MÉTODOS AUXILIARES ---

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

        private TarefaRetornoDto MapearTarefaParaDto(Entities.Tarefa tarefa)
        {
            return new TarefaRetornoDto
            {
                Id = tarefa.Id,
                Titulo = tarefa.Titulo,
                Prazo = tarefa.Prazo,
                Status = tarefa.Status,
                ProjetoId = tarefa.ProjetoId,
                Etiquetas = tarefa.Etiquetas.Select(e => new EtiquetaRetornoDTO
                {
                    Id = e.Id,
                    Nome = e.Nome,
                    Cor = e.Cor
                }).ToList()
            };
        }
    }
}
