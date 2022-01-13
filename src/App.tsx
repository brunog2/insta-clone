import { Route, BrowserRouter, Routes } from 'react-router-dom';

import './styles/global.scss';

import Login from './pages/Login/login';
import Register from './pages/Register/register';
import Feed from './pages/Feed/feed';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Feed />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
