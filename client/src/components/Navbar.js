import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'

const Navbar = () => {
    const [user, setUser] = useState('')
    const navigate = useNavigate()
    /**
     * @desc Get user info using JWT token cookie
     * @return Username and Capital first letter as useState variable
     */
    const getUser = async () => {
        try{
            await axios.get(process.env.REACT_APP_API_BASE + '/api/users/me',{
                withCredentials: true
            })
            .then(res => {
                const firstLetter = res.data.username.charAt(0).toUpperCase();
                const str = res.data.username.slice(1)
                setUser(firstLetter+str)
                localStorage.setItem('username', (firstLetter+str))
            })
        }catch(err){
            
        }
    }

    useEffect(() => {
        getUser()
    },[user])
    
    /**
     * @desc Handle logout button
     * @return Remove cookie
     */
    const handleLogout = async () => {
        await axios.get(process.env.REACT_APP_API_BASE+ '/api/users/logout',{
            withCredentials: true
        })
        .then(res => {
            localStorage.removeItem('username')
            navigate('/')
            setUser(null)
        })    
    }
    
    return (
        <div className= 'flex items-center justify-between z-[100] w-full absolute'>
            <div className='px-4 pt-2 flex items-center justify-between z-[100] w-full'>
                    <Link to='/'>
                        <h1 className="text-gray-100 text-5xl sm:text-4xl font-bold cursor-pointer font-[bebas] flex flex-row">Strem.<p className='text-green-600'>io</p></h1>
                    </Link>
                    {user ? (
                        <div className='flex flex-row justify-center items-center'>
                            <Link to='/account'>
                                <div className='bg-gray-800/90 hover:bg-gray-700 mr-1 flex justify-center items-center rounded'>
                                    <button className="px-4 sm:px-2 py-2 sm:text-sm cursor-pointer text-white flex flex-row justify-center items-center">
                                        Hi,&nbsp;
                                        {user}
                                    </button>
                                </div>
                            </Link>
                            <button onClick={handleLogout} className="bg-green-600 hover:bg-green-700 px-6 py-2 sm:px-2 font-bold sm:text-sm rounded cursor-pointer text-white">Log Out</button>
                        </div>
                    ) : (          
                        <div>
                            <Link to='/login'>
                                <button className="text-white pr-4">Sign In</button>
                            </Link>
                            <Link to='/Signup'>
                                <button className="bg-green-600 px-6 py-2 rounded cursor-pointer text-white md:py-1 md:px-3">Sign Up</button>
                            </Link>
                        </div>
                    )}
            </div>
        </div>
    )
}

export default Navbar