using Microsoft.EntityFrameworkCore;
using TD_3_Web.Entities;

namespace TD_3_Web.Infrastructure.Database
{
    public class AppDBContext : DbContext
    {
        public AppDBContext(DbContextOptions<AppDBContext> options) : base(options)
        {

        }


        public DbSet<Usuario> Usuarios { get; set; }
        public DbSet<Projeto> Projetos { get; set; }
        public DbSet<Tarefa> Tarefas { get; set; }
        public DbSet<Etiqueta> Etiquetas { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Relacionamento 1-N: Usuario -> Projeto
            modelBuilder.Entity<Projeto>()
                .HasOne(p => p.Usuario)
                .WithMany(u => u.Projetos)
                .HasForeignKey(p => p.UsuarioId);

            // Relacionamento 1-N: Usuario -> Etiqueta
            modelBuilder.Entity<Etiqueta>()
                .HasOne(e => e.Usuario)
                .WithMany(u => u.Etiquetas)
                .HasForeignKey(e => e.UsuarioId);

            // Relacionamento 1-N: Projeto -> Tarefa
            modelBuilder.Entity<Tarefa>()
                .HasOne(t => t.Projeto)
                .WithMany(p => p.Tarefas)
                .HasForeignKey(t => t.ProjetoId);


            // Relacionamento N-N: Tarefa <-> Etiqueta
            modelBuilder.Entity<Tarefa>()
                .HasMany(t => t.Etiquetas)
                .WithMany(e => e.Tarefas);
        }
    }
}
