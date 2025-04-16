import React, { useState, useEffect } from "react";
import EmployeeService from "../services/Employee";

export function TopSalariesList() {
  const [topEmployees, setTopEmployees] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const fetchTopEmployees = async () => {
      try {
        const response = await EmployeeService.getTopEmployeesByDepartment();
        if (isMounted) {
          setTopEmployees(response.data);
        }
      } catch (error) {
        if (isMounted) {
          const errorMessage = error.response?.data?.message || 
                             "Error al obtener los salarios más altos por departamento.";
          setError(errorMessage);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchTopEmployees();

    return () => {
      isMounted = false;
    };
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded">
        {error}
      </div>
    );
  }

  if (topEmployees.length === 0) {
    return (
      <div className="p-4 bg-yellow-100 border border-yellow-400 text-yellow-700 rounded">
        No se encontraron empleados.
      </div>
    );
  }

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Salarios más altos por departamento</h2>
      <table className="min-w-full bg-white border">
        <thead>
          <tr>
            <th className="py-2 px-4 bg-gray-200 font-bold uppercase text-sm text-gray-700 border">
              ID Empleado
            </th>
            <th className="py-2 px-4 bg-gray-200 font-bold uppercase text-sm text-gray-700 border">
              Nombre
            </th>
            <th className="py-2 px-4 bg-gray-200 font-bold uppercase text-sm text-gray-700 border">
              Departamento
            </th>
            <th className="py-2 px-4 bg-gray-200 font-bold uppercase text-sm text-gray-700 border">
              Salario
            </th>
          </tr>
        </thead>
        <tbody>
          {topEmployees.map((employee) => (
            <tr key={employee.employee_id} className="hover:bg-gray-50">
              <td className="border px-4 py-2">{employee.employee_id}</td>
              <td className="border px-4 py-2">{employee.employee_name}</td>
              <td className="border px-4 py-2">{employee.department_name}</td>
              <td className="border px-4 py-2">{employee.salary}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
