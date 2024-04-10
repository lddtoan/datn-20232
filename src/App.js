import Home from './components/home/Home';
import Register from './components/register/Register';
import LogInForm from './components/login/LogIn';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='register' element={<Register />}></Route>
        <Route path='login' element={<LogInForm />}></Route>
    </Routes>
  );
}

export default App;
