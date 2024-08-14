import React, { useState } from 'react';
import Header from '../header/sidebar';
import styles from './attendance.module.css';
import axios from 'axios';
import axiosInstance from '../../AxiosInstance';


export default function Attendance() {
    const token = localStorage.getItem('token');
    const [checkin, setCheckin] = useState('');

    const checkInUser = async () => {
        const today = new Date();
        const checkin_date = `${today.getMonth() + 1}-${today.getDate()}-${today.getFullYear()}`;
        const hours = today.getHours().toString().padStart(2, '0');
        const minutes = today.getMinutes().toString().padStart(2, '0');
        const seconds = today.getSeconds().toString().padStart(2, '0');
        const checkin_time = `${hours}:${minutes}:${seconds}`;

        const response  = await axiosInstance.post('/checkin', {checkin_date, checkin_time} );    
        if(response.status == 200){
            if(response.data.success){
                setCheckin('Checked In at'+checkin_date + ' :: ' + checkin_time);
            }   
        }
    };

    return (
        <>
            <Header />
            <main className={styles.main_area}>
                <div className="container">
                    {checkin == '' && 
                        <button className={styles.checkIn_btn} onClick={checkInUser}>Check In</button>
                    }
                    {checkin !== '' && <p>{checkin}</p>}
                </div>
            </main>
        </>
    );
}
