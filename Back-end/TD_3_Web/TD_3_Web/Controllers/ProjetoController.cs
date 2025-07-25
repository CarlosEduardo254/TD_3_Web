using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using TD_3_Web.DTOs.Projeto;
using TD_3_Web.Services.Projeto;

namespace TD_3_Web.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class ProjetoController : ControllerBase
    {
        private readonly IProjetoServices _projetoServices;

        public ProjetoController(IProjetoServices projetoServices)
        {
            _projetoServices = projetoServices;
        }

        

        // GET: /api/projetos
        [HttpGet("Projetos")]
        public async Task<IActionResult> ListarProjetosDoUsuario()
        {
            var usuarioId = GetCurrentUserId();
            var projetos = await _projetoServices.ObterTodosPorUsuarioAsync(usuarioId);

            
            var projetosDto = projetos.Select(p => new ProjetoRetornoDto
            {
                Id = p.Id,
                Titulo = p.Titulo,
                Descricao = p.Descricao
            });

            return Ok(projetosDto);
        }

        // GET: /api/projetos/{id}
        [HttpGet("{id}", Name = "GetProjetoPorId")]
        public async Task<IActionResult> GetProjetoPorId(Guid id)
        {
            var usuarioId = GetCurrentUserId();
            var projeto = await _projetoServices.ObterPorIdAsync(id, usuarioId);

            if (projeto == null)
            {
                
                return NotFound();
            }

            var projetoDto = new ProjetoRetornoDto
            {
                Id = projeto.Id,
                Titulo = projeto.Titulo,
                Descricao = projeto.Descricao
            };

            return Ok(projetoDto);
        }

        // POST: /api/criaProjeto
        [HttpPost("criarProjeto")]
        public async Task<IActionResult> CriarProjeto([FromBody] ProjetoCriacaoDto projetoCriacaoDto)
        {
            var usuarioId = GetCurrentUserId();
            var novoProjeto = await _projetoServices.CriarNovoProjetoAsync(projetoCriacaoDto, usuarioId);

            var projetoRetornoDto = new ProjetoRetornoDto
            {
                Id = novoProjeto.Id,
                Titulo = novoProjeto.Titulo,
                Descricao = novoProjeto.Descricao
            };

            
            return CreatedAtAction(nameof(GetProjetoPorId), new { id = projetoRetornoDto.Id }, projetoRetornoDto);
        }

        // PUT: /api/projetos/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> AtualizarProjeto(Guid id, [FromBody] ProjetoAtualizacaoDto projetoAtualizacaoDto)
        {
            var usuarioId = GetCurrentUserId();
            var sucesso = await _projetoServices.AtualizarProjetoAsync(id, projetoAtualizacaoDto, usuarioId);

            if (!sucesso)
            {
                return NotFound();
            }

            
            return NoContent();
        }

        // DELETE: /api/projetos/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletarProjeto(Guid id)
        {
            var usuarioId = GetCurrentUserId();
            var sucesso = await _projetoServices.DeletarProjetoAsync(id, usuarioId);

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
