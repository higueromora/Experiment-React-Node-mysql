import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { LoginForm } from './components/LoginForm';
import { RegisterForm } from './components/RegisterForm';
import './App.css';
import ManagerTeam from './components/ManagerTeam';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/managerteam" element={<ManagerTeam />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
