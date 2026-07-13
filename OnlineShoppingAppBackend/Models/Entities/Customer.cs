using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Text;

namespace Models.Entities
{
    public class Customer : IdentityUser
    {
        public string? Name { get; set; }
        public Cart? Cart { get; set; }
    }
}
