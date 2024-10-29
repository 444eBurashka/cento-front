import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './pages/MainPage';
import RegisterPage from './pages/registerPage';
import LoginPage from './pages/loginPage';
import AccountTeacher from './pages/accountTeacher';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<MainPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="registration" element={<RegisterPage />} />
        <Route path="accountTeacher" element={<AccountTeacher />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
