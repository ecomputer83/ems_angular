using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace EmsApi.Models
{
    public class EmployeeViewModels
    {
        public Employee employee { get; set; }
        public EmployeeDependency employeeDependency { get; set; }
        public Position position { get; set; }
    }
}