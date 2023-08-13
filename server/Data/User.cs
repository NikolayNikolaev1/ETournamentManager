﻿namespace Data
{
    public class User
    {
        public int Id { get; set; }

        public string Email { get; set; } = null!;

        public string PasswordHash { get; set; } = null!;

        public byte[] HashSalt { get; set; } = null!;
    }
}