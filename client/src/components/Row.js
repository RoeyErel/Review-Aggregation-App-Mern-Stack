import React, { useEffect, useState } from 'react'
import { MdChevronLeft, MdChevronRight} from 'react-icons/md'
import axios from 'axios'
import Movie from './Movie'
const API_BASE = "http://localhost:5000"

const Row = ({rowID, title, fetchURL}) => {
    const [movies, setMovies] = useState([])

    useEffect(()=>{
        axios.get(API_BASE+fetchURL).then((response) =>{
            setMovies(response.data.results)
        })
    },[fetchURL])

    const slideLeft = () =>{
        let slider = document.getElementById('slider' + rowID)
        slider.scrollLeft = slider.scrollLeft - 500
    }

    const sliderRight = () =>{
        let slider = document.getElementById('slider' + rowID)
        slider.scrollLeft = slider.scrollLeft + 500
    }
    
    return (
        <div id='rows' className='my-4'>
            <div className='mt-4 mb-0'>
                <h2 className='text-white font-bold text-xl md:text-3xl px-2 py-1'>{title}</h2>
                <div className='w-14 h-1 bg-green-600 mx-2 rounded-md'></div>
            </div>
            <div className='relative flex items-center group'>
                <MdChevronLeft onClick={slideLeft} className='bg-white left-0 rounded-full absolute opacity-50 hover:opacity-100 cursor-pointer z-10 hidden group-hover:block' size={40}  />
                <div id={'slider' + rowID} className='w-full h-full overflow-hidden whitespace-nowrap scroll-smooth scrollbar-hide relative ease-in-out'>
                    {movies.map((item,id) => (
                        <Movie key={id} item={item}/>
                    ))}
                </div>
                <MdChevronRight onClick={sliderRight} className='bg-white right-0 rounded-full absolute opacity-50 hover:opacity-100 cursor-pointer z-10 hidden group-hover:block' size={40}  />
            </div>
        </div>
  )
}

export default Row