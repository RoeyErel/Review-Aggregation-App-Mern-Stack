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
                    <h1 className='text-3xl md:text-5xl'>{movie?.title}</h1>
                    <div className='my-4'>
                        <button className='border bg-gray-300 text-black border-gray-300 py-2 px-5'>Play</button>
                        <button className='border  text-white border-gray-300 py-2 px-5 ml-4'>Watchlater</button>
                    </div>
                    <p className='text-gray-400 text-sm'>Released: {movie?.release_date}</p>
                    <p className='w-full md:max-w-[70%] lg:max-w=[50%] xl:max-w-[35%] text-gray-200'>
                        {turncateStrting(movie?.overview, 250)}
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Main