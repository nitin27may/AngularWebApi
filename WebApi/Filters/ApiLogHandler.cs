using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http.Routing;
using WebApi.Models;

namespace WebApi.Filters
{
    public class ApiLogHandler : DelegatingHandler
    {
        protected override async Task<HttpResponseMessage> SendAsync(HttpRequestMessage request, CancellationToken cancellationToken)
        {
            var apiLogEntry = CreateApiLogEntryWithRequestData(request);
            if (request.Content != null)
            {
                await request.Content.ReadAsStringAsync()
                    .ContinueWith(task =>
                    {
                        apiLogEntry.RequestContentBody = task.Result;
                    }, cancellationToken);
            }

            return await base.SendAsync(request, cancellationToken)
                .ContinueWith(task =>
                {
                    var response = task.Result;

                    // Update the API log entry with response info
                    apiLogEntry.ResponseStatusCode = (int)response.StatusCode;
                    apiLogEntry.ResponseTimestamp = DateTime.Now;

                    if (response.Content != null)
                    {
                        apiLogEntry.ResponseContentBody = response.Content.ReadAsStringAsync().Result;
                        apiLogEntry.ResponseContentType = response.Content.Headers.ContentType.MediaType;
                        apiLogEntry.ResponseHeaders = SerializeHeaders(response.Content.Headers);
                    }

                    // TODO: Save the API log entry to the database
                    //Common.LogWriter.WriteLog(JsonConvert.SerializeObject(apiLogEntry, Formatting.Indented));

                    return response;
                }, cancellationToken);
        }

        private ApiLogEntry CreateApiLogEntryWithRequestData(HttpRequestMessage request)
        {
            var context = ((HttpContextBase)request.Properties["MS_HttpContext"]);
            var routeData = request.GetRouteData();

            return new ApiLogEntry
            {
                Application = "[insert-calling-app-here]",
                User = context.User.Identity.Name,
                Machine = Environment.MachineName,
                RequestContentType = context.Request.ContentType,
                ResponseContentBody = new StreamReader(context.Request.InputStream).ReadToEnd(),
                RequestRouteTemplate = routeData.Route.RouteTemplate,
                RequestRouteData = SerializeRouteData(routeData),
                RequestIpAddress = context.Request.UserHostAddress,
                RequestMethod = request.Method.Method,
                RequestHeaders = SerializeHeaders(request.Headers),
                RequestTimestamp = DateTime.Now,
                RequestUri = request.RequestUri.ToString()
            };
        }

        private string SerializeRouteData(IHttpRouteData routeData)
        {
            return JsonConvert.SerializeObject("", Formatting.Indented);
        }

        private string SerializeHeaders(HttpHeaders headers)
        {
            var dict = new Dictionary<string, string>();

            foreach (var item in headers.ToList())
            {
                if (item.Value != null)
                {
                    var header = String.Empty;
                    foreach (var value in item.Value)
                    {
                        header += value + " ";
                    }

                    // Trim the trailing space and add item to the dictionary
                    header = header.TrimEnd(" ".ToCharArray());
                    dict.Add(item.Key, header);
                }
            }

            return JsonConvert.SerializeObject(dict, Formatting.Indented);
        }
    }


}