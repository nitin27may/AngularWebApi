using System.Net;
using System.Net.Http;
using System.Threading;
using System.Threading.Tasks;
using System.Web.Http;

namespace WebApi.Common
{
    public class HttpActionResult : IHttpActionResult
    {
        private readonly string _message;
        private readonly HttpStatusCode _statusCode;

        public HttpActionResult(HttpStatusCode statusCode, string message)
        {
            _statusCode = statusCode;
            _message = message;
        }

        public Task<HttpResponseMessage> ExecuteAsync(CancellationToken cancellationToken)
        {
            HttpResponseMessage response = new HttpResponseMessage(_statusCode)
            {
                Content = new StringContent(_message)
            };
            return Task.FromResult(response);
        }
    }
}