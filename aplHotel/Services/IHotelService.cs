using aplHotel.Models;
using System.Collections.Generic;

namespace aplHotel.Services
{
    public interface IHotelService
    {
        List<Hotel> FindAll();
        Hotel FindByID(long id);
        List<Hotel> FindByNome(string nome);
        Hotel Create(Hotel hotel);
        Hotel Update(Hotel hotel);
        void Delete(long id);
    }
}
