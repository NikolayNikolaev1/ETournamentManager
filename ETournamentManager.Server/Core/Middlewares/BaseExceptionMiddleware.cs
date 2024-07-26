namespace Core.Middlewares
{
    using Exceptions;
    using Microsoft.AspNetCore.Diagnostics;
    using Microsoft.AspNetCore.Http;
    using Microsoft.AspNetCore.Mvc;
    using System.Reflection;

    public abstract class BaseExceptionMiddleware
    {
        public RequestDelegate Get =>
            async httpContext =>
            {
                var errorFeature = httpContext.Features.Get<IExceptionHandlerFeature>();
                var exception = errorFeature
                    ?.Error ?? new Exception($"{"Cannot get exception from"} {nameof(IExceptionHandlerFeature)}");

                var instanceId = Guid.NewGuid();
                var problemDetails = new ProblemDetails { Instance = instanceId.ToString() };

                switch (exception)
                {
                    case BadHttpRequestException badHttpRequestException:
                        HandleBadHttpRequest(httpContext, problemDetails, badHttpRequestException);
                        break;
                    case BusinessServiceException businessException:
                        HandleValidationException(problemDetails, businessException);
                        break;
                    default:
                        HandleException(httpContext, problemDetails, exception);
                        break;
                }

                httpContext.Response.StatusCode = problemDetails.Status ?? StatusCodes.Status500InternalServerError;
                await httpContext.Response.WriteAsJsonAsync(problemDetails);
            };




        protected virtual void HandleBadHttpRequest(
            HttpContext httpContext,
            ProblemDetails problemDetails,
            BadHttpRequestException badHttpRequestException)
        {
            var status = (int?)typeof(BadHttpRequestException)
                .GetProperty(
                    "StatusCode",
                    BindingFlags.NonPublic | BindingFlags.Instance)
                ?.GetValue(badHttpRequestException);

            problemDetails.Title = "Bad Request!";
            problemDetails.Status = status;
        }
        protected virtual void HandleException(
            HttpContext httpContext,
            ProblemDetails problemDetails,
            Exception exception)
        {
            problemDetails.Title = "An unexpected error occured!";
            problemDetails.Status = StatusCodes.Status500InternalServerError;
        }

        protected virtual void HandleValidationException(
            ProblemDetails problemDetails,
            BusinessServiceException businessException)
        {
            problemDetails.Title = "Invalid Request!";
            problemDetails.Detail = businessException.Message;
            problemDetails.Status = businessException.StatusCode;
            problemDetails.Extensions["Data"] = businessException.ParameterName;
        }
    }
}
