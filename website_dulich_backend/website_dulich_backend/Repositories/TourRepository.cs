
using ClosedXML.Excel;
using Microsoft.EntityFrameworkCore;
using website_dulich_backend.Data;
using website_dulich_backend.DTOs.Tour;
using website_dulich_backend.Models;

namespace website_dulich_backend.Repositories
{
    public class TourRepository : ITourRepository
    {
        private readonly AppDbContext _context;

        public TourRepository(
            AppDbContext context
        )
        {
            _context = context;
        }

        private static TourResponse MapTour(Tour tour)
        {
            return new TourResponse
            {
                Id = tour.Id,
                Title = tour.Title,
                Location = tour.Location,
                Days = tour.Days,
                Price = tour.Price,
                DiscountPrice = tour.DiscountPrice,
                Description = tour.Description,
                DealEndDate = tour.DealEndDate,
                CoverImage = tour.CoverImage,
                IsActive = tour.IsActive,
                AlbumImages = tour.Images
                    .OrderBy(x => x.SortOrder)
                    .Select(x => x.ImageUrl)
                    .ToList(),
                Highlights = tour.Highlights
                    .OrderBy(x => x.SortOrder)
                    .Select(x => x.Content)
                    .ToList(),

                Itineraries = tour.Itineraries
                    .OrderBy(x => x.DayNumber)
                    .Select(x => new ItineraryResponse
                    {
                        DayNumber = x.DayNumber,
                        Title = x.Title,
                        Description = x.Description
                    }).ToList(),

                Faqs = tour.Faqs
                    .OrderBy(x => x.SortOrder)
                    .Select(x => new FaqResponse
                    {
                        Question = x.Question,
                        Answer = x.Answer
                    }).ToList(),

                Activities = tour.Activities,
                TripType = tour.TripType,
                Difficulty = tour.Difficulty
            };
        }
        private IQueryable<Tour> BuildTourQuery(TourQueryDto query)
        {
            IQueryable<Tour> tours = _context.Tours
           .AsNoTracking()
           .Include(t => t.Images)
           .Include(t => t.Highlights)
           .Include(t => t.Itineraries)
           .Include(t => t.Faqs)
           .AsQueryable();



            // ======================
            // Search
            // ======================

            if (!string.IsNullOrWhiteSpace(query.Keyword))
            {
                var keyword = query.Keyword.Trim();

                tours = tours.Where(t =>
                    EF.Functions.Like(t.Title, $"%{keyword}%") ||
                    EF.Functions.Like(t.Location, $"%{keyword}%") ||
                    EF.Functions.Like(t.TripType, $"%{keyword}%") ||
                    EF.Functions.Like(t.Description, $"%{keyword}%"));
            }


            /* destination */

            if (
                query.Destination != null &&
                query.Destination.Any()
            )
            {
                tours = tours.Where(t =>
                    query.Destination.Contains(
                        t.Location
                    )
                );
            }
            /* price */

            if (query.MinPrice.HasValue)
            {
                tours = tours.Where(t =>
                    t.Price >= query.MinPrice);
            }

            if (query.MaxPrice.HasValue)
            {
                tours = tours.Where(t =>
                    t.Price <= query.MaxPrice);
            }

            /* days */

            if (query.MinDays.HasValue)
            {
                tours = tours.Where(t =>
                    t.Days >= query.MinDays);
            }

            if (query.MaxDays.HasValue)
            {
                tours = tours.Where(t =>
                    t.Days <= query.MaxDays);
            }

            /* activities */

            if (query.Activities != null && query.Activities.Any())
            {
                tours = tours.Where(t =>
                    query.Activities.Contains(t.Activities!));
            }

            /* trip type */

            if (query.TripTypes != null && query.TripTypes.Any())
            {
                tours = tours.Where(t =>
                    query.TripTypes.Contains(t.TripType!));
            }

            /* difficulty */

            if (!string.IsNullOrWhiteSpace(query.Difficulty))
            {
                tours = tours.Where(t =>
                    t.Difficulty == query.Difficulty);
            }

            /* status */

            if (query.IsActive.HasValue)
            {
                tours = tours.Where(t =>
                    t.IsActive == query.IsActive.Value);
            }

            /* sort */
            //sắp xếp dữ liệu

            switch (query.Sort?.ToLower())
            {
                //giá tăng dần
                case "priceasc":
                    tours = tours.OrderBy(t => t.Price);
                    break;

                //giá giảm dần
                case "pricedesc":
                    tours = tours.OrderByDescending(t => t.Price);
                    break;

                //tour mới nhất
                case "newest":
                    tours = tours.OrderByDescending(t => t.CreatedAt);
                    break;

                //tour cũ nhất
                case "oldest":
                    tours = tours.OrderBy(t => t.CreatedAt);
                    break;

                // Mặc định nếu không truyền sort
                default:
                    tours = tours.OrderByDescending(t => t.CreatedAt);
                    break;
            }


            return tours;
        }
        public async Task<TourListResponse> GetToursAsync(TourQueryDto query)
        {
            var tours = BuildTourQuery(query);

            int total = await tours.CountAsync();

            var toursData = await tours
            .Skip((query.Page - 1) * query.Limit)
            .Take(query.Limit)
            .ToListAsync();

            return new TourListResponse
            {
                Data = toursData.Select(MapTour).ToList(),
                TotalItems = total,
                Page = query.Page,
                Limit = query.Limit,
                TotalPages = (int)Math.Ceiling((double)total / query.Limit)
            };
        }

