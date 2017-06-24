using DataEntities.Models;
using System;

namespace DataEntities.Repositories
{
    public class UnitOfWork : IDisposable
    {
        private SocietyContext context = new SocietyContext();
        private GenericRepository<User> userRepository;
        private GenericRepository<Role> roleRepository;
        private GenericRepository<Event> eventRepository;

        public GenericRepository<Event> EventRepository
        {
            get
            {

                if (this.eventRepository == null)
                {
                    this.eventRepository = new GenericRepository<Event>(context);
                }
                return eventRepository;
            }
        }

        public GenericRepository<User> UserRepository
        {
            get
            {

                if (this.userRepository == null)
                {
                    this.userRepository = new GenericRepository<User>(context);
                }
                return userRepository;
            }
        }

        public GenericRepository<Role> RoleRepository
        {
            get
            {

                if (this.roleRepository == null)
                {
                    this.roleRepository = new GenericRepository<Role>(context);
                }
                return roleRepository;
            }
        }




        public void Save()
        {
            context.SaveChanges();
        }

        private bool disposed = false;

        protected virtual void Dispose(bool disposing)
        {
            if (!this.disposed)
            {
                if (disposing)
                {
                    context.Dispose();
                }
            }
            this.disposed = true;
        }

        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }
    }
}
