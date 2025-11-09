using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Data.Migrations
{
    /// <inheritdoc />
    public partial class ChangeNextPrevRoundsRelation : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Rounds_NextRoundId",
                table: "Rounds");

            migrationBuilder.CreateIndex(
                name: "IX_Rounds_NextRoundId",
                table: "Rounds",
                column: "NextRoundId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Rounds_NextRoundId",
                table: "Rounds");

            migrationBuilder.CreateIndex(
                name: "IX_Rounds_NextRoundId",
                table: "Rounds",
                column: "NextRoundId",
                unique: true,
                filter: "[NextRoundId] IS NOT NULL");
        }
    }
}
