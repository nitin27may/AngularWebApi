using DataEntities.Models;
using System.Data.Entity;
using System.Data.Entity.ModelConfiguration.Conventions;

namespace DataEntities.Repositories
{
    public class SocietyContext : DbContext
    {

        public DbSet<User> User { get; set; }
        public DbSet<Role> Role { get; set; }

        public DbSet<Event> Event { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Conventions.Remove<PluralizingTableNameConvention>();


        }
    }
}
