import { Routes, Route } from 'react-router-dom';
import Home from './components/home';
import Login from './components/login';

function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home />} exact />
        <Route path='/login' element={<Login />} exact />
      </Routes>
    </div>
  );
}

export default App;
