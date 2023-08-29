import React from 'react'
import { useParams } from 'react-router-dom'
import MovieCard from '../components/MovieCard'

const Stream = () => {
    const { type, id } = useParams('')
    return (
        <div>
            <MovieCard streamIndex={id} StreamTV={type}/>
        </div>
    )
}

export default Stream