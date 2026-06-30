using website_dulich_backend.Models;

namespace website_dulich_backend.Repositories
{
    public interface IUserRepository
    {
      

        //kiểm tra xem email đã tồn tại chưa
        Task<User?> GetByEmailAsync(string email);

        //lưu thông tin user mới vào database
        Task<User> AddAsync(User user);

        Task<User?> GetByVerificationTokenAsync(string token);
        Task UpdateAsync(User user);

        Task<User?> GetByResetTokenAsync(string token);
    }
}
