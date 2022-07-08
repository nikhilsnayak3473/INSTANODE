import { Routes, Route } from 'react-router-dom';
import Landing from './pages/landing';

function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Landing />} exact />
      </Routes>
    </div>
  );
}

export default App;
