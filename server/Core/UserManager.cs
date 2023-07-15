namespace Core
{
    using Microsoft.AspNetCore.Cryptography.KeyDerivation;
    using System.Security.Cryptography;

    public class UserManager
    {
        private string email = string.Empty;
        private string hashedPassword = string.Empty;

        public UserManager(string email, string password)
        {
            this.Email = email;
            this.HashedPassword = password;
        }

        public string Email
        {
            get => this.email;
            private set
            {
                if (value.Length == 0 || value == null)
                {
                    throw new ArgumentNullException("Email can not be null or empty.");
                }

                this.email = value;
            }
        }

        public string HashedPassword
        {
            get => this.hashedPassword;
            private set
            {
                if (value.Length == 0 || value == null)
                {
                    throw new ArgumentNullException("Password can not be null or empty.");
                }


                // Generate a 128-bit salt using a sequence of cryptographically strong random bytes.
                byte[] salt = RandomNumberGenerator.GetBytes(128 / 8); // Divide by 8 to convert bits to bytes.

                // Derive a 256-bit subkey (use HMACSHA256 with 100,000 iterations)
                string hashedPassword = Convert.ToBase64String(KeyDerivation.Pbkdf2(
                    password: value!,
                    salt: salt,
                    prf: KeyDerivationPrf.HMACSHA256,
                    iterationCount: 100000,
                    numBytesRequested: 256 / 8));

                this.hashedPassword = hashedPassword;
            }
        }
    }
}
