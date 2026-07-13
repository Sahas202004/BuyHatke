using System;
using System.Collections.Generic;
using System.Text;

namespace Models.DTOS
{
    public class CartDto
    {
        public int CartId { get; set; }
        public string CustomerId { get; set; }
        public List<CartItemDto> CartItems { get; set; }
        public decimal SubTotal { get; set; }

        public decimal Discount { get; set; }

        public decimal GrandTotal { get; set; }

    }
}
