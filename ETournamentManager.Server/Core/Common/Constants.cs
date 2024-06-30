namespace Core.Common
{
    public static class Constants
    {
        public static class AdminCredentials
        {
            public const string Email = "admin@test.test";
            public const string Password = "Admin123!";
        }

        public static class Roles
        {
            public const string ADMIN = "ADMIN";
            public const string TOURNAMENT_CREATOR = "TOURNAMENT_CREATOR";
            public const string TOURNAMENT_PARTICIPANT = "TOURNAMENT_PARTICIPANT";
        }

        public static class AuthConfig
        {
            public const int HASH_ITERATION_COUNT = 350000;
            public const int HASH_KEY_SIZE = 128 / 8;
            public const int HASH_NUM_BYTES_REQUESTED = 256 / 8;
            public const string JWT_SECTION_NAME = "JwtCredentials";
        }
    }
}
