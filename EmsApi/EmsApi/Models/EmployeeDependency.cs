using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace EmsApi.Models
{
    public class EmployeeDependency
    {
        public int EmployeeDependencyId { get; set; }

        public int EmployeeId { get; set; }
        public string LastName { get; set; }
        public string FirstName { get; set; }
        public DateTime DOB { get; set; }
        public string Relation { get; set; }
    }
}