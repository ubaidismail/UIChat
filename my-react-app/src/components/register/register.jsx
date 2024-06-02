import React, { useEffect, useState } from 'react';
import image from '../../img/cloudtach-logo.png';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import styles from './register.module.css'
import { BsEye, BsEyeSlash, BsDatabaseSlash, BsCheckCircleFill } from "react-icons/bs";

export default function Register() {
    const navigate = useNavigate();
    const [name, setname] = useState('');
    const [username, setUsername] = useState('');
    const [passwordShowHide, setPasswordShowHide] = useState(true);
    const [user_role, setRole] = useState('employee');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [success, setSuccessMsg] = useState('');
    const [error, setError] = useState('');

    const handleClickPassword = () => {
        setPasswordShowHide(!passwordShowHide);
    }

    const axiosInstance = axios.create({
        baseURL: 'http://localhost:4000', // Replace 'localhost' with your actual backend URL if necessary
    });

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const response = await axiosInstance.post('/register', { name, username, email, user_role, password });

            if (response.data.success) {
                localStorage.setItem('token', response.data.authToken);
                setSuccessMsg('User registered');
                navigate('/login');
            } else {
                console.log(response.data);
            }
        } catch (error) {
            setError(error);
        }
    };

    return (
        <>
            <div className={`row align-items-center ${styles.d_black}`}>
                <div className="col-md-3">
                    <div className={styles.list_service_offered}>
                        <div className="">
                            <div className={styles.logo_top}>
                                <BsDatabaseSlash />
                            </div>
                            <div className={styles.bottom_services}>

                                <h3 className='mb-2'>Services Offered</h3>
                                <ul className={styles.bottom_services_list}>
                                    <li><BsCheckCircleFill /> 24/7 Customer Support</li>
                                    <li><BsCheckCircleFill /> Custom Software Solution</li>
                                    <li><BsCheckCircleFill /> Engagement Insight</li>
                                    <li><BsCheckCircleFill /> Advance Tools</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-9 ">
                    <div className="col-md-6 offset-md-3">
                        <h1 className='text-left text-white'>Register</h1>
                        <p className='text-white'>Lorem ipsum dolor sit, amet consectetur.</p>
                        {
                            success != '' ?
                                <div className="alert alert-success alert-dismissible fade show" role="alert">
                                    {success}
                                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                                </div>
                                : ''
                        }
                        {
                            error != '' ?
                                <div className="alert alert-danger alert-dismissible fade show" role="alert">
                                    {error}
                                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                                </div>
                                : ''
                        }
                        <form onSubmit={handleRegister} className={styles.form_styles}>
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
                            <select name="user_role" id="user_role" className='form-control mb-2'
                                onChange={(e) => setRole(e.target.value)}
                                value={user_role}>
                                <option value="employee">Employee</option>

                            </select>
                            <div className="d-flex justify-center align-items-center">
                                <input
                                    type={passwordShowHide ? 'password' : 'text'}
                                    placeholder="Password"
                                    className='form-control mb-2'
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <div className={styles.eye_margin_minus}>
                                    {
                                        passwordShowHide ? <BsEye onClick={handleClickPassword} /> : <BsEyeSlash onClick={handleClickPassword} />
                                    }
                                </div>
                            </div>
                            <button type="submit" className={`btn d-block w-100 mb-3 ${styles.btn_custom_color}`}>Register</button>
                            <a href="/login" className='btn btn-secondary d-block w-100'>Login</a>
                            {/* {error && <p>{error}</p>} */}
                        </form>

                    </div>
                </div>
            </div>
        </>
    )
}
