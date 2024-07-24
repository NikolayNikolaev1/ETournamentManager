namespace Core.Exceptions
{
    public class BusinessServiceException : Exception
    {
        public BusinessServiceException(string message)
            : base(message)
        {
        }

        public BusinessServiceException(string message, string parameterName)
            : base(message)
        {
            ParameterName = parameterName;
        }

        public string ParameterName { get; set; }
    }
}
