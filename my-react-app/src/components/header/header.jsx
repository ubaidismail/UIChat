import React from 'react'
import styles from './header.module.css'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AiFillDashboard, AiFillWechat, AiOutlineUserSwitch, AiOutlineLogout } from "react-icons/ai";
import { BsEye, BsEyeSlash, BsDatabaseSlash, BsCheckCircleFill } from "react-icons/bs";


export default function Header() {
    let nagigate = useNavigate();
    const axiosInstance = axios.create({
        baseURL: 'http://localhost:4000', // Corrected the property name to baseURL
    });
    const handleLogout = async () => {
        try {
            const response = await axiosInstance.post('/logout',)
            if (response.data.success) {
                localStorage.removeItem('token');
                nagigate('/login');
            } else {
                console.log(response);
            }
        } catch (error) {
            console.log(error);

        }
    }
    return (
        <>
            <div className={`pt-3 ${styles.side_nav}`}>
                <div className="container-fluid">
                    <div className={`mb-4 ${styles.logo}`}>
                        <a href="/"><BsDatabaseSlash /></a>
                    </div>
                    <nav>
                        <ul>
                            <li><a href="/"><AiFillDashboard /> Dashboard</a></li>
                            <li><a href="/users"><AiFillWechat /> Start Chat</a></li>
                            <li><a href="/add-user"><AiOutlineUserSwitch /> User</a></li>
                            <li><a href="javascript:void(0)" onClick={handleLogout}> <AiOutlineLogout /> Logout</a></li>
                        </ul>
                    </nav>
                </div>
            </div>
        </>
    )
}
