namespace EmsApi.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class init1 : DbMigration
    {
        public override void Up()
        {
            DropForeignKey("dbo.Positions", "Employee_EmployeeId", "dbo.Employees");
            DropIndex("dbo.Positions", new[] { "Employee_EmployeeId" });
            RenameColumn(table: "dbo.Positions", name: "Employee_EmployeeId", newName: "EmployeeId");
            AddColumn("dbo.EmployeeDependencies", "EmployeeId", c => c.Int(nullable: false));
            AlterColumn("dbo.Positions", "EmployeeId", c => c.Int(nullable: false));
            CreateIndex("dbo.Positions", "EmployeeId");
            AddForeignKey("dbo.Positions", "EmployeeId", "dbo.Employees", "EmployeeId", cascadeDelete: true);
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.Positions", "EmployeeId", "dbo.Employees");
            DropIndex("dbo.Positions", new[] { "EmployeeId" });
            AlterColumn("dbo.Positions", "EmployeeId", c => c.Int());
            DropColumn("dbo.EmployeeDependencies", "EmployeeId");
            RenameColumn(table: "dbo.Positions", name: "EmployeeId", newName: "Employee_EmployeeId");
            CreateIndex("dbo.Positions", "Employee_EmployeeId");
            AddForeignKey("dbo.Positions", "Employee_EmployeeId", "dbo.Employees", "EmployeeId");
        }
    }
}
