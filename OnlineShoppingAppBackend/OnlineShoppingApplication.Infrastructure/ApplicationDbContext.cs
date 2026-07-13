using Microsoft.EntityFrameworkCore;
using OnlineShoppingApplication.Domain;

namespace OnlineShoppingApplication.Infrastructure;

public class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
        : base(options)
    {
    }

    public DbSet<Customer> Customers { get; set; }
    public DbSet<Product> Products { get; set; }
    public DbSet<Cart> Carts { get; set; }
    public DbSet<CartItem> CartItems { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        // Customer - Cart: One-to-One relationship
        modelBuilder.Entity<Customer>()
            .HasOne(c => c.Cart)
            .WithOne(ca => ca.Customer)
            .HasForeignKey<Cart>(ca => ca.CustomerId)
            .OnDelete(DeleteBehavior.Cascade);

        // Cart - CartItem: One-to-Many relationship
        modelBuilder.Entity<Cart>()
            .HasMany(c => c.CartItems)
            .WithOne(ci => ci.Cart)
            .HasForeignKey(ci => ci.CartId)
            .OnDelete(DeleteBehavior.Cascade);

        // Product - CartItem: One-to-Many relationship
        modelBuilder.Entity<Product>()
            .HasMany(p => p.CartItems)
            .WithOne(ci => ci.Product)
            .HasForeignKey(ci => ci.ProductId)
            .OnDelete(DeleteBehavior.Restrict);

        // Configure decimal precision for prices
        modelBuilder.Entity<Product>()
            .Property(p => p.Price)
            .HasPrecision(10, 2);

        modelBuilder.Entity<CartItem>()
            .Property(ci => ci.Price)
            .HasPrecision(10, 2);
    }
}
