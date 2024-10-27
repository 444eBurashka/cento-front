import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from './components/pages/loginPage';
import MainPage from './components/pages/MainPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<MainPage />} />
        <Route path="login" element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
