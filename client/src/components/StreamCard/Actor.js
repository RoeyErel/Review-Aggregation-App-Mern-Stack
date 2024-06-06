import React from 'react'
import { DEFAULT_IMG } from '../../links'

const Actor = ({actor}) => {
    //delet (Uncredited)
    return (
        <div className='w-[160px] sm:w-[180px] md:w-[190px] inline-block relative mx-1 align-middle'>
            <img className={actor.profile_path? 'w-full h-full block  sm:m-0': 'block w-[160px] sm:w-[180px]'} 
                src={actor.profile_path? `https://image.tmdb.org/t/p/w500/${actor.profile_path}` : DEFAULT_IMG} 
                alt={actor.name}
            />
            <div className='h-[110px] sm:h-[70px]'>
                <p id={actor.id} className='white-space-normal text-white text-xl font-bold md:text-sm flex justify-center items-start whitespace-break-spaces text-center px-2 h-fit'>{actor?.character}</p>
                <p id={actor.id} className='white-space-normal text-white text-lg font-thin md:text-sm flex justify-center items-start whitespace-break-spaces h-fit text-center px-2 pt-2'>{actor?.name }</p>
            </div>
        </div>
    )
}

export default React.memo(Actor)