using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class StudentController : ControllerBase
     {
        private readonly AppDbContext _context;
        public StudentController(AppDbContext context){
            _context = context;
        }
        [HttpGet]
        public async Task<IEnumerable<Student>> GetStudent(){
            var students = await _context.Students.AsNoTracking().ToListAsync();
            return students;
        }

        [HttpPost]
        public async Task<IActionResult> Create (Student student){
            if (!ModelState.IsValid){
                return BadRequest(ModelState);
            }
            await _context.AddAsync(student);
            var result = await _context.SaveChangesAsync();

            if(result > 0){
                return Ok();
            }
            return BadRequest();
        }

         [HttpDelete ("{id:int}")]
    public async Task<IActionResult> Delete(int id){
        var student = await _context.Students.FindAsync(id);
        if(student == null){
            return NotFound();
        }

        _context.Remove(student);

           var result = await _context.SaveChangesAsync();

           if(result > 0){
            return Ok("Student was deleted");
           }
        return BadRequest ("unable to delete student");


    }

     [HttpGet("{id:int}")]

     public async Task<ActionResult<Student>> GetStudent(int id){
        var student = await _context.Students.FindAsync(id);
        if(student == null){
            return NotFound("Sorry, student was not found");
        }
        return Ok(student);
     }
     [HttpPut ("{id:int}")]
     public async Task<IActionResult> EditStudent (int id, Student student){
        var studentFromDb = await _context.Students.FindAsync(id);

        if(studentFromDb == null){
            return BadRequest ("Student not found");
        }

        studentFromDb.Name = student.Name;
        studentFromDb.Email = student.Email;
        studentFromDb.Address = student.Address;
        studentFromDb.PhoneNumber = student.PhoneNumber;

        var result = await _context.SaveChangesAsync();

        if(result > 0){
            return Ok("Student was edited");
        }
        return BadRequest("Unable to update data");
     }








    }
}