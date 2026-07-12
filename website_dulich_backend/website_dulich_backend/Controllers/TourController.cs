
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using website_dulich_backend.DTOs.Tour;
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
            var response = await _tourService.GetToursAsync(query);

            return Ok(response);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetTourById(Guid id)
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
            try
            {
                var createdTour = await _tourService.CreateTour(request);

                return CreatedAtAction(
                    nameof(GetTourById),
                    new { id = createdTour.Id },
                    createdTour);
            }
            catch (ArgumentException ex)
            {
                return BadRequest(new
                {
                    message = ex.Message
                });
            }
        }

        [Authorize(Roles = "Admin")]
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateTour( Guid id,[FromBody] UpdateTourRequest request)
        {
            try
            {
                var updatedTour =
                    await _tourService.UpdateTour(id, request);

                if (updatedTour == null)
                {
                    return NotFound();
                }

                return Ok(updatedTour);
            }
            catch (ArgumentException ex)
            {
                return BadRequest(new
                {
                    message = ex.Message
                });
            }
        }

        [Authorize]
        [HttpGet("profile")]
        public IActionResult Profile()
        {
            return Ok(new
            {
                User.Identity?.Name,
                User.Claims
            });
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

            return NoContent();
        }

        [HttpGet("statistics")]
        public async Task<IActionResult> GetStatistics()
        {
            var response =
                await _tourService.GetStatisticsAsync();

            return Ok(response);
        }

        [Authorize(Roles = "Admin")]
        [HttpPatch("{id}/status")]
        public async Task<IActionResult> UpdateStatus(Guid id,[FromBody] UpdateTourStatusRequest request)
        {
            var updated = await _tourService.UpdateStatusAsync(id,request.IsActive);

            if (!updated)
            {
                return NotFound();
            }

            return NoContent();
        }


        //thay đổi trạng thái bán tour hàng loạt
        [Authorize(Roles = "Admin")]
        [HttpPatch("status")]
        public async Task<IActionResult> BulkUpdateStatus([FromBody] BulkUpdateStatusRequest request)
        {
            try
            {
                var updated =
                    await _tourService.BulkUpdateStatusAsync(
                        request.TourIds,
                        request.IsActive);

                return Ok(new
                {
                    Updated = updated
                });
            }
            catch (ArgumentException ex)
            {
                return BadRequest(new
                {
                    message = ex.Message
                });
            }
        }

        //xóa tour hàng loạt
        [Authorize(Roles = "Admin")]
        [HttpDelete("bulk")]
        public async Task<IActionResult> BulkDelete([FromBody] BulkDeleteTourRequest request)
        {
            try
            {
                var deleted =
                    await _tourService.BulkDeleteAsync(
                        request.TourIds);

                return Ok(new
                {
                    Deleted = deleted
                });
            }
            catch (ArgumentException ex)
            {
                return BadRequest(new
                {
                    message = ex.Message
                });
            }
        }

        [Authorize(Roles = "Admin")]
        [HttpGet("export")]
        public async Task<IActionResult> ExportExcel([FromQuery] TourQueryDto query)
        {
            var file = await _tourService.ExportExcelAsync(query);

            return File(
                file,
                "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
                $"Tours_{DateTime.Now:yyyyMMddHHmmss}.xlsx");
        }
    }
}