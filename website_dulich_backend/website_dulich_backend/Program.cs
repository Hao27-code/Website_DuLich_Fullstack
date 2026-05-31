using Microsoft.EntityFrameworkCore;
using website_dulich_backend.Data;
using website_dulich_backend.Models;
using website_dulich_backend.Repositories;
using website_dulich_backend.Services;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options =>
{
    options.AddPolicy(
        "AngularPolicy",
        policy =>
        {
            policy
                .AllowAnyOrigin()
                .AllowAnyHeader()
                .AllowAnyMethod();
        });
});

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(
        builder.Configuration.GetConnectionString("DefaultConnection")
    )

);
builder.Services.AddScoped<
    ITourRepository,
    TourRepository
>();

builder.Services.AddScoped<
    ITourService,
    TourService
>();


builder.Services.AddControllers();

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseCors("AngularPolicy");

app.UseAuthorization();

app.MapControllers();
using (
    var scope = app.Services.CreateScope()
)
{
    var context =
        scope.ServiceProvider
            .GetRequiredService<AppDbContext>();
}
app.Run();