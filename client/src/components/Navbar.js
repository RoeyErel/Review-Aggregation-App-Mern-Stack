import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Cookie from 'js-cookie';

const API_BASE = "http://abctest.com:5000"


const Navbar = () => {
    const [user, setUser] = useState('')

    /**
     * @desc Get user info using JWT token cookie
     * @return Username and Capital first letter as useState variable
     */
    const getUser = async () => {
        await axios.get(API_BASE + '/api/users/me',{
            withCredentials: true
        })
        .then(res => {
            const firstLetter = res.data.username.charAt(0).toUpperCase();
            const str = res.data.username.slice(1)
            setUser(firstLetter+str)
            localStorage.setItem('username', (firstLetter+str))
        })
    }
    const handleLogout= () => {
        Cookie.remove('authorization');
    }
    useEffect(() => {
        getUser()
    })

    return (
        <div className= 'flex items-center justify-between z-[100] w-full absolute'>
            <div className='px-4 pt-2 flex items-center justify-between z-[100] w-full'>
                    <Link to='/'>
                        <h1 className="text-gray-100 text-5xl font-bold cursor-pointer font-[bebas] flex flex-row">Strem.<p className='text-green-600'>io</p></h1>
                    </Link>
                    {user ? (
                        <div className='flex flex-row justify-center items-center'>
                            <Link to='/account'>
                                <div className='bg-gray-800/90 mr-1 flex justify-center items-center'>
                                    <button className=" px-4 py-2 rounded cursor-pointer text-white flex flex-row justify-center items-center">
                                        Hi,&nbsp;
                                        {user}
                                    </button>
                                </div>
                            </Link>
                            <button onClick={handleLogout} className="bg-green-600 px-6 py-2 rounded cursor-pointer text-white">Log Out</button>
                        </div>
                    ) : (          
                        <div className={API_BASE? 'show' : 'hidden'}>
                            <Link to='/login'>
                                <button className="text-white pr-4">Sign In</button>
                            </Link>
                            <Link to='/Signup'>
                                <button className="bg-green-600 px-6 py-2 rounded cursor-pointer text-white">Sign Up</button>
                            </Link>
                        </div>
                    )}
            </div>
        </div>
    )
}

export default Navbar