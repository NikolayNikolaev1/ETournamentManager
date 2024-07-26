namespace Core.Exceptions
{
    public class BusinessServiceException : Exception
    {
        public BusinessServiceException(string message)
            : this(message, string.Empty, 400) { }

        public BusinessServiceException(string message, string parameterName)
            : this(message, parameterName, 400) { }

        public BusinessServiceException(string message, int statusCode)
            : this(message, string.Empty, statusCode) { }

        public BusinessServiceException(string message, string parameterName, int statusCode)
            : base(message)
        {
            ParameterName = parameterName;
            StatusCode = statusCode;
        }

        public string ParameterName { get; set; }

        public int StatusCode { get; set; }
    }
}
