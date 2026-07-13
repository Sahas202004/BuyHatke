using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using Models.Entities;
using Services.ServiceContract;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace Services.ServiceImplementation
{
    public class JwtService : IJwtService
    {
        private readonly IConfiguration _configuration;
        public JwtService(IConfiguration configuration)
        {
            _configuration = configuration;
        }
        public string GenerateToken(Customer customer)
        {
            var claims = new[]
            {
               new Claim(JwtRegisteredClaimNames.Sub,customer.Id),
               new Claim(JwtRegisteredClaimNames.Email,customer.Email),
               new Claim(JwtRegisteredClaimNames.UniqueName,customer.UserName),
               new Claim("Name",customer.Name)
           };

            var key = new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes(_configuration["Jwt:Key"])
                );

            var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                issuer: _configuration["Jwt:Issuer"],
                audience: _configuration["Jwt:Audience"],
                claims:claims,
                expires:DateTime.UtcNow.AddMinutes(
                    Convert.ToDouble(_configuration["Jwt:ExpiryInMinutes"])
                    ),
                signingCredentials: credentials
                );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
