using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using EmsApi.Models;

namespace EmsApi.Controllers
{
    public class EmployeesController : ApiController
    {
        private ApplicationDbContext db = new ApplicationDbContext();

        // GET: api/Employees
        public IQueryable<Employee> GetEmployees()
        {
            return db.Employees;
        }

        // GET: api/Employees/5
        [ResponseType(typeof(EmployeeViewModels))]
        public IHttpActionResult GetEmployeeById(int id)
        {
            Employee employee = db.Employees.Find(id);
            if (employee == null)
            {
                return NotFound();
            }
            var employeeDependency = db.EmployeeDependencies.FirstOrDefault(c => c.EmployeeId == employee.EmployeeId);
            var position = db.Positions.FirstOrDefault(c => c.EmployeeId == employee.EmployeeId);



            return Ok(new EmployeeViewModels { employee = employee, employeeDependency = employeeDependency, position = position});
        }

        // PUT: api/Employees/5
        [ResponseType(typeof(void))]
        public IHttpActionResult EditEmployee(int id, EmployeeViewModels data)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != data.employee.EmployeeId)
            {
                return BadRequest();
            }

            db.Entry(data.employee).State = EntityState.Modified;
            db.Entry(data.employeeDependency).State = EntityState.Modified;
            db.Entry(data.position).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!EmployeeExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Ok();
        }

        // POST: api/Employees
        [ResponseType(typeof(void))]
        public IHttpActionResult AddEmployee(EmployeeViewModels data)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Employees.Add(data.employee);
            db.EmployeeDependencies.Add(data.employeeDependency);
            db.Positions.Add(data.position);
            db.SaveChanges();

            return Ok();
        }

        // DELETE: api/Employees/5
        [ResponseType(typeof(void))]
        public IHttpActionResult DeleteEmployee(int id)
        {
            Employee employee = db.Employees.Find(id);
            if (employee == null)
            {
                return NotFound();
            }
            EmployeeDependency employeeDependency = db.EmployeeDependencies.FirstOrDefault(c => c.EmployeeId == id);
            List<Position> positions = db.Positions.Where(c => c.EmployeeId == id).ToList();
            db.Employees.Remove(employee);
            db.EmployeeDependencies.Remove(employeeDependency);
            foreach(var position in positions){
                db.Positions.Remove(position);
            }
            db.SaveChanges();

            return Ok();
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool EmployeeExists(int id)
        {
            return db.Employees.Count(e => e.EmployeeId == id) > 0;
        }
    }
}