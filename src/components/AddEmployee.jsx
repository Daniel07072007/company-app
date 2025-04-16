import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import EmployeeService from "../services/Employee";
import DepartmentService from "../services/Department";

export function AddEmployee() {
    const navigate = useNavigate();
    const [departments, setDepartments] = useState([]);
    const [success, setSuccess] = useState(false);
    const [employee, setEmployee] = useState({
        employeeName: "",
        salary: "",
        departmentId: "",
    });
    const [errors, setErrors] = useState({});

    useEffect(() => {
        const loadDepartments = async () => {
            try {
                const response = await DepartmentService.getAllDepartments();
                setDepartments(response.data);
            } catch (error) {
                console.error("Error loading departments:", error);
            }
        };
        loadDepartments();
    }, []);

    const handleChange = (e) => {
        const value = e.target.value;
        setEmployee({ ...employee, [e.target.name]: value });
    };

    const validateForm = () => {
        const newErrors = {};
        if (employee.employeeName.length < 2) {
            newErrors.employeeName = "Name must be at least 2 characters long";
        }
        if (employee.salary <= 0) {
            newErrors.salary = "Salary must be greater than 0";
        }
        if (!employee.departmentId) {
            newErrors.departmentId = "Department is required";
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;
        
        try {
            const employeeData = {
                name: employee.employeeName.trim(),
                salary: parseFloat(employee.salary),
                departmentId: parseInt(employee.departmentId)
            };
            await EmployeeService.addEmployee(employeeData);
            setSuccess(true);
            setTimeout(() => {
                navigate("/");
            }, 2000);
        } catch (error) {
            console.error("Error adding employee:", error);
            setErrors({ submit: "Failed to add employee. Please try again." });
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md mx-auto">
                {success && (
                    <div className="mb-4 rounded-md bg-green-50 p-4">
                        <p className="text-sm font-medium text-green-800">
                            Employee created successfully! Redirecting...
                        </p>
                    </div>
                )}
                <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                    <div className="px-6 py-4 bg-indigo-600">
                        <h2 className="text-2xl font-bold text-white text-center">
                            Add New Employee
                        </h2>
                    </div>
                    
                    <form onSubmit={handleSubmit} className="p-6 space-y-6">
                        <div>
                            <label htmlFor="employeeName" className="block text-sm font-medium text-gray-700">
                                Full Name
                                <span className="text-red-500 ml-1">*</span>
                            </label>
                            <input
                                id="employeeName"
                                type="text"
                                name="employeeName"
                                value={employee.employeeName}
                                onChange={handleChange}
                                className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 ${
                                    errors.employeeName ? 'border-red-500' : ''
                                }`}
                                required
                                aria-describedby="name-description"
                            />
                            {errors.employeeName && (
                                <p className="mt-1 text-sm text-red-600" id="name-error">
                                    {errors.employeeName}
                                </p>
                            )}
                            <p id="name-description" className="mt-1 text-sm text-gray-500">
                                Enter employee's full name
                            </p>
                        </div>

                        <div>
                            <label htmlFor="salary" className="block text-sm font-medium text-gray-700">
                                Annual Salary
                                <span className="text-red-500 ml-1">*</span>
                            </label>
                            <div className="mt-1 relative rounded-md shadow-sm">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <span className="text-gray-500 sm:text-sm">$</span>
                                </div>
                                <input
                                    id="salary"
                                    type="number"
                                    name="salary"
                                    value={employee.salary}
                                    onChange={handleChange}
                                    className="pl-7 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                    min="0"
                                    required
                                />
                            </div>
                            {errors.salary && (
                                <p className="mt-1 text-sm text-red-600">{errors.salary}</p>
                            )}
                        </div>

                        <div>
                            <label htmlFor="departmentId" className="block text-sm font-medium text-gray-700">
                                Department
                                <span className="text-red-500 ml-1">*</span>
                            </label>
                            <select
                                id="departmentId"
                                name="departmentId"
                                value={employee.departmentId}
                                onChange={handleChange}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                required
                            >
                                <option value="">Select a department</option>
                                {departments.map((dept) => (
                                    <option key={dept.departmentId} value={dept.departmentId}>
                                        {dept.departmentName}
                                    </option>
                                ))}
                            </select>
                            {errors.departmentId && (
                                <p className="mt-1 text-sm text-red-600">{errors.departmentId}</p>
                            )}
                        </div>

                        {errors.submit && (
                            <div className="rounded-md bg-red-50 p-4">
                                <p className="text-sm text-red-700">{errors.submit}</p>
                            </div>
                        )}

                        <div className="flex items-center justify-between pt-4">
                            <button
                                type="button"
                                onClick={() => navigate("/")}
                                className="text-sm font-medium text-gray-600 hover:text-gray-500"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
                            >
                                Save Employee
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}