namespace Core.Middlewares
{
    using Microsoft.AspNetCore.Http;
    using Microsoft.AspNetCore.Mvc;

    public class DevelopmentExceptionMiddleware : BaseExceptionMiddleware
    {
        protected override void HandleBadHttpRequest(
            HttpContext httpContext,
            ProblemDetails problemDetails,
            BadHttpRequestException badHttpRequestException)
        {
            base.HandleBadHttpRequest(httpContext, problemDetails, badHttpRequestException);

            problemDetails.Detail = badHttpRequestException.Message;
        }

        protected override void HandleException(
            HttpContext httpContext,
            ProblemDetails problemDetails,
            Exception exception)
        {
            base.HandleException(httpContext, problemDetails, exception);

            problemDetails.Detail = exception.GetBaseException().Message;
        }
    }
}
