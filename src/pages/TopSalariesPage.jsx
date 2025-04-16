import { TopSalariesList } from "../components/TopSalariesList";

export function TopSalariesPage() {
    return (
        <div className="container mx-auto">
            <h1 className="text-2xl font-bold mb-4">Empleados con Mayor Salario</h1>
            <TopSalariesList />
        </div>
    );
}