        public async Task<byte[]> ExportExcelAsync(TourQueryDto query)
        {
            var tours = await BuildTourQuery(query).ToListAsync();
            if (!tours.Any())
            {
                throw new InvalidOperationException("Không có dữ liệu để xuất.");
            }
            using var workbook = new XLWorkbook();

            var worksheet = workbook.Worksheets.Add("Tours");
            worksheet.Cell(1, 1).Value = "STT";
            worksheet.Cell(1, 2).Value = "Tên tour";
            worksheet.Cell(1, 3).Value = "Điểm đến";
            worksheet.Cell(1, 4).Value = "Loại tour";
            worksheet.Cell(1, 5).Value = "Số ngày";
            worksheet.Cell(1, 6).Value = "Giá";
            worksheet.Cell(1, 7).Value = "Giá khuyến mãi";
            worksheet.Cell(1, 8).Value = "Trạng thái";
            // Ghi dữ liệu...
            int row = 2;
            int stt = 1;

            foreach (var tour in tours)
            {
                worksheet.Cell(row, 1).Value = stt++;
                worksheet.Cell(row, 2).Value = tour.Title;
                worksheet.Cell(row, 3).Value = tour.Location;
                worksheet.Cell(row, 4).Value = tour.TripType;
                worksheet.Cell(row, 5).Value = tour.Days;
                worksheet.Cell(row, 6).Value = tour.Price;
                worksheet.Cell(row, 7).Value =tour.DiscountPrice.HasValue? tour.DiscountPrice.Value: "";
                worksheet.Cell(row, 8).Value = tour.IsActive
                    ? "Đang mở bán"
                    : "Ngừng bán";

                row++;
            }
            worksheet.RangeUsed().SetAutoFilter();
            worksheet.SheetView.FreezeRows(1);
            worksheet.Columns().AdjustToContents();
            worksheet.Row(1).Style.Font.Bold = true;
            worksheet.Row(1).Style.Alignment.Horizontal = XLAlignmentHorizontalValues.Center;
            worksheet.Row(1).Style.Fill.BackgroundColor = XLColor.LightGreen;
            worksheet.Column(6).Style.NumberFormat.Format = "#,##0 ₫";
            worksheet.Column(7).Style.NumberFormat.Format = "#,##0 ₫";
            worksheet.Column(1).Style.Alignment.Horizontal = XLAlignmentHorizontalValues.Center;

            worksheet.Column(5).Style.Alignment.Horizontal = XLAlignmentHorizontalValues.Center;

            worksheet.Column(8).Style.Alignment.Horizontal = XLAlignmentHorizontalValues.Center;
            using var stream = new MemoryStream();

            workbook.SaveAs(stream);

            return stream.ToArray();
        }

