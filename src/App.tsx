import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import './styles/global.scss';
import Header from './components/Header';

import Login from './pages/Login/login';
import Register from './pages/Register/register';
import Feed from './pages/Feed/feed';
import Direct from './pages/Direct/';
import Explore from './pages/Explore';
import Profile from './pages/Profile';

function App() {
  return (
    <Router>
      <Routes>
        
        <Route path="/" element={<Feed />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/direct" element={<Direct />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Router>
  );
}

export default App;
