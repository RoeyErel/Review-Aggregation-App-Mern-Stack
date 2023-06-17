import React, { useState } from 'react'
import {useNavigate} from 'react-router-dom'
const img1 = 'https://images.unsplash.com/photo-1616530940355-351fabd9524b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80';

const Signup = () => {
    
    const [user, setUser] = useState("")
    const [email, setEmail] = useState("")
    const [Password, setPassword] = useState("")
    const [error, setError] = useState('')
    const navigate = useNavigate()

    /**
    * @desc Post data to backend for register
    * @Post Email, username and password
    * @return Json with id, name and email
    */
    const register = async (e) => {
        e.preventDefault()
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({                 
                username: user,
                email: email,
                password: Password
            })
        };
        try{        
            fetch(process.env.REACT_APP_API_BASE + "/api/users/Signup", requestOptions)
            .then(response => {
                if(response.status===400){
                    setError('User already exists')
                }else{
                    navigate('/login')
                }
            })
        }catch(error){
            console.log(error)
        }
    }
        
    return (
    <div>
        <div className='w-full h-screen'>
            <img className='hidden sm:block absolute w-full h-full object-cover' src={img1} alt=''/>
            <div className=' bg-black/70 fixed top-0 left-0 w-full h-screen'></div>
            <div className='fixed w-full px-4 py-24 z-50'>
                <div className='max-w-[450px] h-[600px] mx-auto bg-black/75 text-white'>
                    <div className='max-w-[320px] mx-auto py-16'>
                        <div className='flex justify-center items-center'>
                            <h1 className='text-4xl font-bold'>Join Us</h1>
                        </div>
                        {error ? <p className='p-3 bg-red-400 my-2' >{error}</p>:null}
                        <form  className='w-full flex flex-col py-4' onSubmit={register} method='post'>
                            <input  onChange={(e) => setUser(e.target.value)} className='p-3 my-2 bg-gray-700 rounded' type="text" placeholder='Username'/>
                            <input onChange={ (e) => setEmail(e.target.value) } className='p-3 my-2 bg-gray-700 rounded' type="email" placeholder='Email' autoComplete=''/>
                            <input  onChange={(e) => setPassword(e.target.value)} className='p-3 my-2 bg-gray-700 rounded' type="password" placeholder='Password' autoComplete='current-password' />
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