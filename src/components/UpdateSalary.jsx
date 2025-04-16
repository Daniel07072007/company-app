import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import EmployeeService from "../services/Employee";

export function UpdateSalary() {
  const navigate = useNavigate();
  const [employeeId, setEmployeeId] = useState("");
  const [newSalary, setNewSalary] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // Limpiar mensajes después de 3 segundos
    if (success || error) {
      const timer = setTimeout(() => {
        setSuccess(false);
        setError("");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [success, error]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Validaciones mejoradas
      if (!employeeId.trim()) {
        throw new Error("El ID del empleado es requerido");
      }

      const salary = parseFloat(newSalary);
      if (isNaN(salary) || salary <= 0) {
        throw new Error("Por favor ingrese un salario válido mayor a 0");
      }

      // Llamada al servicio
      await EmployeeService.updateSalary(parseInt(employeeId), salary);
      setSuccess(true);
      setEmployeeId("");
      setNewSalary("");
      
      // Redireccionar después de 2 segundos
      setTimeout(() => {
        navigate("/");
      }, 2000);

    } catch (err) {
      const errorMsg = err.response?.data?.message || err.message || "Ocurrió un error al actualizar el salario.";
      setError(errorMsg);
      setSuccess(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        {success && (
          <div className="mb-4 rounded-md bg-green-50 p-4">
            <p className="text-sm font-medium text-green-800">
              Salario actualizado con éxito
            </p>
          </div>
        )}
        {error && (
          <div className="mb-4 rounded-md bg-red-50 p-4">
            <p className="text-sm text-red-700">{error}</p>
          </div>
        )}

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="px-6 py-4 bg-indigo-600">
            <h2 className="text-2xl font-bold text-white text-center">
              Actualizar Salario
            </h2>
          </div>
          
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            <div>
              <label htmlFor="employeeId" className="block text-sm font-medium text-gray-700">
                ID de Empleado
                <span className="text-red-500 ml-1">*</span>
              </label>
              <input
                id="employeeId"
                type="number"
                name="employeeId"
                value={employeeId}
                onChange={(e) => setEmployeeId(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                required
              />
              <p className="mt-1 text-sm text-gray-500">
                Ingrese el ID del empleado al que se le actualizará el salario
              </p>
            </div>

            <div>
              <label htmlFor="newSalary" className="block text-sm font-medium text-gray-700">
                Nuevo Salario
                <span className="text-red-500 ml-1">*</span>
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-500 sm:text-sm">$</span>
                </div>
                <input
                  id="newSalary"
                  type="number"
                  name="newSalary"
                  value={newSalary}
                  onChange={(e) => setNewSalary(e.target.value)}
                  className="pl-7 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  min="0"
                  required
                />
              </div>
              <p className="mt-1 text-sm text-gray-500">
                Ingrese el nuevo salario
              </p>
            </div>

            <div className="flex items-center justify-between pt-4">
              <button
                type="button"
                onClick={() => navigate("/")}
                className="text-sm font-medium text-gray-600 hover:text-gray-500"
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className={`inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white 
                  ${isSubmitting ? 'bg-indigo-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700'} 
                  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors`}
              >
                {isSubmitting ? 'Actualizando...' : 'Actualizar'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
