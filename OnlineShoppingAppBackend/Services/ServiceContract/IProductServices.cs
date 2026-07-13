using Models.DTOS;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Services.ServiceContract
{
    public interface IProductServices
    {
        Task<IEnumerable<ProductDto>> GetAllProductsAsync();

        Task<ProductDto?> GetProductByIdAsync(int id);

        Task<ProductDto> AddProductAsync(ProductDto productDto);

        Task<ProductDto?> UpdateProductAsync(int id, ProductDto productDto);

        Task<bool> DeleteProductAsync(int id);
    }
}