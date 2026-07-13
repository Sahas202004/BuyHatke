using Microsoft.AspNetCore.Identity;
using Models.DTOS;
using System;
using System.Collections.Generic;
using System.Text;

namespace Services.ServiceContract
{
    public interface IAuthService
    {
        Task<IdentityResult> RegisterAsync(RegisterDto registerDto);

        Task<LoginResponseDto?> LoginAsync(LoginDto loginDto);

    }
}
