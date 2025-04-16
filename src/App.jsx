import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Options } from './pages/Options';
import { TopSalariesPage } from './pages/TopSalariesPage';
import { TopSalariesList } from './components/TopSalariesList';
// ...en tus rutas:
<Route path="/top-salaries" element={<TopSalariesList />} />
import { UpdateSalaryPage } from './pages/UpdateSalaryPage';
import { AddEmployeePage } from './pages/AddEmployeePage';

function App() {
    return (

            <Routes>
                <Route path="/" element={<Options />} />
                <Route path="/add-employee" element={<AddEmployeePage />} />
                <Route path="/top-salaries" element={<TopSalariesPage />} />
                <Route path="/update-salary" element={<UpdateSalaryPage />} />
            </Routes>

    );
}

export default App;
