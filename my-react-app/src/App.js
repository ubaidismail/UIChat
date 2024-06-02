import logo from './logo.svg';
import './App.css';
import Login from './components/Login/login';
import Register from './components/register/register';
import ForgetPassword from './components/forgetPasword/forgetPassword';
import Dashboard from './components/dashboard/dashboard';
import { Route, Routes } from 'react-router-dom';
import NoteState from './context/notes/noteState';
import Users from './components/users/users';
import AddUser from './components/users/addUser';

// import { socket } from './socket';


function App() {
  return (
    <>
      <NoteState>
        <Routes>
          <Route path='/' element={<Dashboard />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/forget-password' element={<ForgetPassword />} />
          <Route path='/add-user' element={<AddUser />} />
          <Route path='/users' element={<Users />} />

        </Routes>
      </NoteState>

    </>
  );
}

export default App;
