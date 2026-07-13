using Microsoft.AspNetCore.Identity;
using Models.DTOS;
using Models.Entities;
using Services.ServiceContract;
using System;
using System.Collections.Generic;
using System.Text;

namespace Services.ServiceImplementation
{
    public class AuthService : IAuthService
    {
        private readonly UserManager<Customer> _userManager;
        private readonly SignInManager<Customer> _signInManager;
        private readonly IJwtService _jwtService;

        public AuthService(UserManager<Customer> userManager
            ,SignInManager<Customer> signInManager,IJwtService jwtService)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _jwtService = jwtService;
        }

        public async Task<LoginResponseDto> LoginAsync(LoginDto login)
        {
            var customer = await _userManager.FindByEmailAsync(login.Email);

            if(customer == null)
            {
                return null;
            }

            var result = await _signInManager.CheckPasswordSignInAsync(
                customer, login.Password, false);

            if (!result.Succeeded)
            {
                return null;
            }

            var token=_jwtService.GenerateToken(customer);
            return new LoginResponseDto
            {
                UserId=customer.Id,
                UserName=customer.UserName,
                Email=customer.Email,
                Token=token
            };
        }

        public async Task<IdentityResult> RegisterAsync(RegisterDto registerDto)
        {
            var customer = new Customer
            {
                Name= registerDto.Name,
                UserName = registerDto.UserName,
                Email=registerDto.Email,
                PhoneNumber=registerDto.PhoneNumber,
           
            };

            var result = await _userManager.CreateAsync(customer,registerDto.Password);
            return result;
        }

        

        
    }
}
