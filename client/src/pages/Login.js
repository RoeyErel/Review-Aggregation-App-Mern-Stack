import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { toastMessage } from '../utils';
import { FORM_BG } from '../links';

const Login = () => {
    const [form, setForm] = useState({ email: "", password: "" });
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleInput = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const LoginForm = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${process.env.REACT_APP_API_BASE}/api/users/login`, form);
            if (response.status !== 400) {
                
                const res = await axios.get(`${process.env.REACT_APP_API_BASE}/api/users/me`, {
                    withCredentials: true,
                });
                // import savedShows from DB
                const savedShows = JSON.stringify(response.data.savedShows);
                
                // turn username to a name with a capital letter
                const firstLetter = res.data.username.charAt(0).toUpperCase();
                const str = res.data.username.slice(1);

                // set local storage
                localStorage.setItem('username', firstLetter + str);
                localStorage.setItem('ID', res.data.id);
                localStorage.setItem('savedShows', savedShows);

                navigate('/');
            }
        } catch (error) {
            if (error.response) {
                console.log(error);
                
                setError('Invalid credentials');
                toastMessage("error", "top-center", "Invalid credentials");
            } else {
                console.error("Login error", error);
            }
        }
    };

    return (
        <div className='w-full h-screen'>
            <img className='block absolute w-full h-full object-cover' src={FORM_BG} alt='bg' />
            <div className='bg-black/60 fixed top-0 left-0 w-full h-screen'></div>
            <div className='fixed w-full px-4 py-24 z-50'>
                <div className='max-w-[450px] h-[500px] mx-auto bg-black/75 text-white'>
                    <div className='max-w-[320px] mx-auto py-16'>
                        <div className='flex justify-center items-center'>
                            <h1 className='text-3xl font-bold'>LOGIN</h1>
                        </div>
                        <div className='py-2'>
                            {error && <ToastContainer position="top-center" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="dark" />}
                        </div>
                        <form onSubmit={LoginForm} className='w-full flex flex-col pb-4'>
                            <input
                                onChange={handleInput}
                                className='p-3 my-2 bg-gray-700 rounded'
                                type="email"
                                placeholder='Email'
                                name='email'
                                id='email-field'
                            />
                            <input
                                onChange={handleInput}
                                className='p-3 my-2 bg-gray-700 rounded'
                                type="password"
                                placeholder='Password'
                                name='password'
                            />
                            <button className='bg-green-600 py-3 my-6 rounded font-bold'>Sign In</button>
                            <div className='flex justify-between items-center text-sm text-gray-600'>
                                <div>
                                    <input className='mr-2' type="checkbox" /> <span>Remember Me</span>
                                </div>
                                <p>Need Help?</p>
                            </div>
                            <div className='py-8 flex flex-row'>
                                <span className='text-gray-600 flex flex-row'>New to Stream.<p className='text-green-600'>io </p> &nbsp;&nbsp;</span>{' '} <Link to='/Signup'>Sign Up</Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
