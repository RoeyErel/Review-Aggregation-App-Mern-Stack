import React, {useEffect, useState} from 'react'
import axios from 'axios';
import {Link} from 'react-router-dom'
import {FaHeart, FaRegHeart} from 'react-icons/fa'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { toastMessage } from '../utils';


const Movie = ({item, savedStream}) => {
    const [IsMovie, setIsMovie] = useState('')
    const [like, setLike] = useState(savedStream)
    
    useEffect(()=>{
        ifMovie(item)
    },[item])

    const ifMovie = async (Stream) =>{
        if(Stream.original_title != null || Stream.streamType === 'movie'){
            setIsMovie('movie')
        }else{
            setIsMovie('tv') 
        }
    }
    
    const saveShow = async () => {
        if(localStorage.getItem('username')){
            axios.post(process.env.REACT_APP_API_BASE + '/api/users/savedShow', {
                UserId: localStorage.getItem('ID'),
                StreamName: item.name? item.name:item.title,
                StreamType: item.name? "tv":"movie",
                id: item.id,
                Poster_path: item.poster_path,
            }).then(res => {
                if(res.status === 201){
                    toastMessage("success", "bottom-center")
                }
            })
            setLike(!like)
        }else {
            toast.error('Please Log in!', {
                position: "bottom-center",
                autoClose: 1300,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        }
    }
    
    return (
        <div className='w-[240px] sm:w-[200px] md:w-[240px] lg:w-[280px] inline-block  relative p-2'>
            <img className='w-full h-full block rounded-md' src={`https://image.tmdb.org/t/p/w500/${item?.poster_path}`} alt={item.title}/>
            <ToastContainer position="top-center" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="dark"/>
            <div id={item.id} className='absolute top-0 left-0 w-full h-full hover: bg-black/50 opacity-0 hover:opacity-100 text-white flex justify-center items-center'>
                <Link to={"/Stream/"+ IsMovie +"/"+ item.id} id={item.id} className='cursor-pointer white-space-normal text-lg md:text-sm font-bold flex justify-center items-center whitespace-break-spaces h-full text-center px-2'>{item?.name ? item.name : item.title}</Link>
                <p onClick={(e) => saveShow(e)}>
                    {savedStream ? (
                        <FaHeart className='absolute top-4 left-4 text-gray-300 cursor-pointer' size={20}/>
                    ) : (
                        <FaRegHeart className='absolute top-4 left-4 text-gray-300 cursor-pointer' size={20}/>
                    )}
                </p>
            </div>
        </div>
    )
}

export default React.memo(Movie)