using Models.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace Services.ServiceContract
{
    public interface IJwtService
    {
        string GenerateToken(Customer customer);
    }
}
