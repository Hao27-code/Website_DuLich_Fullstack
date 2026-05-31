using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using website_dulich_backend.DTOs;
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
        public async Task<IActionResult>GetTourById(int id)
        {
            var tour =await _tourService.GetTourByIdAsync(id);

            if (tour == null)
            {
                return NotFound();
            }

            return Ok(tour);
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] Tour tour)
        {
            var createdTour = await _tourService.CreateTour(tour);

            return Ok(createdTour);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateTour(int id,[FromBody] Tour tour)
        {
            var updatedTour =
                await _tourService.UpdateTour(id, tour);

            if (updatedTour == null)
            {
                return NotFound();
            }

            return Ok(updatedTour);
        }
    }
}