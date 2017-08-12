using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace EmsApi.Models
{
    public class Position
    {
        public int PositionId { get; set; }
        public int EmployeeId { get; set; }
        public string PositionName { get; set; }

    }
}