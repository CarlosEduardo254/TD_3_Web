namespace TD_3_Web.Entities
{
    public class Tarefa
    {
        public Guid Id { get; init; }
        public string Titulo { get; private set; }
        public DateTime Prazo { get; private set; }
        public string Status { get; private set; }

        // Relacionamento: Uma tarefa pertence a um projeto
        public Guid ProjetoId { get; private set; }
        public Projeto Projeto { get; private set; }

        // Relacionamento: Uma tarefa pode ter várias etiquetas (Muitos-para-Muitos)
        public ICollection<Etiqueta> Etiquetas { get; private set; } = new List<Etiqueta>();

        public Tarefa()
        {
        }

        public Tarefa(string titulo, DateTime prazo, string status, Guid projetoId)
        {
            Id = Guid.NewGuid();
            Titulo = titulo;
            Prazo = prazo;
            Status = status;
            ProjetoId = projetoId;
        }

        public void AtualizarDetalhes(string novoTitulo, string novoStatus, DateTime? novoPrazo)
        {
            Titulo = novoTitulo;
            Status = novoStatus;
            Prazo = (DateTime)novoPrazo;
        }
        public void MoverParaProjeto(Guid novoProjetoId)
        {
            ProjetoId = novoProjetoId;
        }

        public void SincronizarEtiquetas(ICollection<Etiqueta> novasEtiquetas)
        {
            Etiquetas.Clear();
            if (novasEtiquetas == null || !novasEtiquetas.Any())
            {
                return;
            }

            foreach (var etiqueta in novasEtiquetas)
            {
                Etiquetas.Add(etiqueta);
            }
        }

    }
}
