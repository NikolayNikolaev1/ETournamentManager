namespace Core
{
    public interface IUserManager
    {
        bool IsAuhenticated { get; }

        string Email { get; }

        string HashedPassword { get; }

        void Register(string email, string password);
    }
}
