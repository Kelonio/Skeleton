using AutoMapper;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using Skeleton.Models;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace Skeleton.Services
{

    public interface IUserService
    {
        Task<string> CreateToken(string Email, string Password);
    }


    public class UserService : IUserService
    {
        private readonly IConfiguration _config;
        private readonly UserManager<User> _userManager;
        private readonly SignInManager<User> _signInManager;
        private readonly DataContext _dataContext;
        private readonly IMapper _mapper;        

        public UserService(UserManager<User> userManager,
                           SignInManager<User> signInManager,
                           DataContext dataContext,
                           IConfiguration config,
                           IMapper mapper)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _dataContext = dataContext;
            _mapper = mapper;
            _config = config;
        }
        

        public async Task<string> CreateToken(string Email,string Password )
        {
            User user = await _userManager.FindByEmailAsync(Email);
            if (user != null)
            {

                SignInResult result = await _signInManager.CheckPasswordSignInAsync(user, Password, lockoutOnFailure: false);
                if (!result.Succeeded)
                    return ""; //si devovemos una token vacia es que no se autentifica

                List<Claim> claims = new List<Claim>
                {
                        new Claim(JwtRegisteredClaimNames.Sub, Email),
                        new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                        new Claim(ClaimTypes.NameIdentifier, user.Id)
                };

                var roles = await _userManager.GetRolesAsync(user);

                claims.AddRange(roles.Select(role => new Claim(ClaimsIdentity.DefaultRoleClaimType, role)));
                
                JwtSecurityToken token = new JwtSecurityToken
                (
                    issuer: _config["Jwt:Issuer"],
                    audience: _config["Jwt:Audience"],
                    claims: claims,
                    expires: DateTime.UtcNow.AddDays(60),
                    notBefore: DateTime.UtcNow,
                    signingCredentials: new SigningCredentials(new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"])),
                            SecurityAlgorithms.HmacSha256)
                );
                return new JwtSecurityTokenHandler().WriteToken(token);                
            }

            return ""; //si devovemos una token vacia es que no se autentifica

        }

    }
}
