namespace Core.Exceptions
{
    using static Core.Common.Constants.ErrorMessages;

    public class BusinessServiceException : Exception
    {
        public BusinessServiceException(string message)
            : this(DEFAULT_BUSSINESS_ERROR_TITLE, message, string.Empty, 400) { }

        public BusinessServiceException(string message, int statusCode)
            : this(DEFAULT_BUSSINESS_ERROR_TITLE, message, string.Empty, statusCode) { }

        public BusinessServiceException(string message, string title, string parameterName)
            : this(message, title, parameterName, 400) { }

        public BusinessServiceException(string message, string title, string parameterName, int statusCode)
            : base(message)
        {
            Title = title;
            ParameterName = parameterName;
            StatusCode = statusCode;
        }

        public string Title { get; set; }

        public string ParameterName { get; set; }

        public int StatusCode { get; set; }
    }
}
