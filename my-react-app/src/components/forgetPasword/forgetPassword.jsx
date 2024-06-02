import React, { useState } from 'react';
import image from '../../img/cloudtach-logo.png';
import axios from 'axios';
import styles from './forgetPassword.module.css'
import { useNavigate } from "react-router-dom";


export default function ForgetPassword() {

  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccessMsg] = useState('');

  const axiosInstance = axios.create({
    baseURL: 'http://localhost:4000', // Replace 'localhost' with your actual backend URL if necessary
  });
  let navigate = useNavigate();

const handleForgetPass = async (e) => {
  e.preventDefault();
  try {
    const response = await axiosInstance.post('forget-password', {email});
    if(response.data.success){
      setSuccessMsg('Email sent!');
    }else{
      setError(response.data.message);
    }
  } catch (error) {
    // setError(error.message);
  }

}

  return (
    <>
      <div className='row align-items-center'>
        <div className="col-md-6 offset-md-3">
          <div className={styles.first_sec}>
            <img src={image} alt="" />

          </div>         
           <h1 className='text-center'>Forget Password</h1>
          {
            success != '' ?
              <div className="alert alert-success alert-dismissible fade show" role="alert">
                {success}
                <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
              </div>
              : ''
          }
          {
            error != '' ?
              <div className="alert alert-danger alert-dismissible fade show" role="alert">
                {error}
                <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
              </div>
              : ''
          }

          <form onSubmit={handleForgetPass}>
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
              <input
                type="email"
                placeholder="Email"
                className='form-control mb-2'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
            </div>
            
            <button type="submit" className="btn btn-primary">Reset Password</button>
            <a href="/login" className='btn btn-secondary mx-2'>Login</a>
          </form>
        </div>
      </div>
    </>
  )
}
