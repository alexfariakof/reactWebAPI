using aplHotel.Models;
using System.Collections.Generic;

namespace aplHotel.Services
{
    public interface IComodidadeService
    {
        List<Comodidade> FindAll();
        List<Comodidade> FindByDescricao(string descricao);
        Comodidade FindByID(long id);        
        Comodidade Create(Comodidade comodidade);
        Comodidade Update(Comodidade comodidade);
        void Delete(long id);
    }
}
