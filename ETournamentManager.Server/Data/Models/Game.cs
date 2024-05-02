namespace Data.Models
{
    using System.ComponentModel.DataAnnotations;

    public class Game
    {
        public Guid Id { get; set; } = Guid.NewGuid();

        [Required]
        public string Name { get; set; } = null!;
    }
}
