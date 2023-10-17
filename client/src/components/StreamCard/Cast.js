import React, { useEffect, useState } from 'react'
import { MdChevronLeft, MdChevronRight} from 'react-icons/md'
import axios from 'axios'
import Actor from './Actor'

const Cast = ({rowID, title, index, streamType}) => {
    const [Actors, setActors] = useState([])

    const getCast = async (Type, Index) =>{
        try{
            await axios.get(process.env.REACT_APP_API_BASE +'/api/lists/Cast/'+Type+'/'+Index)
                .then(data => {
                    setActors(data.data.cast)
            })
        }catch(err){
            console.error(err)
        }
    }
    useEffect(()=>{
        getCast(streamType, index)
    },[streamType, index])

    const slideLeft = () =>{
        let slider = document.getElementById('slider' + rowID)
        slider.scrollLeft = slider.scrollLeft - 500
    }
    
    const sliderRight = () =>{
        let slider = document.getElementById('slider' + rowID)
        slider.scrollLeft = slider.scrollLeft + 500
    }
    
    return (
        <div id='Cast-Row' className='mt-4 mb-14'>
            <div className='mt-4 mb-0'>
                <h2 className='text-white font-bold text-4xl md:text-3xl sm:text-2xl px-2 pt-1 pb-4'>{title}</h2>
            </div>
            <div className='relative items-center group flex flex-row justify-center h-[75%]'>
                <MdChevronLeft onClick={slideLeft} className='bg-white left-0 mb-14 opacity-30 hover:opacity-100 cursor-pointer z-10 group-hover:block mr-1' size={40}  />
                <div id={'slider' + rowID} className='w-full h-full sm:h-[75%] overflow-hidden overflow-x-auto whitespace-nowrap scroll-smooth scrollbar-hide relative ease-in-out'>
                    {Actors.map((actor, id) => (
                        <Actor key={id} actor={actor}/>
                    ))}
                </div>
                <MdChevronRight onClick={sliderRight} className=' bg-white right-0 opacity-30 mb-14 hover:opacity-100 cursor-pointer z-10 group-hover:block ml-1' size={40}  />
            </div>
        </div>
    )
}

export default React.memo(Cast) 