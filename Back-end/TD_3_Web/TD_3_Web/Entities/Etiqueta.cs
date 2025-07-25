namespace TD_3_Web.Entities
{
    public class Etiqueta
    {
        public Guid Id { get; init; }
        public string Nome { get; private set; }
        public string Cor { get; private set; }

        // Relacionamento: Uma etiqueta pertence a um usuário (Criador)
        public Guid UsuarioId { get; private set; }
        public Usuario Usuario { get; private set; }

        // Relacionamento: Uma etiqueta pode estar em várias tarefas (Muitos-para-Muitos)
        public ICollection<Tarefa> Tarefas { get; private set; } = new List<Tarefa>();


        public Etiqueta()
        {
        }

        public Etiqueta(string nome, string cor, Guid usuarioId)
        {
            Id = Guid.NewGuid();
            Nome = nome;
            Cor = cor;
            UsuarioId = usuarioId;
        }

        
        public void AtualizarDetalhes(string novoNome, string novaCor)
        {
            Nome = novoNome;
            Cor = novaCor;
        }
    }
}
