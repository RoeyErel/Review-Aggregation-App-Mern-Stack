import React, { useEffect, useState } from 'react'
import { MdChevronLeft, MdChevronRight} from 'react-icons/md'
import axios from 'axios'
import Movie from './Movie'
import SavedShow from './SavedShow'

const Row = () => {
    const [SavedShows, setSavedShows] = useState([])

    useEffect(()=>{
        getSavedShow()
    },[SavedShows]);

    const getSavedShow = async() =>{
        try{
            await axios.get(process.env.REACT_APP_API_BASE + '/api/users/GetSavedShow',{withCredentials: true})
                .then(res => {
                    setSavedShows(res.data)
                })
        }catch(err){
            console.log(err);
        }
    }
    
    const slideLeft = () => {
        let slider = document.getElementById('slider' + 1)
        slider.scrollLeft = slider.scrollLeft - 500
    }
    
    const sliderRight = () => {
        let slider = document.getElementById('slider' + 1)
        slider.scrollLeft = slider.scrollLeft + 500
    }

    return (
        <div id='rows' className='my-4'>
            <div className='mt-4 mb-0'>
                <h2 className='text-white font-bold text-3xl sm:text-2xl px-2 py-1'>Saved Shows</h2>
                <div className='w-14 h-1 bg-green-600 mx-2 rounded-md'></div>
            </div>
            <div className='relative flex items-center group'>
                <MdChevronLeft onClick={slideLeft} className='sm:hidden bg-white left-0 rounded-full absolute opacity-50 hover:opacity-100 cursor-pointer z-10 hidden group-hover:block' size={40}  />
                <div id={'slider' + 1} className=' ml-10 w-full h-full overflow-hidden overflow-x-auto whitespace-nowrap scroll-smooth scrollbar-hide relative ease-in-out'>
                    {SavedShows.map((item, id) => (
                        <SavedShow key={id} item={item} savedStream={SavedShows.some(favorite => favorite.id.includes(item.id))}/>
                    ))}
                </div>
                <MdChevronRight onClick={sliderRight} className='sm:hidden bg-white right-0 rounded-full absolute opacity-50 hover:opacity-100 cursor-pointer z-10 hidden group-hover:block' size={40}  />
            </div>
        </div>
    )
}

export default React.memo(Row)