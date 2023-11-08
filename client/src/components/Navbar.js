import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'

const Navbar = () => {
    const [user, setUser] = useState("")
    const navigate = useNavigate()
    
    useEffect(() => {
        (async () => {
            setUser(localStorage.getItem("username"))
        })();
    });
    /**
     * @desc Handle logout button
     * @return Remove cookie
     */
    const handleLogout = async () => {
        await axios.get(process.env.REACT_APP_API_BASE+'/api/users/logout',{
            withCredentials: true
        })
        .then(res => {
            if(res.status === 200){
                localStorage.removeItem('username')
                navigate('/')
                setUser(null)
            }
        })    
    }
    
    return (
        <div className= 'flex items-center justify-between z-[100] w-full absolute'>
            <div className='px-4 pt-2 flex items-center justify-between z-[100] w-full'>
                    <Link to='/'>
                        <h1 className="text-gray-100 text-5xl sm:text-3xl font-bold cursor-pointer font-[bebas] flex flex-row">Stream.<p className='text-green-600'>io</p></h1>
                    </Link>
                    {user ? (
                        <div className='flex flex-row justify-center items-center'>
                            <Link to='/account'>
                                <div id='logoput-btn' className='bg-gray-800/90 hover:bg-gray-700 mr-1 flex justify-center items-center rounded'>
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
                                <button className="bg-gray-900 hover:bg-gray-800 px-6 mr-1 py-2 rounded cursor-pointer sm:text-sm text-white font-thin md:py-1 md:px-3">Sign In</button>
                            </Link>
                            <Link to='/Signup'>
                                <button className="bg-green-600 hover:bg-green-700 px-6 ml-1 py-2 rounded cursor-pointer sm:text-sm text-white font-thin md:py-1 md:px-3">Sign Up</button>
                            </Link>
                        </div>
                    )}
            </div>
        </div>
    )
}

export default React.memo(Navbar)