import React, { useEffect, useState } from 'react';
import image from '../../img/cloudtach-logo.png';
import axios from 'axios';
import styles from './login.module.css'
import { useNavigate } from "react-router-dom";
import { BsEye, BsEyeSlash, BsDatabaseSlash, BsCheckCircleFill } from "react-icons/bs";

export default function Login() {

  const [email, setEmail] = useState('');
  const [passwordShowHide, setPasswordShowHide] = useState(true);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccessMsg] = useState('');
  const [auth, setAuth] = useState(localStorage.getItem('token') || '');

  const handleClickPassword = () => {
    setPasswordShowHide(!passwordShowHide);
  }

  const axiosInstance = axios.create({
    baseURL: 'http://localhost:4000', // Replace 'localhost' with your actual backend URL if necessary
  });
  let navigate = useNavigate();

  useEffect(() => {
    if (auth != '') {
      navigate('/');
    }

  },)


  const hanfleLogin = async (e) => {
    e.preventDefault();
    if(email == ''){
      setError('Email field is required');
      return;

    }
    if(password == ''){
      setError('Password field is required');
      return;
    }
    try {
      const response = await axiosInstance.post('/login', { email, password });

      if (response.data.success) {
        localStorage.setItem('token', response.data.authToken);
        setSuccessMsg('Login Success');
        setTimeout(() => {
          navigate('/');
        }, 2000);
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
            <h1 className='text-left text-white'>Login</h1>
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

            <form onSubmit={hanfleLogin} className={styles.form_styles}>
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
              <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                <div className="d-flex justify-center align-items-center">
                  <input type={passwordShowHide ? 'password' : 'text'}
                    placeholder='Password'
                    className='form-control'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)} />
                  <div className={styles.eye_margin_minus}>
                    {
                      passwordShowHide ? <BsEye onClick={handleClickPassword} /> : <BsEyeSlash onClick={handleClickPassword} />
                    }
                  </div>
                </div>
              </div>
              <div className="forget-pass mb-3">
                <a href="/forget-password" className='text-white'>Forget Password</a>
              </div>
              <button type="submit" className={`btn d-block w-100 mb-3 ${styles.btn_custom_color}`}>Login</button>
              <a href="/register" className='btn btn-secondary d-block w-100'>Sign Up</a>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}
