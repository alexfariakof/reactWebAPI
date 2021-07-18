using aplHotel.Models;
using aplHotel.Models.Context;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;

namespace aplHotel.Services.Implementations
{
    public class ComodidadeServiceImplementation : IComodidadeService
    {
        private readonly MySQLContext _context;

        public ComodidadeServiceImplementation(MySQLContext context)
        {
            _context = context;
        }

        public List<Comodidade> FindAll()
        {
            List<Comodidade> list = null;
            try
            {
                list = _context.Comodidade.ToList<Comodidade>(); 
            }
            catch (Exception ex) 
            {
                throw (ex);
            }
            return list;
        }

        public List<Comodidade> FindByDescricao(string descricao)
        {
            descricao =   "%" + descricao + "%";
            var query = from e in _context.Comodidade
                        where EF.Functions.Like(e.Descricao, descricao)
                        select e;
            return query.ToList<Comodidade>();
        }

        public Comodidade FindByID(long id)
        {
            return _context.Comodidade.ToList().SingleOrDefault(c => c.Id.Equals(id));
        }

        public Comodidade Create(Comodidade comodidade)
        {
            try
            {
                _context.Add(comodidade);
                _context.SaveChanges();
            }
            catch(Exception ex)
            {
                throw (ex);
            }
            return comodidade;
        }

        public Comodidade Update(Comodidade comodidade)
        {
            if (!Exists(comodidade.Id)) return new Comodidade();

            var result = _context.Comodidade.ToList().SingleOrDefault(c => c.Id.Equals(comodidade.Id));

            if (result != null)
            {
                try
                {
                    _context.Entry(result).CurrentValues.SetValues(comodidade);
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
            var result = _context.Comodidade.ToList().SingleOrDefault(c => c.Id.Equals(id));

            if (result != null)
            {
                try
                {
                    _context.Comodidade.Remove(result);
                    _context.SaveChanges();
                }
                catch (Exception ex)
                {
                    throw (ex);
                }
            }
        }

        private bool Exists(long? id)
        {
            return _context.Comodidade.Any(c => c.Id.Equals(id));
        }
    }
}
