using DataEntities.Models;
using DataEntities.Repositories;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Http;
using WebApi.Common;

namespace WebApi.Controllers
{
    public class LoginController : ApiController
    {
        private UnitOfWork unitOfWork = new UnitOfWork();
        [HttpPost]
        [AllowAnonymous]
        [Route("api/Register")]
        public IHttpActionResult Register(User user)
        {
            var userDetails = unitOfWork.UserRepository.Get(filter: q => q.Email == user.Email);
            if (!(userDetails.Count() > 0))
            {
                user.Password = DataEntities.Common.ManagePassword.ComputeHash(user.Password, "SHA512", null);
                user.RoleId = 2;
                user.Status = false;
                unitOfWork.UserRepository.Insert(user);
                unitOfWork.Save();

                var generatedToken = ManageToken.GenerateToken(user.Email, 10);
                string baseURL = string.Empty;
                var strUrl = HttpContext.Current.Request.Url;
                var host = "http://" + strUrl.Host;
                var port = strUrl.Port;
                if (host == "http://localhost")
                {
                    baseURL = host + ":" + port;// + "/api/Confirmation?authenticationToken=";
                }
                else
                {
                    baseURL = host;// + "/api/Confirmation?authenticationToken=";
                }
                var emailBody = Common.SendEmail.CreateEmailBody(user.FirstName, "/confimration/" + generatedToken, baseURL);
                Common.SendEmail.Send(user.Email, "", "", "Registration Email", emailBody);
                return Ok();

            }
            else
            {
                return new HttpActionResult(HttpStatusCode.BadRequest, "User already Exist.");
            }

        }
        [HttpGet]
        [AllowAnonymous]
        [Route("api/Confirmation")]
        public IHttpActionResult Confirmation(string authenticationToken)
        {
            string email = string.Empty;
            var result = ManageToken.ValidateToken(authenticationToken, out email);
            if (result)
            {
                var userDetails = unitOfWork.UserRepository.Get(filter: q => q.Email == email).FirstOrDefault();
                userDetails.Status = true;
                unitOfWork.UserRepository.Update(userDetails);
                unitOfWork.Save();
                return Ok(result);
            }
            else
            {
                return new HttpActionResult(HttpStatusCode.BadRequest, "Link has Expired.");
            }

        }

        [HttpPost]
        [AllowAnonymous]
        [Route("api/Login")]
        public IHttpActionResult Login(User user)
        {
            var userDetails = unitOfWork.UserRepository.Get(filter: q => q.Email == user.Email).FirstOrDefault();
            if (userDetails != null)
            {
                if (DataEntities.Common.ManagePassword.VerifyHash(user.Password, "SHA512", userDetails.Password))
                {
                    return Ok(user);
                }
                else
                {
                    return new HttpActionResult(HttpStatusCode.BadRequest, "Email or Password wrong.");
                }



            }
            else
            {
                return new HttpActionResult(HttpStatusCode.BadRequest, "User is not registered");
            }

        }

        [HttpPost]
        [AllowAnonymous]
        [Route("api/PasswordReset")]
        public IHttpActionResult PasswordReset(User user)
        {
            var userDetails = unitOfWork.UserRepository.Get(filter: q => q.Email == user.Email);
            if (userDetails.Count() > 0)
            {
                var generatedToken = ManageToken.GenerateToken(user.Email, 10);
                string baseURL = string.Empty;
                var strUrl = HttpContext.Current.Request.Url;
                var host = "http://" + strUrl.Host;
                var port = strUrl.Port;
                if (host == "http://localhost")
                {
                    baseURL = host + ":" + port;
                }
                else
                {
                    baseURL = host;
                }
                var emailBody = Common.SendEmail.CreateEmailBody(user.FirstName, "/reset-password/" + generatedToken, baseURL);
                Common.SendEmail.Send(user.Email, "", "", "Password Reset Email", emailBody);
                return Ok();

            }
            else
            {
                return new HttpActionResult(HttpStatusCode.BadRequest, "User already Exist.");
            }

        }

        [HttpPost]
        [AllowAnonymous]
        [Route("api/PasswordUpdate")]
        public IHttpActionResult PasswordUpdate(User user)
        {
            var re = Request;
            var headers = re.Headers;
            string email = string.Empty;
            string token = string.Empty;
            if (headers.Contains("authenticationToken"))
            {

                token = headers.GetValues("authenticationToken").First();

            }

            var result = ManageToken.ValidateToken(token, out email);

            if (result)
            {
                var userDetails = unitOfWork.UserRepository.Get(filter: q => q.Email == email).FirstOrDefault();
                userDetails.Password = DataEntities.Common.ManagePassword.ComputeHash(user.Password, "SHA512", null);
                unitOfWork.UserRepository.Update(userDetails);
                unitOfWork.Save();
                return Ok();

            }
            else
            {
                return new HttpActionResult(HttpStatusCode.BadRequest, "Link has expired.");
            }


        }
    }
}
