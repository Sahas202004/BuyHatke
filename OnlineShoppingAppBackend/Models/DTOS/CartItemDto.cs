using System;
using System.Collections.Generic;
using System.Text;

namespace Models.DTOS
{
    public class CartItemDto
    {
        public int CartItemId { get; set; }

        public int ProductId { get; set; }

        public string ProductName { get; set; }
        public string Description { get; set; }

        public decimal Price { get; set; }

        public int Quantity { get; set; }

        public decimal TotalPrice { get; set; }
    }
}
