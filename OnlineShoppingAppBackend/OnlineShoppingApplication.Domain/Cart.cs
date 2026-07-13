namespace OnlineShoppingApplication.Domain;

public class Cart
{
    public int CartId { get; set; }
    public int CustomerId { get; set; }

    // Navigation properties
    public Customer? Customer { get; set; }
    public ICollection<CartItem> CartItems { get; set; } = new List<CartItem>();
}
