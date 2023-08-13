namespace Core
{
    using Microsoft.AspNetCore.Cryptography.KeyDerivation;
    using System.Security.Cryptography;

    public static class PasswordManager
    {
        const int iterationCount = 350000;
        const int keySyze = 128 / 8; // Divide by 8 to convert bits to bytes.
        const int numBytesRequested = 256 / 8;

        public static string HashPassword(string password, out byte[] salt)
        {
            // Generate a 128-bit salt using a sequence of cryptographically strong random bytes.
            salt = RandomNumberGenerator.GetBytes(keySyze);

            // Derive a 256-bit subkey (use HMACSHA256 with 100,000 iterations)
            string hashedPassword = Convert.ToBase64String(KeyDerivation.Pbkdf2(
                password: password,
                salt,
                KeyDerivationPrf.HMACSHA256,
                iterationCount,
                numBytesRequested));

            return hashedPassword;
        }

        public static bool VerifyPassword(string password, string hash, byte[] salt)
        {
            byte[] hashToCompare = KeyDerivation.Pbkdf2(
                password,
                salt,
                KeyDerivationPrf.HMACSHA256,
                iterationCount, 
                numBytesRequested);

            return CryptographicOperations.FixedTimeEquals(hashToCompare, Convert.FromBase64String(hash));
        }
    }
}
