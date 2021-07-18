using aplHotel.Models;
using Microsoft.AspNetCore.Mvc;
using aplHotel.Services;
using System.Collections.Generic;

namespace aplHotel.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ComodidadeController : ControllerBase
    {
        private IComodidadeService _comodidadeService;

        public ComodidadeController(IComodidadeService comodidadeService)
        {
            _comodidadeService = comodidadeService;
        }

        // GET: api/<ComodidadeController>
        [HttpGet]
        public IActionResult Get()
        {
            string pesquisa = Request.QueryString.Value.Replace("?", "");
            List<Comodidade> listComodidade = null;
            if (pesquisa != "" && !string.IsNullOrEmpty(pesquisa))
            {
                listComodidade = _comodidadeService.FindByDescricao(pesquisa.ToString());
            }
            else
            {
                listComodidade = _comodidadeService.FindAll();
            }

            if (listComodidade == null) return NotFound();
            return Ok(listComodidade);
        }

        // GET api/<ComodidadeController>/5
        [HttpGet("{id}")]
        public IActionResult Get(long id)
        {
            var comodidade = _comodidadeService.FindByID(id);
            if (comodidade == null) return NotFound();
            return Ok(comodidade);
        }

        // POST api/<ComodidadeController>
        [HttpPost]
        public IActionResult Post([FromBody] Comodidade comodidade)
        {
            if (comodidade == null) return BadRequest();            
            return Ok(_comodidadeService.Create(comodidade));
        }

        // PUT api/<ComodidadeController>/5
        [HttpPut("{id}")]
        public IActionResult Put([FromBody] Comodidade comodidade)
        {
            if (comodidade == null) return BadRequest();
            return Ok(_comodidadeService.Update(comodidade));
        }

        // DELETE api/<ComodidadeController>/5
        [HttpDelete("{id}")]
        public IActionResult Delete(long id)
        {
            _comodidadeService.Delete(id);
            return NoContent();
        }
    }
}
