﻿namespace API.Domains.Auth.Models
{
    public class PasswordChangeModel
    {
        public string OldPassword { get; set; }

        public string NewPassword { get; set; }
    }
}
