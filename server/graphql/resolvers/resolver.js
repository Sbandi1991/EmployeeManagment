import { Employee } from "../../model/employeemodel.js";

const RETIREMENT_AGE = 64.5;

export const resolvers = {
    Query: {
        getEmployees: async (_, { employeeType }) => {
            if (!employeeType) {
                console.log("REMOTE: Fetching all employees...");
                const employees = await Employee.find({});
                return employees;
            }
            const employees = await Employee.find({ employeeType });
            return employees;
        },
        getEmployee: async (_, { id }) => {
            const employee = await Employee.findOne({ id });
            if (employee) {
                const dateOfJoining = new Date(employee.dateOfJoining);
                const retirementDate = new Date(
                    dateOfJoining.setFullYear(
                        dateOfJoining.getFullYear() + (RETIREMENT_AGE - parseInt(employee.age))
                    )
                );
                
                // Include retirementDate in the response
                return { 
                    ...employee.toObject(), 
                    retirementDate: retirementDate.toISOString().split('T')[0] 
                };
            }
            return null;
        },

        getUpcomingRetirement: async (_, { employeeType }) => {
        
          // Fetch employees
          let employees = await Employee.find({});
        
          // Filter employees by employeeType if provided
          if (employeeType) {
            employees = employees.filter(emp => emp.employeeType === employeeType);
          }
        
          // Calculate the retirement date for each employee
          const employeesWithRetirementDate = employees.map(employee => {
            const dateOfJoining = new Date(employee.dateOfJoining);
            const retirementDate = new Date(
              dateOfJoining.setFullYear(
                dateOfJoining.getFullYear() + (RETIREMENT_AGE - parseInt(employee.age))
              )
            );
        
            return { ...employee.toObject(), retirementDate: retirementDate.toISOString().split('T')[0] };
          });
        
          console.log('employeesWithRetirementDate...!!', employeesWithRetirementDate);
        
          // Get the date six months from now
          const sixMonthsFromNow = new Date();
          sixMonthsFromNow.setMonth(sixMonthsFromNow.getMonth() + 6);
        
          // Return employees whose retirement date is within the next six months
          return employeesWithRetirementDate.filter(
            emp => new Date(emp.retirementDate) <= sixMonthsFromNow
          );
        }
        
    },
    Mutation: {
        addEmployee: async (_, { employee }) => {
            if (!employee.firstName) {
                throw new Error("firstName is required and must not be empty");
            }

            if (!employee.lastName) {
                throw new Error("lastName is required and must not be empty");
            }

            const age = parseInt(employee.age, 10);
            if (isNaN(age) || age < 20 || age > 70) {
                throw new Error("age must be a number between 20 and 70");
            }

            if (employee.currentStatus != 1) {
                throw new Error("currentStatus must be 1");
            }

            const dateOfJoining = new Date(employee.dateOfJoining);
            if (isNaN(dateOfJoining.getTime())) {
                throw new Error("Invalid dateOfJoining format");
            }

            if (employee.id < 0) {
                employee.id = await Employee.getMaxId() + 1;
            }

            console.log("REMOTE: Adding employee...", employee);
            await Employee.create(employee);
            console.log("Employee added: ", employee);

            return employee;
        },
        deleteEmployee: async (_, { id }) => {
            const employee = await Employee.findOne({ id });
            
            if (employee.currentStatus === '1') {
              throw new Error("CAN’T DELETE EMPLOYEE – STATUS ACTIVE");
            }
            
            await Employee.findOneAndDelete({ id });
            return employee;
        },
        editEmployee: async (_, { id, employee }) => {
            const updatedEmployee = await Employee.findOneAndUpdate({ id }, employee, { new: true });
            return updatedEmployee;
        }
    }
};
