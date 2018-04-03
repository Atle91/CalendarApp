using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using MySql.Data.EntityFrameworkCore.Extensions;
namespace WebApplication5.Models
{
    public class ApplicationDbContext : IdentityDbContext
    {
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseMySQL(GetConnectionString());
        }

        private static string GetConnectionString()
        {
            const string databaseName = "recon";
            const string databaseUser = "atle";
            const string databasePass = "Bonbon";


            return $"Server=localhost;" +
                $"database={databaseName};" +
                $"uid={databaseUser};" +
                $"pwd={databasePass};" +
                $"pooling=true;";
        }
    }
}
