import React from 'react'
import Row from '../components/Row'

const avatar = 'https://img.freepik.com/free-photo/fashion-boy-with-yellow-jacket-blue-pants_71767-96.jpg?w=740&t=st=1685753646~exp=1685754246~hmac=f43ed2fec1e683987e5f632c44bb6ea91901fdb3772a2e004e280cc377609bd3'

const Account = () => {
  return (
    <div>
        <div id='upper-container' className='h-[450px] w-full flex justify-center items-center'>
            <div id='profile' className='flex justify-center items-center h-[200px] w-full'>
                <img alt='' src={avatar} className='w-[200px] h-[200px] rounded-[50%] mx-2 sm:mx-6 ' />
                <div className='w-1 h-full bg-white mx-2 sm:mx-6 '></div>
                <h1 className='text-white font-bold mx-2 sm:mx-6 text-2xl w-auto sm:text-[60px]'>{localStorage.getItem('username')}</h1>
            </div>
        </div>
        <div id='row-container'>
            <Row rowID='101' title='For You' fetchURL={'/api/lists/PopularMovies'} />
        </div>
    </div>
  )
}

export default Account