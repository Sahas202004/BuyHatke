
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Models.DTOS;
using Services.ServiceContract;

namespace OnlineShoppingApp.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class CartController : ControllerBase
    {
        private readonly ICartService _cartService;

        public CartController(ICartService cartService)
        {
            _cartService = cartService;
        }

        [HttpGet("{customerId}")]
        public async Task<IActionResult> GetCart(string customerId)
        {
            var cart = await _cartService.GetCartByCustomerIdAsync(customerId);

            if (cart == null)
                return NotFound("Cart not found.");

            return Ok(cart);
        }

        [HttpPost("add")]
        public async Task<IActionResult> AddToCart([FromBody]AddToCartDto dto)
        {
            var result = await _cartService.AddToCartAsync(dto);

            if (!result)
                return BadRequest("Unable to add product to cart.");

            return Ok("Product added to cart successfully.");
        }

        [HttpPut("updateQuantity")]
        public async Task<IActionResult> UpdateQuantity(int cartItemId, int quantity)
        {
            var result = await _cartService.UpdateQuantityAsync(cartItemId, quantity);

            if (!result)
                return NotFound("Cart item not found.");

            return Ok("Quantity updated successfully.");
        }

        [HttpDelete("remove/{cartItemId}")]
        public async Task<IActionResult> RemoveFromCart(int cartItemId)
        {
            var result = await _cartService.RemoveFromCartAsync(cartItemId);

            if (!result)
                return NotFound("Cart item not found.");

            return Ok("Item removed from cart successfully.");
        }

        [HttpDelete("clear/{customerId}")]
        public async Task<IActionResult> ClearCart(string customerId)
        {
            var result = await _cartService.ClearCartAsync(customerId);

            if (!result)
                return NotFound("Cart not found.");

            return Ok("Cart cleared successfully.");
        }

        [HttpGet("checkout/{customerId}")]
        public async Task<IActionResult> Checkout(string customerId)
        {
            var result = await _cartService.CheckoutAsync(customerId);

            if (result == null)
                return NotFound("Cart not found.");

            return Ok(result);
        }
    }
}