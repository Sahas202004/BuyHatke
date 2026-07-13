using System;
using System.Collections.Generic;
using System.Text;

namespace Models.DTOS
{
    public class ProductDto
    {
        public int ProductId { get; set; }

        public string ProductName { get; set; }
        public string Description { get; set; }

        public decimal Price { get; set; }
    }
}
