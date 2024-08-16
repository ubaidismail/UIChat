import React from 'react'
import styles from './header.module.css'
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
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
                        <a to="/"><BsDatabaseSlash /></a>
                    </div>
                    <nav>
                        <ul className={styles.nav_links}>
                            <li><Link to="/dashboard"><AiFillDashboard /> Dashboard</Link></li>
                            <li><Link to="/users"><AiOutlineUserSwitch /> User</Link></li>
                            <li><Link to="javascript:void(0)" onClick={handleLogout}> <AiOutlineLogout /> Logout</Link></li>
                        </ul>
                    </nav>
                </div>
            </div>
        </>
    )
}
