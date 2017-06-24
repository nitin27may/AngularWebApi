using DataEntities.Models;
using DataEntities.Repositories;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Web.Http;
using WebApi.Common;

namespace WebApi.Controllers
{
    public class RoleController : ApiController
    {
        private UnitOfWork unitOfWork = new UnitOfWork();
        [HttpPost]
        [AllowAnonymous]
        [Route("api/AddUser")]
        public IHttpActionResult AddRole(Role role)
        {
            var roleDetails = unitOfWork.RoleRepository.Get(filter: q => q.Name == role.Name);
            if (!(roleDetails.Count() > 0))
            {
                unitOfWork.RoleRepository.Insert(role);
                unitOfWork.Save();
                return Ok(role);

            }
            else
            {
                return new HttpActionResult(HttpStatusCode.BadRequest, "User already Exist.");
            }

        }
        [HttpGet]
        [AllowAnonymous]
        [Route("api/GetRoles")]
        public IHttpActionResult GetRoles()
        {
            var roles = unitOfWork.RoleRepository.Get(orderBy: q => q.OrderBy(d => d.Name));
            var roleEntities = roles as List<Role> ?? roles.ToList();
            if (roleEntities.Any())
                return Ok(roleEntities);
            return new HttpActionResult(HttpStatusCode.NotFound, "Roles not found.");
        }
        [HttpGet]
        [AllowAnonymous]
        [Route("api/GetRole")]
        public IHttpActionResult GetRole(int Id)
        {
            var role = unitOfWork.RoleRepository.GetByID(Id);
            if (role != null)
            {
                return Ok(role);
            }
            else
            {
                return new HttpActionResult(HttpStatusCode.NotFound, "Role not found.");
            }


        }

        [HttpPost]
        [AllowAnonymous]
        [Route("api/UpdateRole")]
        public IHttpActionResult UpdateRole(Role role)
        {
            if ((role.Id > 0))
            {
                unitOfWork.RoleRepository.Update(role);
                unitOfWork.Save();
                return Ok(role);

            }
            else
            {
                return new HttpActionResult(HttpStatusCode.NotFound, "Role not Found.");
            }

        }
        [HttpPost]
        [AllowAnonymous]
        [Route("api/DeleteRole")]
        public IHttpActionResult DeleteRole(Role role)
        {
            if ((role.Id > 0))
            {
                unitOfWork.RoleRepository.Delete(role);
                unitOfWork.Save();
                return Ok(role);

            }
            else
            {
                return new HttpActionResult(HttpStatusCode.NotFound, "User not Found.");
            }

        }

    }
}
