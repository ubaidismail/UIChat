import React, { useEffect, useState } from 'react'
import Header from '../header/header';
import styles from './users.module.css'
import axios from 'axios';
import { useNavigate } from "react-router-dom";


function AddUser() {
    const [name, setname] = useState('');
    const [username, setUsername] = useState('');
    const [user_role, setRole] = useState('employee');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [users, setUsers] = useState([]);
    // const [user_id, setUserId] = useState('');
    let navigate = useNavigate();
    const authToken = localStorage.getItem('token');
    const axiosInstance = axios.create({
        baseURL: 'http://localhost:4000', // Corrected the property name to baseURL
        headers: {
            'auth-token': authToken, // Include the token in the Authorization header
        },
    });



    useEffect(() => {
        fetchUsers();
        // checkAuth();
    }, [users])

    const fetchUsers = async () => {
        try {
            const response = await axiosInstance.post('/users',);

            if (response.data.success) {
                setUsers(response.data.user);
            } else {
                console.log(response);
                alert('Error: ' + response.data.message);
            }
        } catch (error) {
            console.error('There was an error getting the user:', error);
            // setError('There was an error getting the user: ' + error.message);
        }
    }
    // const checkAuth = async (authToken) => {
    //     try {
    //         const response = await axiosInstance.post('/check-user-auth', authToken);

    //         if (response.data.success) {

    //         } else {
    //             console.log(response);
    //             // alert('Error: ' + response.data.message);
    //             navigate('/');
    //         }
    //     } catch (error) {
    //         // navigate('/login');
    //         // localStorage.removeItem('token');
    //         console.error('There was an error getting the user:', error.message);
    //         // setError('There was an error getting the user: ' + error.message);
    //     }
    // }

    const delete_user = async (user_id) => {

        try {
            const response = await axiosInstance.post('/delete-user', {user_id});
            if(response.data.success){
                alert('User deleteed');
                fetchUsers();
            }else{
                alert('User not deleted');
            }
        } catch (error) {
         console.log(error);   
        }
    }

    


    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const response = await axiosInstance.post('/register', { name, username, email, user_role, password });

            if (response.data.success) {
                alert('User Added');
            } else {
                console.log(response.data);
                alert('Error: ' + response.data.message);
            }
        } catch (error) {
            console.error('There was an error registering the user:', error);
            setError('There was an error registering the user: ' + error.message);
        }
    };

    return (
        <>
            <div className="row">
                <div className="col-3">
                    <Header />
                </div>
                <div className="col-8">
                    <h1 className='text-center'>Add User</h1>
                    <div className="container">
                        <form onSubmit={handleRegister}>
                            <input
                                type="text"
                                className='form-control mb-2'
                                placeholder="First Name"
                                value={name}
                                onChange={(e) => setname(e.target.value)}
                            />
                            <input
                                type="text"
                                placeholder="User Name"
                                className='form-control mb-2'
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                            <input
                                type="email"
                                placeholder="email"
                                className='form-control mb-2'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <input
                                type="password"
                                placeholder="Password"
                                className='form-control mb-2'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <select
                                name="user_role"
                                id="user_role"
                                className="form-control mb-3" 
                                onChange={(e) => setRole(e.target.value)}
                                value={user_role}
                            >
                                <option value="employee">Employee</option>
                                <option value="admin">Admin</option>
                            </select>

                            <button type="submit" className='btn btn-primary'>Create</button>
                            {/* {error && <p>{error}</p>} */}
                        </form>
                    </div>
                    {error ? error: ''}
                    <h3 className='mt-2 text-center'>Users List</h3>
                    <table width="100%" className={styles.table}>
                        <tr>
                            <th>User Id#</th>
                            <th>User Name</th>
                            <th>User Role</th>
                            <th>Email</th>
                            <th>Action</th>
                        </tr>

                        <tbody>
                            {
                                users.map((user) =>        
                                    <tr>
                                        <td>{user._id}</td>
                                        <td>{user.name}</td>
                                        <td>{user.user_role.charAt(0).toUpperCase() + user.user_role.slice(1)}</td>
                                        <td>{user.email}</td>
                                        <td><button onClick={()=>delete_user(user._id)}>Delete</button> - <a href="#">Update</a></td>
                                    </tr>
                                )
                            }

                        </tbody>
                    </table>
                </div>
            </div>


        </>

    )
}

export default AddUser