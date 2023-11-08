import React from 'react'
import SavedShows from '../components/SavedShowsRow'
import { avatar } from '../links'

const Account =  () => {

    return (
        <div>
            <div id='upper-container' className='h-[450px] w-full flex justify-center items-center'>
                <div id='profile' className='flex sm:flex-col justify-center items-center h-[200px] w-full'>
                    <img alt='' src={avatar} className='w-[200px] h-[200px] rounded-[50%] mx-2 sm:mx-6 sm:my-4'/>
                    <div className='w-1 h-full bg-white mx-2 sm:mx-6 sm:hidden md:hidden '></div>
                    <h1 className='text-white font-bold mx-2 sm:mx-6 text-2xl w-auto md:text-[60px]'>{localStorage.getItem('username')}</h1>
                </div>
            </div>
            <div id='row-container' className='flex flex-col h-full ml-2'>
                <SavedShows/>
            </div>
        </div>
    )
}

export default Account