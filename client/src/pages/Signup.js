import React, { useState } from 'react'
import {useNavigate} from 'react-router-dom'
import {FORM_BG} from '../links';
import { ToastContainer } from 'react-toastify';
import { toastMessage } from '../utils';

const Signup = () => {
    const [form, setForm] = useState({user:"", email:"", password:""})
    const [error, setError] = useState('')
    const navigate = useNavigate()

    const handleInput = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const register = async (e) => {
        e.preventDefault()
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                username: form.user,
                email: form.email,
                password: form.password
            }),
        };
        try{        
            fetch(process.env.REACT_APP_API_BASE + "/api/users/Signup", requestOptions)
                .then(response => response.json().then(data => {
                        if(data.error != null){
                            toastMessage("error", "top-center", "Invaild credentails")
                            setError(data.error)
                        }else{
                            navigate('/login')
                        }
                }))
        }catch(error){
            console.log(error)
        }
    }
        
    return (
        <div>
            <div className='w-full h-screen'>
                <img className='block absolute w-full h-full object-cover' src={FORM_BG} alt=''/>
                <div className=' bg-black/70 fixed top-0 left-0 w-full h-screen'></div>
                <div className='fixed w-full px-4 py-24 z-50'>
                    <div className='max-w-[450px] h-[600px] mx-auto bg-black/75 text-white'>
                        <div className='max-w-[320px] mx-auto py-16'>
                            <div className='flex justify-center items-center'>
                                <h1 className='text-4xl font-bold'>Join Us</h1>
                            </div>
                            <div className='py-2'>
                                {error ? <ToastContainer position="top-center" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="dark"/>:null}
                            </div>
                            <form  className='w-full flex flex-col py-4' onSubmit={register} method='post'>
                                <input onChange={handleInput} name='user' className='p-3 my-2 bg-gray-700 rounded' type="text" placeholder='Username'/>
                                <input onChange={handleInput} name='email' className='p-3 my-2 bg-gray-700 rounded' type="email" placeholder='Email' autoComplete=''/>
                                <input onChange={handleInput} name='password' className='p-3 my-2 bg-gray-700 rounded' type="password" placeholder='Password' autoComplete='current-password' />
                                <button className='bg-gradient-to-r from-green-600 via-[#41A316] to-green-600 py-3 my-6 rounded font-bold'>Sign Up</button>
                                <div className='flex justify-between items-center text-sm text-gray-200'>
                                    <p><input className='mr-2' type="checkbox"/> Remember Me</p>
                                    <p>Need Help?</p>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Signup