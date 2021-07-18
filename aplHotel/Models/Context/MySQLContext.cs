using Microsoft.EntityFrameworkCore;

namespace aplHotel.Models.Context
{
    public class MySQLContext : DbContext
    {
        public MySQLContext() { }
        public MySQLContext(DbContextOptions<MySQLContext> options) : base(options) { }
        public DbSet<Hotel> Hotel { get; set;  }
        public DbSet<Comodidade> Comodidade { get; set; }
        public DbSet<HotelComodidade> HotelComodidades{ get; set; }

    }
}
