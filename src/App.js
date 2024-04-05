import './App.css';
import Register from './components/register/Register';
import LogInForm from './components/login/LogIn';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Register />}></Route>
        <Route path='login' element={<LogInForm />}></Route>
      </Routes>
    </>
  );
}

export default App;
