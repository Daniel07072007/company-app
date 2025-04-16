//Conexion con el backend del propyecto
import api from "../config/api";

const getAllEmployees = async () => api.get('/employees/all');
const addEmployee = async ({ name, salary, departmentId }) => 
    api.post('/employees/add', { employeeName: name, salary, departmentId });
const getMaxSalaryByDepartment = async (department) => api.get(`/employees/max-salary/${department}`);
const updateSalary = async (employeeId, salary) => api.put(`/employees/update-salary/${employeeId}`, { salary });
const getTopEmployeesByDepartment = async () => api.get('/employees/top-by-department');

const EmployeeService = {
    getAllEmployees,
    addEmployee,
    getMaxSalaryByDepartment,
    updateSalary,
    getTopEmployeesByDepartment,
};
export default EmployeeService;