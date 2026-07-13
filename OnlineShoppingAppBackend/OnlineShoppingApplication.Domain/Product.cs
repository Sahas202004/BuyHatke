namespace OnlineShoppingApplication.Domain;

public class Product
{
    public int ProductId { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public decimal Price { get; set; }
    public int StockQuantity { get; set; }
    public string ImageUrl { get; set; } = string.Empty;
    public DateTime CreatedDate { get; set; } = DateTime.UtcNow;

    // Navigation property
    public ICollection<CartItem> CartItems { get; set; } = new List<CartItem>();
}