        public async Task<TourResponse> CreateTour(CreateTourRequest request)
        {
            var tour = new Tour
            {
                Title = request.Title,
                Location = request.Location,
                Days = request.Days,
                Price = request.Price,
                DiscountPrice = request.DiscountPrice,
                Description = request.Description,
                DealEndDate = request.DealEndDate,
                CoverImage = request.CoverImage,
                Activities = request.Activities,
                TripType = request.TripType,
                Difficulty = request.Difficulty,
                IsActive = request.IsActive,

                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow
            };

            var sortOrder = 0;

            foreach (var image in request.AlbumImages)
            {
                tour.Images.Add(new TourImage
                {
                    ImageUrl = image,
                    SortOrder = sortOrder++
                });
            }


            //điểm nổi bật
            var highlightOrder = 0;

            foreach (var item in request.Highlights)
            {
                tour.Highlights.Add(new TourHighlight
                {
                    Content = item,
                    SortOrder = highlightOrder++
                });
            }

            //lịch trình
            foreach (var item in request.Itineraries)
            {
                tour.Itineraries.Add(new TourItinerary
                {
                    DayNumber = item.DayNumber,
                    Title = item.Title,
                    Description = item.Description
                });
            }

            //faq
            var faqOrder = 0;

            foreach (var item in request.Faqs)
            {
                tour.Faqs.Add(new TourFaq
                {
                    Question = item.Question,
                    Answer = item.Answer,
                    SortOrder = faqOrder++
                });
            }

            _context.Tours.Add(tour);
            await _context.SaveChangesAsync();

            return MapTour(tour);
        }
        public async Task<TourResponse?> UpdateTour(Guid id, UpdateTourRequest request)
        {
            var existingTour = await _context.Tours
            .Include(x => x.Images)
            .Include(x => x.Highlights)
            .Include(x => x.Itineraries)
            .Include(x => x.Faqs)
            .FirstOrDefaultAsync(x => x.Id == id);

            if (existingTour == null)
            {
                return null;
            }

            existingTour.Title = request.Title;
            existingTour.Location = request.Location;
            existingTour.Days = request.Days;
            existingTour.Price = request.Price;
            existingTour.DiscountPrice = request.DiscountPrice;
            existingTour.Description = request.Description;
            existingTour.DealEndDate = request.DealEndDate;
            existingTour.CoverImage = request.CoverImage;
            existingTour.Activities = request.Activities;
            existingTour.IsActive = request.IsActive;
            existingTour.TripType = request.TripType;

            existingTour.Difficulty = request.Difficulty;
            existingTour.UpdatedAt = DateTime.UtcNow;

            _context.TourImages.RemoveRange(existingTour.Images);
            existingTour.Images.Clear();

            var index = 0;

            foreach (var image in request.AlbumImages)
            {
                existingTour.Images.Add(new TourImage
                {
                    ImageUrl = image,
                    SortOrder = index++
                });
            }


            //điểm nổi bật
            _context.TourHighlights.RemoveRange(existingTour.Highlights);

            existingTour.Highlights.Clear();

            var highlightOrder = 0;

            foreach (var item in request.Highlights)
            {
                existingTour.Highlights.Add(new TourHighlight
                {
                    Content = item,
                    SortOrder = highlightOrder++
                });
            }

            //lịch trình
            _context.TourItineraries.RemoveRange(existingTour.Itineraries);

            existingTour.Itineraries.Clear();

            foreach (var item in request.Itineraries)
            {
                existingTour.Itineraries.Add(new TourItinerary
                {
                    DayNumber = item.DayNumber,
                    Title = item.Title,
                    Description = item.Description
                });
            }

            //faq
            _context.TourFaqs.RemoveRange(existingTour.Faqs);

            existingTour.Faqs.Clear();

            var faqOrder = 0;

            foreach (var item in request.Faqs)
            {
                existingTour.Faqs.Add(new TourFaq
                {
                    Question = item.Question,
                    Answer = item.Answer,
                    SortOrder = faqOrder++
                });
            }

            await _context.SaveChangesAsync();

            return MapTour(existingTour);
        }

