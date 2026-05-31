using Microsoft.EntityFrameworkCore;
using website_dulich_backend.Models;

namespace website_dulich_backend.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options)
        : base(options)
    {
    }

    public DbSet<Tour> Tours => Set<Tour>();


    public DbSet<TourImage> TourImages { get; set; }
    public DbSet<TourHighlight> TourHighlights { get; set; }

    public DbSet<TourItinerary> TourItineraries { get; set; }

    public DbSet<TourFaq> TourFaqs { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<TourImage>()
            .HasOne(ti => ti.Tour)
            .WithMany(t => t.Images)
            .HasForeignKey(ti => ti.TourId)
            .OnDelete(DeleteBehavior.Cascade);

        modelBuilder.Entity<TourHighlight>()
            .HasOne(h => h.Tour)
            .WithMany(t => t.Highlights)
            .HasForeignKey(h => h.TourId)
            .OnDelete(DeleteBehavior.Cascade);

        modelBuilder.Entity<TourItinerary>()
            .HasOne(i => i.Tour)
            .WithMany(t => t.Itineraries)
            .HasForeignKey(i => i.TourId)
            .OnDelete(DeleteBehavior.Cascade);

        modelBuilder.Entity<TourFaq>()
            .HasOne(f => f.Tour)
            .WithMany(t => t.Faqs)
            .HasForeignKey(f => f.TourId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}

