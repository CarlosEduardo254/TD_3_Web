namespace TD_3_Web.Services
{
    public interface ITokenService
    {
        string GerarToken(Entities.Usuario usuario);
    }
}
