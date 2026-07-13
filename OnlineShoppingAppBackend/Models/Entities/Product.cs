using System;
using System.Collections.Generic;
using System.Text;

namespace Models.Entities
{
    public class Product
    {
        public int ProductId { get; set; }

        public string ProductName { get; set; }

        public string Description { get;set; }

        public decimal Price { get; set; }

        public ICollection<CartItem>? CartItems { get; set; }
    }
}
