using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Models;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class AppDbContext :DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options){

        }

        public DbSet<Student> Students {get; set;}

        internal object AsNoTracking()
        {
            throw new NotImplementedException();
        }
    }
}