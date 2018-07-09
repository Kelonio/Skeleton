using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Skeleton.Helpers;
using Skeleton.Models;
using Skeleton.Services;

namespace Skeleton.Controllers
{
    
    [ApiController]
    [Route("api/users/")]
    public class UsersController : ControllerBase
    {
        private readonly UserManager<User> _userManager;
        private readonly DataContext _dataContext;
        private readonly IMapper _mapper;

        private readonly IUserService _userService;

        public UsersController(UserManager<User> userManager, DataContext dataContext, IMapper mapper, IUserService userService)
        {
            _userManager = userManager;
            _dataContext = dataContext;
            _mapper = mapper;
            _userService = userService;
        }

        [AllowAnonymous]
        [HttpPost("token")]        
        public async Task<IActionResult> CreateToken([FromBody]UserLoginDto login)
        {
            var token = await _userService.CreateToken(login.Email, login.Password);
            return token == "" ? (IActionResult)Unauthorized() : Ok(new { token });          

        }


        [AllowAnonymous]
        [HttpGet("profile/{email}")]        
        public UserDto GetProfile(string email)
        {
            //solamente si es el mismo email que la token
            User user = _dataContext.Users.Where(u => u.Email == email).FirstOrDefault();
            return _mapper.Map<UserDto>(user);
        }



        [Authorize(Roles = "Admin")] 
        [HttpGet("user/{id}")]        
        public UserDto GetUser(string id)
        {
           return _mapper.Map<UserDto>(_dataContext.Users.Find(id));
        }      

        
        [Authorize(Roles = "Admin")]
        [HttpGet]  //ruta por defecto api/users       
        public IEnumerable<UserDto> Users()
        {
            IEnumerable<User> users = _userService.GetUsers();
            IEnumerable<UserDto> userDtos = _mapper.Map<IList<UserDto>>(users);
            return userDtos;
        }

        [AllowAnonymous]
        [HttpPost("create")]        
        public async Task<IActionResult> CreateUser([FromBody]UserDto newUserDto)
        {
            User newUser = _mapper.Map<User>(newUserDto);
            try
            {
                User user = await _userService.Create(newUser);
                UserDto userDto = _mapper.Map<UserDto>(user);
                return Ok(userDto);
            }
            catch (AppException ex)
            {
                // return error message if there was an exception
                return BadRequest(ex.Message);
            }

        }


        /*
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
        */


    }
}