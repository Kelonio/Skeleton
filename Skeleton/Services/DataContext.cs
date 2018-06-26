using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

using Skeleton.Models;

namespace Skeleton.Services
{
    /* heredamos de IdntityDbContext en vez de  DbContext 
     * 
     *The Microsoft.AspNetCore.Identity.EntityFrameworkCore namespace implements 
     * the IdentityDbContext<TUser> which inherits from DbContext. 
     * This class provides the ready DbSets for all the identity models
     * 
     */

    public class DataContext : IdentityDbContext<User>
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options)
        { }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            // Customize the ASP.NET Identity model and override the defaults if needed.
            // For example, you can rename the ASP.NET Identity table names and more.
            // Add your customizations after calling base.OnModelCreating(builder);


            builder.Entity<User>(entity => { entity.ToTable(name: "User"); });
            builder.Entity<IdentityRole>(entity => { entity.ToTable(name: "Role"); });
            builder.Entity<IdentityUserRole<string>>(entity => { entity.ToTable("UserRoles"); });
            builder.Entity<IdentityUserClaim<string>>(entity => { entity.ToTable("UserClaims"); });
            builder.Entity<IdentityUserLogin<string>>(entity => { entity.ToTable("UserLogins"); });
            builder.Entity<IdentityUserToken<string>>(entity => { entity.ToTable("UserToken"); });
            builder.Entity<IdentityRoleClaim<string>>(entity => { entity.ToTable("RoleClaim"); });



            // Data seed 
            builder.Entity<IdentityRole>().HasData(
                new IdentityRole { Id = "637c20cb-8842-4e3c-be41-76bbe93b4e51", Name = "Admin", NormalizedName = "ADMIN" },
                new IdentityRole { Id = "f12ed440-e572-4f39-a591-94d6abf67277", Name = "User", NormalizedName = "USER" }
            );

            //
            builder.Entity<User>().HasData(new User { Id = "9cd9fbc0-f320-4da6-8dfd-aae10431482d",
                                                      UserName = "admin@inercya.com",
                                                      Email = "admin@inercya.com",
                                                      NormalizedUserName = "ADMIN@INERCYA.COM",
                                                      NormalizedEmail = "ADMIN@INERCYA.COM",
                                                      PasswordHash = "AQAAAAEAACcQAAAAEJfdhyR1st1A3PRlZXZTCCbj4u4Fdk+FazY/znr9bd3GTXBYfBG91mT0B4JpRQFb+Q==",  //la contraseña es Admin123
                                                      SecurityStamp = "76SGILIRBMDFGEVL3GY4TPPXCPE4WWHJ",
                                                      ConcurrencyStamp = "f7a84f35-1703-47cd-92e7-e1464a802f74",
                                                      LockoutEnabled = true,
                                                      EmailConfirmed =false
                                                       });

            builder.Entity<IdentityUserRole<string>>().HasData(new IdentityUserRole<string> { RoleId = "637c20cb-8842-4e3c-be41-76bbe93b4e51", UserId = "9cd9fbc0-f320-4da6-8dfd-aae10431482d" });

        }


    }
}
