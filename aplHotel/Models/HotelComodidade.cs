using aplHotel.Model.Base;
using System.ComponentModel.DataAnnotations.Schema;

namespace aplHotel.Models
{
    [Table("hotel_comodidade")]
    public class HotelComodidade : BaseEntity
    {
        [Column("idHotel")]
        public int IdHotel { get; set; }
        [Column("idComodidade")]
        public int IdComodidade { get; set; }
    }
}

