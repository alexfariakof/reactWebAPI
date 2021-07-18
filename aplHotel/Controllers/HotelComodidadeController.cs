using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;


namespace aplHotel.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HotelComodidadeController : ControllerBase
    {
        // GET api/<HotelComodidadeController>/5
        [HttpGet("{idHotel}")]
        public IActionResult Get(int idHotel)
        {            
            return Ok("value");
        }
    }
}
