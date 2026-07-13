using Models.DTOS;
using Models.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace Services.ServiceContract
{
    public interface ICustomerService
    {
        Task<IEnumerable<CustomerDto>> GetAllCustomersAsync();

        Task<CustomerDto?> GetCustomerByIdAsync(string id);

        Task<CustomerDto> AddCustomerAsync(CustomerDto customer);
    }
}
