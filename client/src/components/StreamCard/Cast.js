import React, { useEffect, useState } from 'react'
import { MdChevronLeft, MdChevronRight} from 'react-icons/md'
import axios from 'axios'
import Actor from './Actor'
import { rowSlider } from '../../utils'

const Cast = ({rowID, title, id, type}) => {
    const [Actors, setActors] = useState([])

    useEffect(()=>{
        const getCast = async () => {
            try{
                await axios.get(process.env.REACT_APP_API_BASE +'/api/lists/Cast/'+type+'/'+id)
                    .then(data => {
                        setActors(data.data.cast)
                    })
            }catch(err){
                console.error(err)
            }
        }
        getCast()
    },[type, id])
    
    return (
        <div id='Cast-Row-Main' className='w-full h-[30%] mt-4 mb-14'>
            <div id='row-Header' className='mt-4 mb-0 sm:mt-0'>
                <h2 className='text-white font-bold text-4xl md:text-3xl sm:text-2xl px-2 pt-1 pb-4'>{title}</h2>
            </div>
            <div id='row-on-scroll' className='relative items-center group flex flex-row justify-center h-[75%] sm:h-full'>
                <MdChevronLeft onClick={() => rowSlider("left", rowID)} className='bg-white left-0 mb-14 opacity-30 hover:opacity-100 cursor-pointer z-10 group-hover:block mr-1' size={40}  />
                <div id={'slider' + rowID} className='w-full h-full sm:h-[75%] overflow-hidden overflow-x-auto whitespace-nowrap scroll-smooth scrollbar-hide relative ease-in-out'>
                    {Actors.map((actor, id) => (
                        <Actor key={id} actor={actor}/>
                    ))}
                </div>
                <MdChevronRight onClick={() => rowSlider("right", rowID)} className=' bg-white right-0 opacity-30 mb-14 hover:opacity-100 cursor-pointer z-10 group-hover:block ml-1' size={40}  />
            </div>
        </div>
    )    
}

export default React.memo(Cast) 