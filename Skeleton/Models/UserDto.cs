﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Skeleton.Models
{
    public class UserDto
    {
        public string Firstname { get; set; }

        public string Lastname { get; set; }

        public string Username { get; set; }

        public string Email { get; set; }

        public string Password { get; set; }

    }

    public class UserLoginDto
    {
        public string Email { get; set; }
        public string Password { get; set; }
    }

   
}
