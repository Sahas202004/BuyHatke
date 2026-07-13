using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Models.DTOS;
using Services.ServiceContract;

namespace OnlineShoppingApp.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class CustomersController : ControllerBase
    {
        private readonly ICustomerService _customerService;

        public CustomersController(ICustomerService customerService)
        {
            _customerService = customerService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllCustomers()
        {
            var customers = await _customerService.GetAllCustomersAsync();

            return Ok(customers);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetCustomerById(string id)
        {
            var customer = await _customerService.GetCustomerByIdAsync(id);

            if (customer == null)
                return NotFound("Customer not found.");

            return Ok(customer);
        }

        [HttpPost("add")]
        public async Task<IActionResult> AddCustomer(CustomerDto customerDto)
        {
            var newCustomer = await _customerService.AddCustomerAsync(customerDto);

            return CreatedAtAction(
                nameof(GetCustomerById),
                new { id = newCustomer.CustomerId },
                newCustomer);
        }
    }
}