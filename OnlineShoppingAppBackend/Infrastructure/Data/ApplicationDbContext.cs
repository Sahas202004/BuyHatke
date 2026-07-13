using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Models.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace Infrastructure.Data
{
    public class ApplicationDbContext :IdentityDbContext<Customer>
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options):base(options) { }

        public DbSet<Customer> Customers { get; set; }
        public DbSet<Cart > Carts { get; set; }
        public DbSet<CartItem> CartItems { get; set; }
        public DbSet<Product> Products { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);


            modelBuilder.Entity<Customer>()
                .HasOne(c => c.Cart)
                .WithOne(c => c.Customer)
                .HasForeignKey<Cart>(c => c.CustId);


            modelBuilder.Entity<Cart>()
                .HasMany(c => c.CartItems)
                .WithOne(ci => ci.Cart)
                .HasForeignKey(ci => ci.CartId);

            

            modelBuilder.Entity<Product>()
                .HasMany(p => p.CartItems)
                .WithOne(ci => ci.Product)
                .HasForeignKey(ci => ci.ProductId);
        }
    }
}
