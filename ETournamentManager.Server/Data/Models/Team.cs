namespace Data.Models
{
    using System.ComponentModel.DataAnnotations;

    public class Team
    {
        public Guid Id { get; set; } = Guid.NewGuid();

        [Required]
        public string Name { get; set; } = null!;

        public User Captain { get; set; } = null!;

        public int CaptainId { get; set; }
    }
}
