using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;


using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;
using Skeleton.Models;
using Skeleton.Services;
using AutoMapper;

namespace Skeleton.Controllers
{
    [Route("api/[controller]")]
    public class SampleDataController : Controller
    {
        private readonly IUserService _userService;
        private readonly IMapper _mapper;

        public SampleDataController(IMapper mapper, IUserService userService)
        {           
            _mapper = mapper;
            _userService = userService;
        }

        [HttpGet("[action]"), Authorize(Roles = "Admin")]
        public IEnumerable<UserDto> Users()
        {
            IEnumerable<User> users = _userService.GetUsers();
            IEnumerable<UserDto> userDtos = _mapper.Map<IList<UserDto>>(users);
            return userDtos;
        }

        private static string[] Summaries = new[]
        {
            "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
        };

        [HttpGet("[action]"),Authorize(Roles = "Admin")]
        public IEnumerable<WeatherForecast> WeatherForecasts()
        {
            var rng = new Random();
            return Enumerable.Range(1, 5).Select(index => new WeatherForecast
            {
                DateFormatted = DateTime.Now.AddDays(index).ToString("d"),
                TemperatureC = rng.Next(-20, 55),
                Summary = Summaries[rng.Next(Summaries.Length)]
            });
        }

        public class WeatherForecast
        {
            public string DateFormatted { get; set; }
            public int TemperatureC { get; set; }
            public string Summary { get; set; }

            public int TemperatureF
            {
                get
                {
                    return 32 + (int)(TemperatureC / 0.5556);
                }
            }
        }
    }
}
