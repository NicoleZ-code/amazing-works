using System.Collections.Generic;
using System.Data.Entity;

namespace MCMAIP.Models
{
    public class MCMAIPEntities:DbContext
    {
        public List<News> NewsList { get; set; }
    }
}