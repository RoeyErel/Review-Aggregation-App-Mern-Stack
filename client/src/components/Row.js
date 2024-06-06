import React, { useEffect, useState } from 'react'
import { MdChevronLeft, MdChevronRight} from 'react-icons/md'
import axios from 'axios'
import Movie from './Movie'
import { rowSlider } from '../utils'

const Row = ({rowID, title, fetchURL}) => {
    const [movies, setMovies] = useState([])


    
    const fetchUrls = async(url) =>{
        try{
            axios.get(process.env.REACT_APP_API_BASE + url)
            .then((response) =>{
                setMovies(response.data.results)
        })
        }catch(err){
            console.log(err)
        }
    }

    useEffect(() => {
        fetchUrls(fetchURL)
    },[fetchURL])
    
    return (
        <div id='rows' className='my-4'>
            <div className='mt-4 mb-0'>
                <h2 className='text-white font-bold text-3xl sm:text-2xl px-2 py-1'>{title}</h2>
                <div className='w-14 h-1 bg-green-600 mx-2 rounded-md'></div>
            </div>
            <div className='relative flex items-center group'>
                <MdChevronLeft onClick={() => rowSlider("left", rowID)} className='sm:hidden bg-white left-0 rounded-full absolute opacity-50 hover:opacity-100 cursor-pointer z-10 hidden group-hover:block' size={40}  />
                <div id={'slider' + rowID} className='w-full h-full overflow-hidden overflow-x-auto whitespace-nowrap scroll-smooth scrollbar-hide relative ease-in-out'>
                    {movies.map((item, id) => (
                        <Movie key={id} item={item}/>
                    ))}
                </div>
                <MdChevronRight onClick={() => rowSlider("right", rowID)} className='sm:hidden bg-white right-0 rounded-full absolute opacity-50 hover:opacity-100 cursor-pointer z-10 hidden group-hover:block' size={40}  />
            </div>
        </div>
    )
}

export default Row