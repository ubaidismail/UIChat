import React, { useContext, useEffect, useState } from 'react'
import Header from '../header/sidebar';
import styles from './users.module.css'
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import AxiosContext from '../../context/axioContext/axiosContext';



export default function AddUser({ setAddUser, handleClose }) {
    const [name, setName] = useState('');
    const [userName, setUserName] = useState('');
    const [role, setRole] = useState('employee');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [users, setUsers] = useState([]);

    const axiosRequest = useContext(AxiosContext);


    const generatePassword = () => {
        var length = 8,
            charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
            retVal = "";
        for (var i = 0, n = charset.length; i < length; ++i) {
            retVal += charset.charAt(Math.floor(Math.random() * n));
        }
        // return retVal;
        setPassword(retVal);
    }

    // const delete_user = async (user_id) => {

    //     try {
    //         const response = await axiosInstance.post('/delete-user', { user_id });
    //         if (response.data.success) {
    //             alert('User deleteed');
    //             fetchUsers();
    //         } else {
    //             alert('User not deleted');
    //         }
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }



    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const response = await axiosRequest({
                method: 'post',
                url: '/register',
                data: { name: name, username: userName, email: email, user_role: role, password: password },
            });

            if (response.success) {
                alert('User Added');
            } else {
                console.log(response);
                alert('Error: ' + response.message);
            }
        } catch (error) {
            console.error('There was an error registering the user:', error);
            setError('There was an error registering the user: ' + error.message);
        }
    };

    const dialogClose = () => {
        handleClose();
    }


    return (
        <>
            <div className="row">

                <div className="col-8">
                    <div className="container">
                        <div data-dialog-backdrop="dialog" data-dialog-backdrop-close="true" class="absolute left-0 top-0 inset-0 z-[999] grid h-screen w-screen place-items-center bg-blur bg-opacity-60 backdrop-blur-sm transition-opacity duration-300">
                            <div data-dialog="dialog"
                                class="relative mx-auto flex w-full max-w-[24rem] flex-col rounded-xl bg-white bg-clip-border text-slate-700 shadow-md">
                                <form onSubmit={handleRegister}>
                                    <div class="flex flex-col p-6">
                                        <h4
                                            class="text-2xl mb-1 font-semibold text-slate-700">
                                            Add User Details
                                        </h4>
                                        <p class="mb-3 mt-1 text-slate-400">
                                            Add User To The DataBase
                                        </p>

                                        <div class="w-full max-w-sm min-w-[200px] mt-4">
                                            <label class="block mb-1 text-sm text-slate-700">
                                                Name
                                            </label>
                                            <input
                                                type="text"
                                                class="w-full h-10 bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-400 shadow-sm focus:shadow-md"
                                                placeholder="Enter Name"
                                                value={name}
                                                onChange={(e) => setName(e.target.value)}
                                            />

                                        </div>
                                        <div class="w-full max-w-sm min-w-[200px] mt-4">
                                            <label class="block mb-1 text-sm text-slate-700">
                                                User Name
                                            </label>
                                            <input
                                                type="text"
                                                class="w-full h-10 bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-400 shadow-sm focus:shadow-md"
                                                placeholder="Enter Username"
                                                value={userName}
                                                onChange={(e) => setUserName(e.target.value)}
                                            />

                                        </div>
                                        <div class="w-full max-w-sm min-w-[200px] mt-4">
                                            <label class="block mb-1 text-sm text-slate-700">
                                                User Email
                                            </label>
                                            <input
                                                type="text"
                                                class="w-full h-10 bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-400 shadow-sm focus:shadow-md"
                                                placeholder="Enter the email"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                            />

                                        </div>
                                        <div class="w-full max-w-sm min-w-[200px] mt-4">
                                            <label class="block mb-1 text-sm text-slate-700">
                                                Role
                                            </label>
                                            <select name=""
                                                id=""
                                                class="w-full h-10 bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-400 shadow-sm focus:shadow-md"
                                                value={role}
                                                onChange={(e) => setRole(e.target.value)}
                                            >
                                                <option value="0">Select Role</option>
                                                <option value="admin">Admin</option>
                                                <option value="admin">Employee</option>
                                            </select>
                                        </div>
                                        <div class="w-full max-w-sm min-w-[200px] mt-4">
                                            <label class="block mb-1 text-sm text-slate-700">
                                                Password
                                            </label>
                                            {/* <input
                                                type="text"
                                                class="w-full h-10 bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-400 shadow-sm focus:shadow-md"
                                                placeholder="Enter the Role"
                                                value={password}
                                                onChange={(e)=>setPassword(e.target.value)}
                                                 /> */}
                                            <div className=" w-full max-w-[24rem]">
                                                <input
                                                    type="password"
                                                    label="Password"
                                                    name='password'
                                                    value={password}
                                                    onChange={(e) => setPassword(e.target.value)}

                                                    class="w-full h-10 bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-400 shadow-sm focus:shadow-md"
                                                    containerProps={{
                                                        className: "min-w-0",
                                                    }}
                                                    autocomplete="new-password" 
                                                />
                                                <button
                                                    className='text-align-right'
                                                    onClick={generatePassword}
                                                >
                                                    Generate
                                                </button>
                                            </div>

                                        </div>

                                    </div>
                                    <div class="p-6 pt-0">
                                        <div class="flex space-x-2">
                                            <button
                                                onClick={dialogClose}
                                                class="w-full mx-auto select-none rounded border border-red-600 py-2 px-4 text-center text-sm font-semibold text-red-600 transition-all hover:bg-red-600 hover:text-white hover:shadow-md hover:shadow-red-600/20 active:bg-red-700 active:text-white active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                                                type="button"
                                                data-dialog-close="true">
                                                Cancel
                                            </button>

                                            <button
                                                class="w-full mx-auto select-none rounded bg-black py-2 px-4 text-center text-sm font-semibold text-white shadow-md shadow-slate-900/10 transition-all hover:shadow-lg hover:shadow-slate-900/20 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                                                type="submit"
                                                data-dialog-close="true">
                                                Save
                                            </button>
                                        </div>

                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>


                </div>
            </div>


        </>

    )
}

