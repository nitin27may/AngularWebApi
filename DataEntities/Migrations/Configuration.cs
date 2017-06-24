namespace DataEntities.Migrations
{
    using Common;
    using Models;
    using System;
    using System.Collections.Generic;
    using System.Data.Entity.Migrations;
    using System.Linq;

    internal sealed class Configuration : DbMigrationsConfiguration<DataEntities.Repositories.SocietyContext>
    {
        public Configuration()
        {
            AutomaticMigrationsEnabled = true;
        }

        protected override void Seed(DataEntities.Repositories.SocietyContext context)
        {
            context.Role.AddOrUpdate(p => p.Name,
                new Role() { Name = "Super Admin" },
                new Role() { Name = "User" });
            context.SaveChanges();

            context.Event.AddOrUpdate(p => p.Name,
             new Event() { Name = "Durga Aarati", Orgnizer = "Pankaj Singh", EventType = "5 Hours Chalisa", Country = "India", State = "Maharashtra", City = "Mumbai", Address="Near Sai Temple, Bhandup (West)", EventStartTime = DateTime.Now.AddDays(1), EventEndTime = DateTime.Now.AddHours(29), Status= 1 },
             new Event() { Name = "Durga Aarati", Orgnizer = "Anuj Singh", EventType = "5 Hours Chalisa", Country = "India", State = "Maharashtra", City = "Mumbai", Address = "Gandhi Nagar, Dombivali (East)", EventStartTime = DateTime.Now.AddDays(2), EventEndTime = DateTime.Now.AddHours(53), Status = 1 },
             new Event() { Name = "Durga Aarati", Orgnizer = "Shyam Singh", EventType = "5 Hours Chalisa", Country = "India", State = "Maharashtra", City = "Mumbai", Address = "Near Sai Temple, Bhandup (West)", EventStartTime = DateTime.Now.AddDays(3), EventEndTime = DateTime.Now.AddHours(79), Status = 1 },
             new Event() { Name = "Durga Aarati", Orgnizer = "Anil Singh", EventType = "5 Hours Chalisa", Country = "India", State = "Maharashtra", City = "Mumbai", Address = "Gandhi Nagar, Bhandup (East)", EventStartTime = DateTime.Now.AddDays(4), EventEndTime = DateTime.Now.AddHours(101), Status = 1 });
            context.SaveChanges();

            context.User.AddOrUpdate(p => p.FirstName,
               new User() { FirstName = "Nitin", LastName = "Singh", Email = "nitin27may@gmail.com", Password = ManagePassword.ComputeHash("Sh@kti009", "SHA512", null), Status = true, RoleId = context.Role.First(x => x.Name == "Super Admin").Id });
            context.SaveChanges();

        }
    }
}
