namespace Core.Extensions
{
    using Microsoft.AspNetCore.Mvc;

    public static class SuccessResponseExtension
    {
        public static async Task<OkObjectResult> ReturnOkResult<T>(this Task<T> task)
            => new(await task);

        public static async Task<OkResult> ReturnOkResult(this Task task)
        {
            await task;
            return new OkResult();
        }
    }
}
