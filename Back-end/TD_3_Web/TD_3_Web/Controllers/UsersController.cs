using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using TD_3_Web.DTOs.Usuario;
using TD_3_Web.Entities;
using TD_3_Web.Infrastructure.Repositories;
using TD_3_Web.Services.Usuario;

namespace TD_3_Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly IUsuarioService _usuarioService;

        public UsersController(IUsuarioService usuarioService)
        {
            _usuarioService = usuarioService ?? throw new ArgumentNullException(nameof(usuarioService));
        }

        [HttpPost("registrar")]
        public async Task<IActionResult> RegistrarUsuario(CadastroUsuarioDTO cadastroUsuario)
        {
            var (usuario, erro) = await _usuarioService.RegistrarAsync(cadastroUsuario);

            if (erro != null)
            {
                return Conflict(new { message = erro });
            }

            var resposta = new PerfilUsuarioDto
            {
                Id = usuario.Id,
                Nome = usuario.Nome,
                Email = usuario.Email
            };

            return CreatedAtAction(nameof(ObterUsuarioPorId), new { id = resposta.Id }, resposta);
        }

        [HttpGet("{id}", Name = "ObterUsuarioPorId")]
        [Authorize]
        public async Task<IActionResult> ObterUsuarioPorId(Guid id)
        {
            var usuario = await _usuarioService.GetInfoUsuario(id);

            if (usuario == null)
            {
                return NotFound(new { message = "Usuário não encontrado." });
            }

            var resposta = new PerfilUsuarioDto
            {
                Id = usuario.Id,
                Nome = usuario.Nome,
                Email = usuario.Email
            };

            return Ok(resposta);
        }
    }
}
