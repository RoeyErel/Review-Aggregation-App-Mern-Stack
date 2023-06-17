import React,{useEffect, useState} from 'react'
import {Link} from 'react-router-dom'

const Movie = ({item}) => {
    const [IsMovie, setIsMovie] = useState('')

    const isMovie = () =>{
        if(item.original_title != null){
            setIsMovie('movie')
        }else{
            setIsMovie('tv') 
        }
    }

    useEffect(()=>{
        isMovie()
    })

    return (
        <Link className='w-[160px] sm:w-[200px] md:w-[240px] lg:w-[280px] inline-block cursor-pointer relative p-2' 
            to={"/Stream/"+ IsMovie +"/"+ item.id}>
            <img className='w-full h-full block' 
                src={`https://image.tmdb.org/t/p/w500/${item?.poster_path}`} 
                alt={item.title}
            />
            <div id={item.id} className='absolute top-0 left-0 w-full h-full hover: bg-black/30 opacity-0 cursor-pointer hover:opacity-100 text-white flex justify-center items-center'>
                <p id={item.id} className='white-space-normal text-xs md:text-sm font-bold flex justify-center items-center h-full text-center'>{item?.name ? item.name : item.title}</p>
            </div>
        </Link>
    )
}
export default Movie