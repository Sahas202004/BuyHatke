using Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using Models.DTOS;
using Models.Entities;
using Services.ServiceContract;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Services.ServiceImplementation
{
    public class ProductService : IProductServices
    {
        private readonly ApplicationDbContext _context;

        public ProductService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<ProductDto>> GetAllProductsAsync()
        {
            return await _context.Products
                .Select(p => new ProductDto
                {
                    ProductId = p.ProductId,
                    ProductName = p.ProductName,
                    Description=p.Description,
                    Price = p.Price
                })
                .ToListAsync();
        }

        public async Task<ProductDto?> GetProductByIdAsync(int id)
        {
            return await _context.Products
                .Where(p => p.ProductId == id)
                .Select(p => new ProductDto
                {
                    ProductId = p.ProductId,
                    ProductName = p.ProductName,
                   Description=p.Description,
                    Price = p.Price
                })
                .FirstOrDefaultAsync();
        }

        public async Task<ProductDto> AddProductAsync(ProductDto productDto)
        {
            var product = new Product
            {
                ProductName = productDto.ProductName,
                Description=productDto.Description,
                Price = productDto.Price
            };

            _context.Products.Add(product);
            await _context.SaveChangesAsync();

            productDto.ProductId = product.ProductId;

            return productDto;
        }

        public async Task<ProductDto?> UpdateProductAsync(int id, ProductDto productDto)
        {
            var existingProduct = await _context.Products.FindAsync(id);

            if (existingProduct == null)
                return null;

            existingProduct.ProductName = productDto.ProductName;
            existingProduct.Description = productDto.Description;
            existingProduct.Price = productDto.Price;

            await _context.SaveChangesAsync();

            return new ProductDto
            {
                ProductId = existingProduct.ProductId,
                ProductName = existingProduct.ProductName,
                Description=existingProduct.Description,
                Price = existingProduct.Price
            };
        }

        public async Task<bool> DeleteProductAsync(int id)
        {
            var product = await _context.Products.FindAsync(id);

            if (product == null)
                return false;

            _context.Products.Remove(product);
            await _context.SaveChangesAsync();

            return true;
        }
    }
}