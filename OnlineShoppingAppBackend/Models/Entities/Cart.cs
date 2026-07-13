using System;
using System.Collections.Generic;
using System.Text;

namespace Models.Entities
{
    public class Cart
    {
        public int CartId { get; set; }

        public string CustId { get; set; }

        public Customer Customer { get; set; }

        public ICollection<CartItem> CartItems { get; set; }
    }
    
}
