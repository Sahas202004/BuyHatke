using Models.DTOS;

namespace Services.ServiceContract
{
    public interface ICartService
    {
        Task<CartDto?> GetCartByCustomerIdAsync(string customerId);

        Task<bool> AddToCartAsync(AddToCartDto addToCart);

        Task<bool> UpdateQuantityAsync(int cartItemId, int quantity);

        Task<bool> RemoveFromCartAsync(int cartItemId);

        Task<bool> ClearCartAsync(string customerId);

        Task<CartDto?> CheckoutAsync(string customerId);
    }
}