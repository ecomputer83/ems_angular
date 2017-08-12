using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace EmsApi.Models
{
    public class Employee
    {
        public int EmployeeId { get; set; }
        public string LastName { get; set; }
        public string FirstName { get; set; }
        public DateTime DOB { get; set; }
        public virtual List<Position> Positions { get; set; }
        public virtual EmployeeDependency Dependency { get; set; }
    }
}