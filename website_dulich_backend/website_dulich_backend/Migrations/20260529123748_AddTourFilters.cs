using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace website_dulich_backend.Migrations
{
    /// <inheritdoc />
    public partial class AddTourFilters : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Activities",
                table: "Tours",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Difficulty",
                table: "Tours",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "TripType",
                table: "Tours",
                type: "nvarchar(max)",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Activities",
                table: "Tours");

            migrationBuilder.DropColumn(
                name: "Difficulty",
                table: "Tours");

            migrationBuilder.DropColumn(
                name: "TripType",
                table: "Tours");
        }
    }
}
