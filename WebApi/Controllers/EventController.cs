using DataEntities.Models;
using DataEntities.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using WebApi.Common;

namespace WebApi.Controllers
{
    public class EventController : ApiController
    {
        private UnitOfWork unitOfWork = new UnitOfWork();
        [HttpPost]
        [AllowAnonymous]
        [Route("api/AddEvent")]
        public IHttpActionResult AddEvent(Event eventDetails)
        {
            eventDetails.EventStartTime = eventDetails.EventStartTime.AddMinutes(330);
            eventDetails.EventEndTime = eventDetails.EventEndTime.AddMinutes(330);
            var eventDetail = unitOfWork.EventRepository.Get(filter: q => q.Name == eventDetails.Name);
            if (!(eventDetail.Count() > 0))
            {
                unitOfWork.EventRepository.Insert(eventDetails);
                unitOfWork.Save();
                return Ok(eventDetails);

            }
            else
            {
                return new HttpActionResult(HttpStatusCode.BadRequest, "User already Exist.");
            }

        }
        [HttpGet]
        [AllowAnonymous]
        [Route("api/GetEvents")]
        public IHttpActionResult GetEvents()
        {
            var events = unitOfWork.EventRepository.Get(orderBy: q => q.OrderBy(d => d.Name));
            var eventEntities = events as List<Event> ?? events.ToList();
            if (eventEntities.Any())
                return Ok(eventEntities);
            return new HttpActionResult(HttpStatusCode.NotFound, "Events not found.");
        }
        [HttpGet]
        [AllowAnonymous]
        [Route("api/GetEvent")]
        public IHttpActionResult GetEvent(int Id)
        {
            var eventDetail = unitOfWork.EventRepository.GetByID(Id);
            if (eventDetail != null)
            {
                return Ok(eventDetail);
            }
            else
            {
                return new HttpActionResult(HttpStatusCode.NotFound, "Event not found.");
            }


        }

        [HttpPost]
        [AllowAnonymous]
        [Route("api/UpdateEvent")]
        public IHttpActionResult UpdateEvent(Event eventDetails)
        {
            if ((eventDetails.Id > 0))
            {
                eventDetails.EventStartTime = eventDetails.EventStartTime.AddMinutes(330);
                eventDetails.EventEndTime = eventDetails.EventEndTime.AddMinutes(330);
                unitOfWork.EventRepository.Update(eventDetails);
                unitOfWork.Save();
                return Ok(eventDetails);

            }
            else
            {
                return new HttpActionResult(HttpStatusCode.NotFound, "Event not Found.");
            }

        }
        [HttpPost]
        [AllowAnonymous]
        [Route("api/DeleteEvent")]
        public IHttpActionResult DeleteEvent(Event eventDetails)
        {
            if ((eventDetails.Id > 0))
            {
                unitOfWork.EventRepository.Delete(eventDetails);
                unitOfWork.Save();
                return Ok(eventDetails);

            }
            else
            {
                return new HttpActionResult(HttpStatusCode.NotFound, "Event not Found.");
            }

        }
    }
}
