import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './pages/MainPage';
import RegisterPage from './pages/registerPage';
import LoginPage from './pages/loginPage';
import AccountTeacher from './pages/accountTeacher';
import AccountStudent from './pages/accountStudent';
import StudentsPage from './pages/studentsPage';
import StudentTasksPage from './pages/studentTasksPage';
import TasksBasePage from './pages/TasksBasePage';
import VariantConstructor from './pages/variantConstructor';
import VariantsBasePage from './pages/VariantsBasePage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<MainPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="registration" element={<RegisterPage />} />
        <Route path="accountTeacher" element={<AccountTeacher />} />
        <Route path="accountStudent" element={<AccountStudent />} />
        <Route path="myStudents" element={<StudentsPage />} />
        <Route path="myTasks" element={<StudentTasksPage/>} />
        <Route path="tasksBase" element={<TasksBasePage/>} />
        <Route path="variantsBase" element={<VariantsBasePage/>} />
        <Route path="variantConstructor" element={<VariantConstructor/>} />
        <Route path="taskConstructor" element={<StudentTasksPage/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
