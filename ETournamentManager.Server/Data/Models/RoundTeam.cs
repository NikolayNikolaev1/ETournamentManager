﻿namespace Data.Models
{
    public class RoundTeam
    {
        public Guid RoundId { get; set; }

        public Round Round { get; set; } = null!;

        public Guid TeamId { get; set; }

        public Team Team { get; set; } = null!;

        public bool IsWinner { get; set; } = false;
    }
}