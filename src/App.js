import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from './components/pages/loginPage';
import MainPage from './components/pages/MainPage';
import RegisterPage from './components/pages/registerPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<MainPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="registration" element={<RegisterPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
