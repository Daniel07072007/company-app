//Conexion con el backend del propyecto
import api from "../config/api";

const getAllDepartments = async () => api.get('/departments');
const getDepartmentById = async (id) => api.get(`/departments/${id}`);
const createDepartment = async (department) => api.post('/departments', department);
const updateDepartment = async (id, department) => api.put(`/departments/${id}`, department);
const deleteDepartment = async (id) => api.delete(`/departments/${id}`);

const DepartmentService = {
    getAllDepartments,
    getDepartmentById,
    createDepartment,
    updateDepartment,
    deleteDepartment,
};

export default DepartmentService;
