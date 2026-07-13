using System;
using System.Collections.Generic;
using System.Text;

namespace Models.DTOS
{
    public class AddToCartDto
    {
        public string CustomerId { get; set; }
        public int ProductId { get; set; }
        public int Quantity { get; set; }
    }
}
