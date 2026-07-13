using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Models.DTOS;
using Services.ServiceContract;

namespace OnlineShoppingApp.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        private readonly IProductServices _productService;

        public ProductsController(IProductServices productService)
        {
            _productService = productService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllProducts()
        {
            var products = await _productService.GetAllProductsAsync();

            return Ok(products);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetProductById(int id)
        {
            var product = await _productService.GetProductByIdAsync(id);

            if (product == null)
                return NotFound("Product not found.");

            return Ok(product);
        }

        [HttpPost]
        public async Task<IActionResult> AddProduct(ProductDto productDto)
        {
            var newProduct = await _productService.AddProductAsync(productDto);

            return CreatedAtAction(
                nameof(GetProductById),
                new { id = newProduct.ProductId },
                newProduct);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateProduct(int id, ProductDto productDto)
        {
            var updatedProduct = await _productService.UpdateProductAsync(id, productDto);

            if (updatedProduct == null)
                return NotFound("Product not found.");

            return Ok(updatedProduct);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProduct(int id)
        {
            var result = await _productService.DeleteProductAsync(id);

            if (!result)
                return NotFound("Product not found.");

            return Ok("Product deleted successfully.");
        }
    }
}