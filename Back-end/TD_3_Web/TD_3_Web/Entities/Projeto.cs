namespace TD_3_Web.Entities
{
    public class Projeto
    {
        public Guid Id { get; init; }
        public string Titulo { get; internal set; }
        public string Descricao { get; internal set; }

        // Relacionamento: Um projeto pertence a um usuário (Criador)
        public Guid UsuarioId { get; private set; }
        public Usuario? Usuario { get; private set; }

        // Relacionamento: Um projeto contém várias tarefas
        public ICollection<Tarefa> Tarefas { get; private set; } = new List<Tarefa>();

        public Projeto()
        {
        }

        public Projeto(string titulo, string descricao, Guid usuarioId)
        {
            Id = Guid.NewGuid();
            Titulo = titulo;
            Descricao = descricao;
            UsuarioId = usuarioId;
        }

        
        public void AtualizarDetalhes(string? novoTitulo, string? novaDescricao)
        {
            
            Titulo = novoTitulo;
            Descricao = novaDescricao;
        }
    }
}
