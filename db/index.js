const connection = require('./connection.js')

class DATABASE {
    constructor(connection) {
        this.connection = connection
    };

    viewEmployees() {
        return this.connection.promise().query('SELECT employees.id, roles.title, CONCAT_WS(" ",first_name, last_name) AS "full_name" FROM employees LEFT JOIN roles ON role_id=roles.id')
    }
    viewRoles() {
        return this.connection.promise().query('SELECT * FROM roles')
    }
    viewDepartments() {
        return this.connection.promise().query('SELECT * FROM departments')
    }
    createEmployee(employee) {
        return this.connection.promise().query("INSERT INTO employees SET ?", employee)
    }
    changeEmployeeRole(roleId, employeeId) {
        console.log(roleId, employeeId)
        return this.connection.promise().query('UPDATE employees SET role_id = ? WHERE id = ?', [roleId, employeeId])
    }
    createRole(role) {
        return this.connection.promise().query("INSERT INTO roles SET ?", role)
    }
    createDepartment(department) {
        return this.connection.promise().query("INSERT INTO departments SET ?", department)
    }
}

module.exports = new DATABASE(connection);