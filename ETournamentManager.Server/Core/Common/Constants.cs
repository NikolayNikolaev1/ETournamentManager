﻿namespace Core.Common
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
            public const string STATIC_FILES_PATH = @"..\Core\Common\UploadImages";
        }

        public static class ErrorMessages
        {
            public const string DEFAULT_BUSSINESS_ERROR_TITLE = "Invalid Request!";
            public const string CLIENT_VALIDATION_ERROR_TITLE = "Invalid User Action!";
            public const string INVALID_IMAGE_FILE_EXTENSION = "Uploaded file has an invalid extension.";
            public const string INVALID_IMAGE_FILE_SIZE = "Max upload image size is 5 MB.";

            public static class Auth
            {
                public const string INVALID_LOGIN_CREDENTIALS = "User does not exist!";
                public const string NOT_AUTHENTICATED = "User not authenticated!";
                public const string USER_EMAIL_EXISTS = "User with that email already exists!";
                public const string USER_NAME_EXISTS = "User with that username already exists!";
            }

            public static class Game
            {
                public const string GAME_NOT_FOUND = "Game not found.";
            }

            public static class Team
            {
                public const string TEAM_NAME_EMPTY = "Team name can not be empty.";
                public const string TEAM_NAME_EXISTS = "Team with that name already exists.";
                public const string TEAM_TAG_EXISTS = "Team with that tag already exists.";
                public const string TEAM_TAG_EMPTY = "Team tag can not be empty.";
                public const string TEAM_NOT_FOUND = "Team not found.";
                public const string USER_NOT_CAPTAIN = "Current user is not team captain.";
            }

            public static class Tournament
            {
                public const string TOURNAMENT_NOT_FOUND = "Tournament not found.";
                public const string USER_NOT_CREATOR = "Current user is not tournament creator.";

            }
        }
    }
}
