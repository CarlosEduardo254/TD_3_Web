using Microsoft.AspNetCore.Mvc;
using TD_3_Web.DTOs.Usuario;
using TD_3_Web.Infrastructure.Repositories;
using TD_3_Web.Services;
using TD_3_Web.Services.Usuario;

namespace TD_3_Web.Controllers
{
    public class AuthController : ControllerBase
    {
        private readonly IUsuarioService _usuarioService;
        private readonly ITokenService _tokenService;

        public AuthController(IUsuarioService usuarioService, ITokenService tokenService)
        {
            _usuarioService = usuarioService;
            _tokenService = tokenService;
        }
        [HttpPost("login")] 
        public async Task<IActionResult> Login([FromBody] LoginDTO loginDto)
        {
            var usuario = await _usuarioService.AutenticarAsync(loginDto.Email, loginDto.Senha);

            if (usuario == null)
            {
                return Unauthorized(new { message = "Email ou senha inválidos." });
            }

            var token = _tokenService.GerarToken(usuario);

            return Ok(new { token = token });
        }
    }
}
