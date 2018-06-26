using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;



using Skeleton.Models;
using Skeleton.Services;

namespace Skeleton.Controllers
{
    
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly UserManager<User> _userManager;
        private readonly DataContext _dataContext;
        private readonly IMapper _mapper;

        public UsersController(UserManager<User> userManager, DataContext dataContext, IMapper mapper)
        {
            _userManager = userManager;
            _dataContext = dataContext;
            _mapper = mapper;
        }

        [AllowAnonymous]
        [HttpGet]
        [Route("api/user")]
        public UserDto GetUser(string id)
        {
           return _mapper.Map<UserDto>(_dataContext.Users.Find(id));
        }


        [AllowAnonymous]
        [HttpGet]
        [Route("api/users")]
        public IEnumerable<UserDto> GetUsers()
        {
            var users = _dataContext.Users;
            var userDtos = _mapper.Map<IList<UserDto>>(users);           
            return userDtos;
        }

        [AllowAnonymous]
        [HttpPost]
        [Route("api/createuser")]
        public async Task<IActionResult> CreateUser([FromBody]User newUser)
        {
            var user = new User { UserName = newUser.UserName, Email = newUser.Email, SecurityStamp = Guid.NewGuid().ToString("D") };
            IdentityResult result = await _userManager.CreateAsync(user, newUser.Password);

            if (!result.Succeeded)
                return BadRequest(result.Errors.First().Description); //sacamos solo el primero

            var roleresult = await _userManager.AddToRoleAsync(user, "User");

            if (!roleresult.Succeeded)
                return BadRequest(roleresult.Errors);
            
            return Ok(user);

        }
    }
}