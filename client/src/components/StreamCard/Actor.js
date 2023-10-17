import React from 'react'

const PPQM = 'https://cdn1.vectorstock.com/i/1000x1000/10/85/question-mark-and-face-profile-silhouette-icon-vector-10311085.jpg'
const Actor = ({actor}) => {
    //delet (Uncredited)
    return (
        <div className='w-[200px] sm:w-[180px] md:w-[190px] inline-block cursor-pointer relative mx-1 align-middle'>
            <img className={actor.profile_path? 'w-full h-full block  sm:m-0': 'block w-[200px] h-[300px]'} 
                src={actor.profile_path? `https://image.tmdb.org/t/p/w500/${actor.profile_path}` : PPQM} 
                alt={actor.name}
            />
            <div className='h-[110px] sm:h-[70px]'>
                <p id={actor.id} className='white-space-normal text-white text-2xl font-bold md:text-sm flex justify-center items-start whitespace-break-spaces text-center px-2 h-fit'>{actor?.character}</p>
                <p id={actor.id} className='white-space-normal text-white text-xl font-thin md:text-sm flex justify-center items-start whitespace-break-spaces h-fit text-center px-2 pt-2'>{actor?.name }</p>
            </div>
        </div>
    )
}

export default React.memo(Actor)