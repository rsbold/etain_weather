using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using etain.Models;
using etain.WeatherClient;


namespace etain.Controllers
{
    [Authorize]
    [ApiController]
    [Route("[controller]")]
    public class WeatherForecastController : ControllerBase
    {
        private readonly ILogger<WeatherForecastController> _logger;

        public WeatherForecastController(ILogger<WeatherForecastController> logger)
        {
            _logger = logger;
        }

        [HttpGet]
        public  async Task<Forecast> Get()
        {
            System.Diagnostics.Debug.WriteLine("In WeatherForecastController Get()");
            Forecast forecast = await MetaweatherClient.GetForecast();
            return forecast;
        }
    }
}
