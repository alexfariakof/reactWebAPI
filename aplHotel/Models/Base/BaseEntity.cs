using System.ComponentModel.DataAnnotations.Schema;
using System.Runtime.Serialization;

namespace aplHotel.Model.Base
{
    //[DataContract]
    public class BaseEntity
    {
        [Column("id")]
        public long? Id { get; set; }
    }
}