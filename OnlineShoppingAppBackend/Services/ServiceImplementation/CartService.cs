using Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using Models.DTOS;
using Models.Entities;
using Services.ServiceContract;
using System;
using System.Collections.Generic;
using System.Text;

namespace Services.ServiceImplementation
{
    public class CartService: ICartService
    {
        private readonly ApplicationDbContext _context;

        public CartService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<CartDto?> GetCartByCustomerIdAsync(string customerId)
        {
            var cart = await _context.Carts
                .Include(c => c.CartItems)
                .ThenInclude(ci => ci.Product)
                .FirstOrDefaultAsync(c => c.CustId == customerId);

            if (cart == null)
                return null;

            decimal subtotal = cart.CartItems.Sum(item => item.Product.Price * item.Quantity);
            decimal discount = 0;
            if (subtotal > 100000)
            {
                discount= subtotal * 0.10m;
            }
            decimal grandTotal = subtotal - discount;

            return new CartDto
            {
                CartId = cart.CartId,
                CustomerId = cart.CustId,
                CartItems = cart.CartItems.Select(item => new CartItemDto
                {
                    CartItemId = item.CartItemId,
                    ProductId = item.ProductId,
                    ProductName = item.Product.ProductName,
                    Description=item.Product.Description,
                    Price = item.Product.Price,
                    Quantity = item.Quantity,
                    TotalPrice = item.Product.Price * item.Quantity
                }).ToList(),

                SubTotal = subtotal,
                Discount = discount,
                GrandTotal = grandTotal
            };
        }

        public async Task<bool> AddToCartAsync(AddToCartDto addToCart)
        {
            var cart = await _context.Carts
                .Include(c => c.CartItems)
                .FirstOrDefaultAsync(c => c.CustId == addToCart.CustomerId);

            if (cart == null)
            {
                cart = new Cart
                {
                    CustId = addToCart.CustomerId,
                    CartItems = new List<CartItem>()
                };

                _context.Carts.Add(cart);
                Console.WriteLine($"CustomerId: {addToCart.CustomerId}");
                Console.WriteLine($"Cart CustId: {cart.CustId}");
                await _context.SaveChangesAsync();
            }

            var product = await _context.Products.FindAsync(addToCart.ProductId);

            if (product == null)
                return false;

            var existingItem = cart.CartItems
                .FirstOrDefault(c => c.ProductId == addToCart.ProductId);

            if (existingItem != null)
            {
                existingItem.Quantity += addToCart.Quantity;
            }
            else
            {
                cart.CartItems.Add(new CartItem
                {
                    ProductId = addToCart.ProductId,
                    Quantity = addToCart.Quantity
                });
            }

            await _context.SaveChangesAsync();

            return true;
        }



        public async Task<bool> UpdateQuantityAsync(int cartItemId, int quantity)
        {
            var cartItem = await _context.CartItems.FindAsync(cartItemId);

            if (cartItem == null)
                return false;

            cartItem.Quantity = quantity;

            await _context.SaveChangesAsync();

            return true;
        }

        public async Task<bool> RemoveFromCartAsync(int cartItemId)
        {
            var cartItem = await _context.CartItems.FindAsync(cartItemId);

            if (cartItem == null)
                return false;

            _context.CartItems.Remove(cartItem);

            await _context.SaveChangesAsync();

            return true;
        }

        public async Task<bool> ClearCartAsync(string customerId)
        {
            var cart = await _context.Carts
                .Include(c => c.CartItems)
                .FirstOrDefaultAsync(c => c.CustId == customerId);

            if (cart == null)
                return false;

            _context.CartItems.RemoveRange(cart.CartItems);

            await _context.SaveChangesAsync();

            return true;
        }

        public async Task<CartDto?> CheckoutAsync(string customerId)
        {
            var cart = await _context.Carts
                .Include(c => c.CartItems)
                .ThenInclude(ci => ci.Product)
                .FirstOrDefaultAsync(c => c.CustId == customerId);

            if (cart == null)
                return null;

            decimal subtotal = cart.CartItems.Sum(item => item.Product.Price * item.Quantity);

            decimal discount = 0;
            if (subtotal > 100000)
            {
                discount= subtotal * 0.10m;
            }

            decimal grandTotal = subtotal - discount;

            return new CartDto
            {
                CartId = cart.CartId,
                CustomerId = cart.CustId,
                CartItems = cart.CartItems.Select(item => new CartItemDto
                {
                    CartItemId = item.CartItemId,
                    ProductId = item.ProductId,
                    ProductName = item.Product.ProductName,
                    Description=item.Product.Description,
                    Price = item.Product.Price,
                    Quantity = item.Quantity,
                    TotalPrice = item.Product.Price * item.Quantity
                }).ToList(),

                SubTotal = subtotal,
                Discount = discount,
                GrandTotal = grandTotal
            };
        }
    }
}
