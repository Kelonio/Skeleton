using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

using Microsoft.AspNetCore.Identity;

namespace Skeleton.Models
{
    public class User : IdentityUser
    {

        public string FirstName { get; set; }

        public string LastName { get; set; }


        /* este campo no esta mapeado en db , lo necesitamos para el registro que pase la contraesña que quiere */
        [NotMapped]
        public string Password { get; set; }

        /*
        public int UserId { get; set; }       

        public string Username { get; set; }        

        public byte[] PasswordSalt { get; set; }
        */
    }

   
}
