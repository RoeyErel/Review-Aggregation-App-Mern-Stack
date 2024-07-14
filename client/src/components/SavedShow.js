import React, {useEffect, useState} from 'react'
import {Link} from 'react-router-dom'
import {AiOutlineClose} from 'react-icons/ai'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const SavedShow = ({item, removeSavedShow}) => {
    const [IsMovie, setIsMovie] = useState('')

    const ifMovie = async (Stream) => {
        if(Stream.original_title != null || Stream.streamType === 'movie'){
            setIsMovie('movie')
        }else{
            setIsMovie('tv') 
        }
    }
    

    useEffect(() => {
        ifMovie(item)
    },[item])

    return (
        <div className='w-[240px] sm:w-[200px] md:w-[240px] lg:w-[280px] inline-block  relative p-2'>
            <img className='w-full h-full block rounded-md' src={`https://image.tmdb.org/t/p/w500/${item?.poster_path}`} alt={item.title}/>
            <ToastContainer position="top-center" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="dark"/>
            <div id={item.id} className='absolute top-0 left-0 w-full h-full hover: bg-black/50 opacity-0 hover:opacity-100 text-white flex justify-center items-center'>
                <Link to={"/Stream/"+ IsMovie +"/"+ item.id} id={item.id} className='cursor-pointer white-space-normal text-lg md:text-sm font-bold flex justify-center items-center whitespace-break-spaces h-full text-center px-2'>{item?.name ? item.name : item.title}</Link>
                <p onClick={(e) => removeSavedShow(item, e)}>
                    <AiOutlineClose className='absolute font-bold top-4 left-4 text-gray-300 cursor-pointer' size={20}/>
                </p>
            </div>
        </div>
    )
}

export default React.memo(SavedShow)