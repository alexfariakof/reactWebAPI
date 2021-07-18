using Microsoft.AspNetCore.Mvc;
using aplHotel.Services;
using aplHotel.Models;
using System.Collections.Generic;

namespace aplHotel.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HotelController : ControllerBase
    {
        private readonly IHotelService _hotelService;

        public HotelController(IHotelService hotelService)
        {
            _hotelService = hotelService;
        }

        // GET: api/<HotelController>
        [HttpGet]
        public IActionResult Get()
        {
            string pesquisa = Request.QueryString.Value.Replace("?","");
            List<Hotel> listHotel = null;
            if (pesquisa != "" && !string.IsNullOrEmpty(pesquisa))
            {
                listHotel = _hotelService.FindByNome(pesquisa.ToString());
            }
            else
            {
                listHotel = _hotelService.FindAll();
            }
            
            if (listHotel == null) return NotFound();            
            return Ok(listHotel);
        }

        // GET api/<HotelController>/5
        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var hotel = _hotelService.FindByID(id);
            if (hotel == null) return NotFound();
            return Ok(hotel);
        }

        // POST api/<HotelController>
        [HttpPost]
        public IActionResult Post([FromBody] Hotel hotel )
        {
            if (hotel == null) return BadRequest();
            return Ok(_hotelService.Create(hotel));

        }

        // PUT api/<HotelController>/5
        [HttpPut("{id}")]
        public IActionResult Put([FromBody] Hotel hotel)
        {
            if (hotel  == null) return BadRequest();
            return Ok(_hotelService.Update(hotel));

        }

        // DELETE api/<HotelController>/5
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _hotelService.Delete(id);
            return NoContent();
        }
    }
}
