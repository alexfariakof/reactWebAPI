using aplHotel.Model.Base;
using System.ComponentModel.DataAnnotations.Schema;

namespace aplHotel.Models
{
	[Table("comodidade")]
	public class Comodidade : BaseEntity
	{
		[Column("descricao")]
		public string Descricao { get; set; }
	}
}