using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DataEntities.Models
{
    public class User
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string ProfilePicture { get; set; }
        public long Mobile { get; set; }
        public bool Status { get; set; }
        public DateTime? Deleted { get; set; }
        public virtual Role Role { get; set; }


        [ForeignKey("Role")]
        public int RoleId { get; set; }

    }
}
