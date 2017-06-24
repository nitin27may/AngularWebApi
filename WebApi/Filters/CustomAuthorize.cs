using System;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;
using System.Web.Http.Controllers;
using WebApi.Common;

namespace WebApi.Filters
{
    public class CustomAuthorize : AuthorizeAttribute
    {
        protected override bool IsAuthorized(HttpActionContext actionContext)
        {
            if (actionContext.Request.Headers.GetValues("authenticationToken") != null)
            {
                // get value from header
                string authenticationToken = Convert.ToString(
                  actionContext.Request.Headers.GetValues("authenticationToken").FirstOrDefault());
                //authenticationTokenPersistant
                // it is saved in some data store
                // i will compare the authenticationToken sent by client with
                // authenticationToken persist in database against specific user, and act accordingly
                string userName = string.Empty;
                var result = ManageToken.ValidateToken(authenticationToken, out userName);
                if (result != true)
                {
                    HttpContext.Current.Response.AddHeader("authenticationToken", authenticationToken);
                    HttpContext.Current.Response.AddHeader("AuthenticationStatus", "NotAuthorized");
                    actionContext.Response = actionContext.Request.CreateResponse(HttpStatusCode.Unauthorized);
                    return false;
                }

                HttpContext.Current.Response.AddHeader("authenticationToken", authenticationToken);
                HttpContext.Current.Response.AddHeader("AuthenticationStatus", "Authorized");
                return true;
            }
            actionContext.Response =
              actionContext.Request.CreateResponse(HttpStatusCode.ExpectationFailed);
            actionContext.Response.ReasonPhrase = "Please provide valid inputs";
            return false;
        }
    }
}