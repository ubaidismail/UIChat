import logo from './logo.svg';
import './App.css';
import Home from './components/Home/home';
import Login from './components/Login/login';
import Register from './components/register/register';
import ForgetPassword from './components/forgetPasword/forgetPassword';
import Dashboard from './components/dashboard/dashboard';
import { Route, Routes } from 'react-router-dom';
import NoteState from './context/notes/noteState';
import Users from './components/users/users';
import AddUser from './components/users/addUser';
import Attendance from './components/attendance/attendance';
import AxiosProvider from './context/axioContext/axiosState';

// import { socket } from './socket';


function App() {
  return (
    <>
      <AxiosProvider>
      <NoteState>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/forget-password' element={<ForgetPassword />} />
          <Route path='/add-user' element={<AddUser />} />
          <Route path='/attendance' element={<Attendance />} />
          <Route path='/users' element={<Users />} />

        </Routes>
      </NoteState>
      </AxiosProvider>

    </>
  );
}

export default App;
