import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import './styles/global.scss';

import Login from './pages/Login/login';
import Register from './pages/Register/register';
import Feed from './pages/Feed/feed';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Feed />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;
