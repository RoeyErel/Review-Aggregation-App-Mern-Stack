import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Movie from '../components/Movie'

const avatar = 'https://img.freepik.com/free-photo/fashion-boy-with-yellow-jacket-blue-pants_71767-96.jpg?w=740&t=st=1685753646~exp=1685754246~hmac=f43ed2fec1e683987e5f632c44bb6ea91901fdb3772a2e004e280cc377609bd3'

const Account =  () => {
    const [SavedShow, setSavedShow] = useState([])

    useEffect(()=>{
        getSavedShow()
    },[SavedShow]);

    const getSavedShow = async() =>{
        try{
            await axios.get(process.env.REACT_APP_API_BASE + '/api/users/GetSavedShow',{withCredentials: true})
                .then(res => {
                    setSavedShow(res.data)
                })
        }catch(err){
            console.log(err);
        }
    }
    
    return (
        <div>
            <div id='upper-container' className='h-[450px] w-full flex justify-center items-center'>
                <div id='profile' className='flex sm:flex-col justify-center items-center h-[200px] w-full'>
                    <img alt='' src={avatar} className='w-[200px] h-[200px] rounded-[50%] mx-2 sm:mx-6 sm:my-4'/>
                    <div className='w-1 h-full bg-white mx-2 sm:mx-6 sm:hidden md:hidden '></div>
                    <h1 className='text-white font-bold mx-2 sm:mx-6 text-2xl w-auto md:text-[60px]'>{localStorage.getItem('username')}</h1>
                </div>
            </div>
            <div id='row-container' className='flex flex-col h-full ml-2'>
                <h2 className='text-white font-bold text-3xl sm:text-2xl px-2 py-1'>Saved Streams</h2>
                <div className='w-14 h-1 bg-green-600 mx-2 rounded-md'></div>
                <div  className='grid-flow-col object-contain'>
                    {SavedShow.map((item,id) => (
                        <Movie key={id} item={item}/>
                    ))}            
                </div>
            </div>
        </div>
    )
}

export default Account