using Infrastructure.Data;
using Services.ServiceContract;
using System;
using System.Collections.Generic;
using System.Text;
using Microsoft.EntityFrameworkCore;
using Models.Entities;
using Models.DTOS;

namespace Services.ServiceImplementation
{
    public class CustomerService : ICustomerService
    {
        private readonly ApplicationDbContext _context;

        public CustomerService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<CustomerDto>> GetAllCustomersAsync()
        {
            var customers = await _context.Customers.ToListAsync();
            return customers.Select(c => new CustomerDto
            {
                CustomerId = c.Id,
                Name = c.Name
            });
        }

        public async Task<CustomerDto> GetCustomerByIdAsync(string id)
        {
            var customer = await _context.Customers
                .Include(c => c.Cart)
                .FirstOrDefaultAsync(c => c.Id == id);

            if (customer == null)
                return null;

            return new CustomerDto
            {
                CustomerId = customer.Id,
                Name = customer.Name
            };
        }

        public async Task<CustomerDto> AddCustomerAsync(CustomerDto customerDto)
        {
            var customer = new Customer
            {
                Name = customerDto.Name
            };

            _context.Customers.Add(customer);
            await _context.SaveChangesAsync();

            var cart = new Cart
            {
                CustId = customer.Id
            };

            _context.Carts.Add(cart);
            await _context.SaveChangesAsync();

            return new CustomerDto
            {
                CustomerId = customer.Id,
                Name = customer.Name
            };
        }

    }
}
