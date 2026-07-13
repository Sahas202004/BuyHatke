using System;
using System.Collections.Generic;
using System.Text;

namespace Models.DTOS
{
    public class LoginResponseDto
    {
        public string Token { get; set; }
        public string UserId { get; set; }
        public string UserName { get; set; }
        public string Email { get; set; }
    }
}
