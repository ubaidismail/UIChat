import React, { useEffect, useState } from 'react'
import Header from '../header/header'
import styles from './users.module.css'
import { io } from "socket.io-client";


export default function Users() {
    const [inputValue, setInputValue] = useState('');
    const [userJoin , setUserJoin] = useState([]);
    const socket = io('http://localhost:4000', {
        transports: ['websocket']
    });
    let username = '';
    useEffect(() => {
        const name = prompt('Your Name to Join the Room?');
        if (name) {
            socket.emit('new-user-joined', name);
        }
    }, []); // Empty dependency array ensures this runs only once

    const newUser_joined = (name, message)=>{
        // var new_user_joined = document.querySelector('.messege-ped p');
        // new_user_joined.textContent = ; 
        setUserJoin(prevUserJoin => [...prevUserJoin, `${name}${message}`]);
          
    }

    useEffect(() => {
        var messages = document.getElementById('messages');
        
        socket.on('user-joined', (msg) => {
            
            newUser_joined(msg , ' Joined the chat');
        })

        socket.on('receive', (data) => {
            const item = document.createElement('li');
            item.textContent = `${data.name}:${data.message}`;
            messages.appendChild(item);
            item.classList.add(styles.right_sms);
            console.log(data);
        })

        socket.on("connect_error", (err) => {
            console.log(err.message);
            console.log(err.description);
            console.log(err.context);
        });

        return () => {
            socket.off('user-joined');  // Cleanup the socket event listener on component unmount
            socket.off('receive');  // Cleanup the socket event listener on component unmount
            socket.off('connect_error');
        };


    }, [socket])



    const handleSubmit = (e) => {
        e.preventDefault();
        // const form = document.getElementById('form');
        const input = document.getElementById('input');
        if (input.value) {
            socket.emit('send', input.value);
            // console.log(input.value);
            var messages = document.getElementById('messages');
            const item = document.createElement('li');
            item.textContent = `You: ${input.value}`;
            messages.appendChild(item);
            item.classList.add(styles.left);
            input.value = '';
        }
        socket.on("connect_error", (err) => {
            // the reason of the error, for example "xhr poll error"
            console.log(err.message);

            // some additional description, for example the status code of the initial HTTP response
            console.log(err.description);

            // some additional context, for example the XMLHttpRequest object
            console.log(err.context);
        });
    };
    return (
        <>
            <Header />
            <main className={styles.main_area}>
                <div className='container'>
                    <div>Start Chat</div>
                    <div className="messege-ped">
                        {
                            userJoin ?
                            userJoin.map((message, index) => (
                                <p key={index} className={styles.new_user_message}>{message}</p>
                              )) : ''
                        }
                        
                        <ul id="messages"></ul>
                    </div>
                    <form id={styles.form} onSubmit={handleSubmit}>
                        <input id="input" value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
                        <button type='submit'>Send</button>
                    </form>
                </div>

            </main>


        </>
    )
}
