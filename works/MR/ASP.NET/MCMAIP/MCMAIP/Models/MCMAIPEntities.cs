using System.Data.Entity;

namespace MCMAIP.Models
{
    public class MCMAIPEntities:DbContext
    {
        public DbSet<News> NewsList { get; set; }
    }
}