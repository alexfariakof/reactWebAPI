using aplHotel.Model.Base;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace aplHotel.Models
{
    [Table("hotel")]
    public class Hotel : BaseEntity
    {
        [Column("nome")]
        public string Nome{ get; set; }

        [Column("descricao")]
        public string Descricao { get; set; }
        [Column("avaliacao")]
        public int Avaliacao { get; set; }
        [Column("endereco")]
        public string Endereco { get; set; }
        public List<Comodidade> Comodidades { get; set; }
    }
}