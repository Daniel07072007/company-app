import { Link } from 'react-router-dom';

export function Options() {
    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Opciones del Sistema</h1>
            <div className="grid gap-4">
                <Link 
                    to="/add-employee"
                    className="p-4 bg-white shadow-lg rounded-lg hover:bg-gray-50 transition-colors"
                >
                    <h2 className="text-xl font-semibold text-blue-600">Agregar Empleado</h2>
                    <p className="text-gray-600">Registrar un nuevo empleado en el sistema</p>
                </Link>

                <Link 
                    to="/top-salaries"
                    className="p-4 bg-white shadow-lg rounded-lg hover:bg-gray-50 transition-colors"
                >
                    <h2 className="text-xl font-semibold text-blue-600">Salarios más Altos</h2>
                    <p className="text-gray-600">Ver lista de salarios más altos por departamento</p>
                </Link>

                <Link 
                    to="/update-salary"
                    className="p-4 bg-white shadow-lg rounded-lg hover:bg-gray-50 transition-colors"
                >
                    <h2 className="text-xl font-semibold text-blue-600">Actualizar Salario</h2>
                    <p className="text-gray-600">Modificar el salario de un empleado existente</p>
                </Link>
            </div>
        </div>
    );
}