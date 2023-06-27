import axios from 'axios'
import React, { useEffect, useState } from 'react'

const Main = ({fetchURL}) => {
    const [Movies, setMovies] = useState([])
    const movie = Movies[Math.floor(Math.random() * Movies.length)]

    useEffect(()=>{
        axios.get(process.env.REACT_APP_API_BASE+fetchURL)
            .then((response) => {
                setMovies(response.data.results)
            })
    },[fetchURL])

    const turncateStrting = (str, num) =>{
        if(str?.length > num){
            return str.slice(0,num) + '...';
        }else{
            return str
        }
    }
    return (
        <div className="w-full h-[650px] text-white">
            <div className="w-full h-full">
                <div className='absolute w-full h-[650px] bg-gradient-to-r from-black'></div>
                <img className='w-full h-full object-cover' 
                    src={`https://image.tmdb.org/t/p/original/${movie?.backdrop_path}`} 
                    alt={movie?.title}
                />
                <div className='absolute w-full top-[20%] p-4 md:p-8 font-bold'>
                    <h1 className='text-5xl md:text-3xl'>{movie?.title}</h1>
                    <div className='my-4'>
                    </div>
                    <p className='text-gray-400 text-sm'>Released: {movie?.release_date}</p>
                    <p className='w-full max-w-[50%] mt-1 sm:text-[15px] sm:max-w-none text-gray-200'>
                        {turncateStrting(movie?.overview, 250)}
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Main