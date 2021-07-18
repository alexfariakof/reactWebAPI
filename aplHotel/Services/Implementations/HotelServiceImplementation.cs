using aplHotel.Models;
using aplHotel.Models.Context;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;

namespace aplHotel.Services.Implementations
{
    public class HotelServiceImplementation : IHotelService
    {
        private readonly MySQLContext _context;

        public HotelServiceImplementation(MySQLContext context)
        {
            _context = context;
        }

        public List<Hotel> FindAll()
        {
            return _context.Hotel.ToList();
        }

        public Hotel FindByID(long id)
        {
            Hotel hotel = _context.Hotel.SingleOrDefault(h => h.Id.Equals(id));
            
            if (hotel != null)
            {
                hotel.Comodidades = FindComodidadeByIdHotel(id);
            }
            
            return hotel;
        }

        public List<Hotel> FindByNome(string nome)
        {
            nome = "%" + nome + "%";
            var query = from e in _context.Hotel
                        where EF.Functions.Like(e.Nome, nome)
                        select e;
            return query.ToList<Hotel>();
        }

        public Hotel Create(Hotel hotel)
        {
            try
            {
                _context.Add(hotel);
                _context.SaveChanges();
            }
            catch (Exception ex)
            {
                throw (ex);
            }
            return hotel;
        }

        public Hotel Update(Hotel hotel)
        {
            if (!Exists(hotel.Id)) return new Hotel();

            var result = _context.Hotel.SingleOrDefault(c => c.Id.Equals(hotel.Id));

            if (result != null)
            {
                try
                {
                    _context.Entry(result).CurrentValues.SetValues(hotel);
                    _context.SaveChanges();
                }
                catch (Exception ex)
                {
                    throw (ex);
                }
            }
            return result;
        }

        public void Delete(long id)
        {
            var result = _context.Hotel.SingleOrDefault(c => c.Id.Equals(id));

            if (result != null)
            {
                try
                {
                    _context.Hotel.Remove(result);
                    _context.SaveChanges();
                }
                catch (Exception ex)
                {
                    throw (ex);
                }
            }
        }

        private List<Comodidade> FindComodidadeByIdHotel(long idHotel)
        {   
            var innerJoin = from hc in _context.HotelComodidades 
                            join c in _context.Comodidade on hc.IdComodidade equals c.Id
                            where hc.IdHotel == idHotel
                            select new
                            {
                                IdComodidade = c.Id,
                                Decricao = c.Descricao
                            };
            
            var list = new List<Comodidade>();
            foreach (var result in innerJoin.ToList())
            {
                list.Add(new Comodidade
                {
                    Id = result.IdComodidade,
                    Descricao = result.Decricao
                });
            }
            
            return list;
        }


        private bool Exists(long? id)
        {
            return _context.Hotel.Any(c => c.Id.Equals(id));
        }
    }
}
