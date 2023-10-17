import React, { useEffect, useState } from 'react'
import axios from 'axios'

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
                <img className='w-full h-full object-cover' src={`https://image.tmdb.org/t/p/original/${movie?.backdrop_path}`} alt={movie?.title}/>
                <div className='absolute w-full top-[20%] py-4 px-8 md:p-8 font-bold'>
                    <h1 className='text-5xl md:text-4xl sm:text-4xl'>{movie?.title}</h1>
                    <p className='text-gray-400 mt-2 text-sm font-thin'>Released: {movie?.release_date}</p>
                    <p className='w-full max-w-[50%] xl:max-w-[70%] md:max-w-none mt-1 sm:text-[13px]  text-gray-200'>
                        {turncateStrting(movie?.overview, 350)}
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Main