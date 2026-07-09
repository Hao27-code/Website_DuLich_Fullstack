using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using website_dulich_backend.DTOs.Tour;
using website_dulich_backend.Models;
using website_dulich_backend.Services;

namespace website_dulich_backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TourController : ControllerBase
    {
        private readonly ITourService _tourService;

        public TourController(
            ITourService tourService
        )
        {
            _tourService = tourService;
        }

        [HttpGet]
        public async Task<IActionResult> GetTours([FromQuery] TourQueryDto query)
        {
            var result =
                await _tourService.GetToursAsync(query);

            return Ok(new
            {
                data = result.Item1,
                total = result.Item2,
                page = query.Page,
                limit = query.Limit,
                totalPages =
                    (int)Math.Ceiling(
                        (double)result.Item2 /
                        query.Limit
                    )
            });
        }

        [HttpGet("{id}")]
        public async Task<IActionResult>GetTourById(Guid id)
        {
            var tour =await _tourService.GetTourByIdAsync(id);

            if (tour == null)
            {
                return NotFound();
            }

            return Ok(tour);
        }

        [Authorize(Roles = "Admin")]
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreateTourRequest request)
        {
            var createdTour = await _tourService.CreateTour(request);

           return CreatedAtAction(nameof(GetTourById),new { id = createdTour.Id },createdTour
);
        }

        [Authorize(Roles = "Admin")]
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateTour(Guid id, [FromBody] UpdateTourRequest request)
        {
            var updatedTour = await _tourService.UpdateTour(id, request);

            if (updatedTour == null)
            {
                return NotFound();
            }

            return Ok(updatedTour);
        }

        [Authorize]
        [HttpGet("profile")]
        public IActionResult Profile()
        {
            return Ok("Đã đăng nhập");
        }


        [Authorize(Roles = "Admin")]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTour(Guid id)
        {
            var result =
                await _tourService.DeleteTour(id);

            if (!result)
            {
                return NotFound();
            }

            return Ok("Xóa thành công");
        }
    }
}