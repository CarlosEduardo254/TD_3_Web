namespace TD_3_Web.Entities
{
    public class Usuario
    {
        public Guid Id { get; init; }
        public string Nome { get; private set; }
        public string Email { get; private set; }
        public string Senha { get; private set; }

        public ICollection<Projeto> Projetos { get; private set; } = new List<Projeto>();
        public ICollection<Etiqueta> Etiquetas { get; private set; } = new List<Etiqueta>();

        public Usuario()
        {
        }

        public Usuario(string nome, string email, string senha)
        {
            Id = Guid.NewGuid();
            Nome = nome ?? throw new ArgumentNullException(nameof(nome));
            Email = email ?? throw new ArgumentNullException(nameof(email));
            Senha = senha ?? throw new ArgumentNullException(nameof(senha));
        }
    }
}
