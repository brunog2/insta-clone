import { Route, BrowserRouter, Routes } from 'react-router-dom';

import './styles/global.scss';

import Login from './pages/Login/login';
import Register from './pages/Register/register';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
