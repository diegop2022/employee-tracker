const data = require('./db/index.js')
const { prompt } = require('inquirer');
const db = require('./db/index.js');

function init() {
    whatToDo();
}
init()

function whatToDo() {
    prompt([
        {
            type: 'checkbox',
            name: 'todo',
            message: 'What would you like to do?',
            choices: [
                {
                    name: "view all employees",
                    value: "View_All_Employees"
                },
                {
                    name: "add employee",
                    value: "Add_Employee",
                },
                {
                    name: "update employee's role",
                    value: 'Update_Employee_Role'
                },
                {
                    name: "view all roles",
                    value: "View_All_Roles"
                },
                {
                    name: "add role",
                    value: 'Add_Role'
                },
                {
                    name: "view all departments",
                    value: "View_All_Departments"
                },
                {
                    name: "add department",
                    value: "Add_Department"
                },
                {
                    name: "quit",
                    value: "Quit"
                }
            ],
        },
    ])
        .then(res => {
            let choice = res.todo[0];
            switch (choice) {
                case "View_All_Employees":
                    viewEmployees();
                    break;
                case "Add_Employee":
                    addEmployee();
                    break;
                case 'Update_Employee_Role':
                    updateEmployeeRole();
                    break;
                case "View_All_Roles":
                    viewRoles();
                    break;
                case "Add_Role":
                    addRole();
                    break;
                case "View_All_Departments":
                    viewDepartments();
                    break;
                case "Add_Department":
                    addDepartment();
                    break;
                case "Quit":
                    quit();
                    break;
            }

        })
}

function viewEmployees() {
    // show table of all employees and info
    db.viewEmployees()
        .then(([rows]) => {
            let employees = rows;
            console.log("\n");
            console.table(employees)
        })
        .then(whatToDo)
}

function addEmployee() {
    prompt([
        {
            type: "Input",
            name: "first_name",
            message: "Enter first name:"
        },
        {
            type: "Input",
            name: "last_name",
            message: "Enter last name:"
        }
    ])
        .then(res => {
            let firstName = res.first_name;
            let lastName = res.last_name;
            db.viewRoles()
                .then(([rows]) => {
                    let roles = rows;
                    const roleChoices = roles.map(({ id, title }) => ({
                        name: title, value: id
                    }));
                    prompt([
                        {
                            type: "list",
                            name: "roleId",
                            message: "What is the employee's role?",
                            choices: roleChoices
                        }
                    ])
                        .then(res => {
                            let roleId = res.roleId;
                            db.viewEmployees()
                                .then(([rows]) => {
                                    let employees = rows;
                                    console.log(employees);
                                    const managerChoices = employees.map(({ id, full_name }) => ({
                                        name: full_name,
                                        value: id
                                    }));
                                    managerChoices.unshift({ name: "none", value: null });
                                    prompt([
                                        {
                                            type: "list",
                                            name: "managerId",
                                            message: "Who is employee's manager?",
                                            choices: managerChoices
                                        }
                                    ])
                                        .then(res => {
                                            let employee = {
                                                manager_id: res.managerId,
                                                role_id: roleId,
                                                first_name: firstName,
                                                last_name: lastName
                                            }
                                            db.createEmployee(employee)
                                                .then(console.log(`added ${firstName} to database`))
                                                .then(() => whatToDo)
                                        })
                                })
                        })
                })
        })
}

const updateEmployeeRole = () => {
    //update employee role on table
    db.viewEmployees()
        .then(([rows]) => {
            let employees = rows;
            const employeeChoices = employees.map(({ id, full_name }) => ({
                name: full_name,
                value: id
            }))
            prompt([
                {
                    type: "list",
                    name: "employeeName",
                    message: "Select an employee to change:",
                    choices: employeeChoices
                }
            ])
                .then(res => {
                    let employeeId = res.employeeName;
                    db.viewRoles()
                        .then(([rows]) => {
                            let roles = rows;
                            const roleChoices = roles.map(({ id, title }) => ({
                                name: title,
                                value: id
                            }));
                            prompt([
                                {
                                    type: "list",
                                    name: "roleChoice",
                                    message: "Choose new role for employee",
                                    choices: roleChoices
                                }
                            ])
                                .then(res => {
                                    roleId = res.roleChoice
                                    db.changeEmployeeRole(roleId, employeeId)
                                        .then(() => whatToDo)
                                })
                        })
                })
        })
}

function viewRoles() {
    //show table of all roles
    db.viewRoles()
        .then(([rows]) => {
            let roles = rows;
            console.table(roles)
        })
        .then(whatToDo)
}

const addRole = () => {
    prompt([
        {
            type: "input",
            name: "title",
            message: "Enter title of role:"
        },
        {
            type: "number",
            name: "salary",
            message: "Enter salary of role:"
        },
    ])
        .then(res => {
            let roleTitle = res.title;
            let roleSalary = res.salary;
            db.viewDepartments()
                .then(([rows]) => {
                    let departments = rows;
                    console.log(departments)
                    const departmentChoices = departments.map(({ name }) => ({
                        name
                    }));
                    prompt([
                        {
                            type: "list",
                            name: "departmentId",
                            message: "What is the role's department?",
                            choices: departmentChoices
                        }
                    ])
                        .then(res => {
                            let role = {
                                title: roleTitle,
                                salary: roleSalary,

                            }
                            db.createRole(role)
                                .then(console.log(`added ${roleTitle} to database`))
                                .then(whatToDo)
                        })
                })
        })
}

const viewDepartments = () => {
    db.viewDepartments()
        .then(([rows]) => {
            let departments = rows;
            console.table(departments)
        })
        .then(whatToDo)
}

const addDepartment = () => {
    prompt([
        {
            type: "input",
            name: "department_name",
            message: "Enter department name:"
        },
    ])
        .then(res => {
            let departmentName = res.department_name;
            let department = {
                name: departmentName
            }
            db.createDepartment(department)
                .then(console.log(`added ${departmentName} to database`))
                .then(whatToDo)
        })
}

const quit = () => {
    //terminate program
    process.exit()
}

