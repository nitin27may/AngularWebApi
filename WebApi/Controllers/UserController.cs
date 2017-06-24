using DataEntities.Models;
using DataEntities.Repositories;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Http;
using WebApi.Common;

namespace WebApi.Controllers
{
    public class UserController : ApiController
    {
        private UnitOfWork unitOfWork = new UnitOfWork();
        [HttpPost]
        [AllowAnonymous]
        [Route("api/AddUser")]
        public IHttpActionResult AddUser(User user)
        {
            var userDetails = unitOfWork.UserRepository.Get(filter: q => q.Email == user.Email);
            if (!(userDetails.Count() > 0))
            {
                user.Password = DataEntities.Common.ManagePassword.ComputeHash(user.Password, "SHA512", null);
                unitOfWork.UserRepository.Insert(user);
                unitOfWork.Save();

                var generatedToken = ManageToken.GenerateToken(user.Email, 10);
                string baseURL = string.Empty;
                var strUrl = HttpContext.Current.Request.Url;
                var host = "http://" + strUrl.Host;
                var port = strUrl.Port;
                if (host == "http://localhost")
                {
                    baseURL = host + ":" + port;// + "/api/Confirmation?authenticationToken="; sd
                }
                else
                {
                    baseURL = host;// + "/api/Confirmation?authenticationToken=";
                }
                if (!user.Status)
                {
                    var emailBody = Common.SendEmail.CreateEmailBody(user.FirstName, "/confimration/" + generatedToken, baseURL);
                    Common.SendEmail.Send(user.Email, "", "", "Registration Email", emailBody);
                }

                return Ok();

            }
            else
            {
                return new HttpActionResult(HttpStatusCode.BadRequest, "User already Exist.");
            }

        }
        [HttpGet]
        [AllowAnonymous]
        [Route("api/GetUsers")]
        public IHttpActionResult GetUsers()
        {
            var users = unitOfWork.UserRepository.Get(orderBy: q => q.OrderBy(d => d.FirstName));
            var userEntities = users as List<User> ?? users.ToList();
            if (userEntities.Any())
                return Ok(userEntities);
            return new HttpActionResult(HttpStatusCode.NotFound, "User not found.");
        }
        [HttpGet]
        [AllowAnonymous]
        [Route("api/GetUser")]
        public IHttpActionResult GetUser(int Id)
        {
            var user = unitOfWork.UserRepository.GetByID(Id);
            if (user != null)
            {
                user.Password = DataEntities.Common.ManagePassword.ComputeHash(user.Password, "SHA512", null);
                return Ok(user);
            }
            else
            {
                return new HttpActionResult(HttpStatusCode.NotFound, "User not found.");
            }


        }

        [HttpPost]
        [AllowAnonymous]
        [Route("api/UpdateUser")]
        public IHttpActionResult UpdateUser(User user)
        {
            if ((user.Id > 0))
            {
                user.Password = DataEntities.Common.ManagePassword.ComputeHash(user.Password, "SHA512", null);
                unitOfWork.UserRepository.Update(user);
                unitOfWork.Save();
                return Ok(user);

            }
            else
            {
                return new HttpActionResult(HttpStatusCode.NotFound, "User not Found.");
            }

        }
        [HttpPost]
        [AllowAnonymous]
        [Route("api/DeleteUser")]
        public IHttpActionResult DeleteUser(User user)
        {
            if ((user.Id > 0))
            {
                unitOfWork.UserRepository.Delete(user);
                unitOfWork.Save();
                return Ok(user);

            }
            else
            {
                return new HttpActionResult(HttpStatusCode.NotFound, "User not Found.");
            }

        }
    }
}
