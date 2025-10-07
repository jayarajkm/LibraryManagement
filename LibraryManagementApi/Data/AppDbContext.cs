using LibraryManagementApi.Models;
using Microsoft.EntityFrameworkCore;

namespace LibraryManagementApi.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }

        public DbSet<Book> Books { get; set; }
        public DbSet<Member> Members { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Book>()
                .HasOne<Member>(b => b.Borrower)
                .WithMany()
                .HasForeignKey(b => b.BorrowerId)
                .OnDelete(DeleteBehavior.SetNull);

            modelBuilder.Entity<Book>().HasData(
                new Book { Id = 1, Title = "The Pragmatic Programmer", Author = "Andrew Hunt, David Thomas", Genre = "Technology", YearPublished = 1999, IsAvailable = true,BorrowerId = 1 },
                new Book { Id = 2, Title = "Clean Code", Author = "Robert C. Martin", Genre = "Technology", YearPublished = 2008, IsAvailable = true }
            );

            modelBuilder.Entity<Member>().HasData(
                new Member { Id = 1, Name = "Alice Johnson", Email = "alice@example.com", JoinedDate = System.DateTime.UtcNow },
                new Member { Id = 2, Name = "Bob Smith", Email = "bob@example.com", JoinedDate = System.DateTime.UtcNow }
            );
        }
    }
}