        public async Task<TourResponse?> GetTourByIdAsync(Guid id)
        {
            var tour = await _context.Tours
                .AsNoTracking()
                .Include(t => t.Images)
                .Include(t => t.Highlights)
                .Include(t => t.Itineraries)
                .Include(t => t.Faqs)
                .FirstOrDefaultAsync(t => t.Id == id);

            if (tour == null)
                return null;

            return MapTour(tour);
        }

        public async Task<bool> DeleteTour(Guid id)
        {
            var tour = await _context.Tours
            .Include(t => t.Images)
            .Include(t => t.Highlights)
            .Include(t => t.Itineraries)
            .Include(t => t.Faqs)
            .FirstOrDefaultAsync(t => t.Id == id);

            if (tour == null)
            {
                return false;
            }

            _context.Tours.Remove(tour);

            await _context.SaveChangesAsync();

            return true;
        }


        //thẻ thống kê tour
        public async Task<TourStatisticsResponse> GetStatisticsAsync()
        {
            var now = DateTime.UtcNow;

            return new TourStatisticsResponse
            {
                TotalTours = await _context.Tours.CountAsync(),

                ActiveTours = await _context.Tours
                    .CountAsync(x => x.IsActive),

                InactiveTours = await _context.Tours
                    .CountAsync(x => !x.IsActive),

                DealTours = await _context.Tours
                    .CountAsync(x =>
                        x.DiscountPrice != null &&
                        x.DealEndDate != null &&
                        x.DealEndDate > now)
            };
        }

        //trang thái mở bán/ ngừng/đang mở
        public async Task<bool> UpdateStatusAsync(Guid id,bool isActive)
        {
            var tour = await _context.Tours.FirstOrDefaultAsync(x => x.Id == id);

            if (tour == null)
            {
                return false;
            }

            tour.IsActive = isActive;

            tour.UpdatedAt = DateTime.UtcNow;

            await _context.SaveChangesAsync();

            return true;
        }


        //thay đổi trạng thái bán tour hàng loạt
        public async Task<int> BulkUpdateStatusAsync( List<Guid> ids,bool isActive)
        {
            return await _context.Tours
                .Where(x => ids.Contains(x.Id))
                .ExecuteUpdateAsync(setters =>
                    setters
                        .SetProperty(x => x.IsActive, isActive)
                        .SetProperty(
                            x => x.UpdatedAt,
                            DateTime.UtcNow));
        }

        //xoá tour hàng loạt
        public async Task<int> BulkDeleteAsync(List<Guid> ids)
        {
            var tours = await _context.Tours

                .Include(x => x.Images)

                .Include(x => x.Highlights)

                .Include(x => x.Itineraries)

                .Include(x => x.Faqs)

                .Where(x => ids.Contains(x.Id))

                .ToListAsync();

            if (!tours.Any())
                return 0;

            _context.TourImages.RemoveRange(
                tours.SelectMany(x => x.Images));

            _context.TourHighlights.RemoveRange(
                tours.SelectMany(x => x.Highlights));

            _context.TourItineraries.RemoveRange(
                tours.SelectMany(x => x.Itineraries));

            _context.TourFaqs.RemoveRange(
                tours.SelectMany(x => x.Faqs));

            _context.Tours.RemoveRange(tours);

            await _context.SaveChangesAsync();

            return tours.Count;
        }
    }

}