import React, { useContext, useEffect, useState } from 'react';
import NoteContext from '../../context/notes/noteContext';
import Header from '../header/header';
import styles from './dashboard.module.css'
import { useNavigate, useNavigation } from 'react-router-dom';


export default function Dashboard() {
  const navigate = useNavigate();
  const a = useContext(NoteContext);
  const [auth, setAuth] = useState(localStorage.getItem('token') || '');

useEffect(() => {
  console.log(auth);
  if(auth === ''){
    navigate('/login');
  }

})


  return (
    <>
    <Header />
      <main className={styles.main_area}>
      <div className='container'>
        The Portal Build By {a.name} Whoose age is {a.age}
      </div>
      </main>
     
    </>
  )
}
