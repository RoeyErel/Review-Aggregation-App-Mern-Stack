import React, { useState, useEffect } from 'react';
import { MdStarRate } from 'react-icons/md';
import { TMDB_STREAM_URL } from '../../links';
import axios from 'axios';
import { turncateStrting } from '../../utils';

const MovieCard = ({ streamIndex, StreamType }) => {
    const [Trailer, setTrailer] = useState([]);
    const [Movie, setMovie] = useState([]);


    const fetchStream = async (type, index) => {
        try {
            const response = await axios.get(
                `${TMDB_STREAM_URL}${type}/${index}?api_key=${process.env.REACT_APP_API_KEY}&append_to_response=videos`,
                { withCredentials: false }
            );
            const movieData = response.data;
            setMovie(movieData);

            const trailerData = movieData.videos?.results.find(trailer =>
                ['Opening Credits', 'First Look', 'Promo', 'Trailer', 'Opening 1'].some(keyword => trailer.name.includes(keyword))
            );
            
            setTrailer(trailerData);
        } catch (error) {
            console.error("Error fetching stream data:", error);
        }
    };

    useEffect(() => {
        fetchStream(StreamType, streamIndex, Movie);
    }, [streamIndex, StreamType, Movie]);

    return (
        <div id='MovieCard-Main' className='flex flex-col justify-center items-center w-full h-[70%]'>
            <div id='red-container' className='z-50 flex flex-row justify-center items-start w-full h-full mt-[100px] sm:mt-[75px] md:mt-[90px]' >
                <div id='yellow-container' className='flex flex-row justify-center items-center w-[25%] mx-4 lg:hidden md:hidden sm:hidden'>
                    <div id='poster' className='h-full flex md:items-start md:justify-center px-2'>
                        <img
                            className='w-full md:w-full md:h-fit'
                            alt='poster'
                            src={`https://image.tmdb.org/t/p/w500/${Movie?.poster_path}`}
                        />
                    </div>
                </div>
                <div
                    id='green-container'
                    className='text-white flex justify-start items-center flex-col w-[60%] h-[650px] sm:h-[680px] sm:w-full sm:mx-2'
                >
                    <div id='text-container' className='h-full flex justify-start items-start flex-col w-full'>
                        <div id='stream-overview' className='flex justify-start items-start ml-2'>
                            <h1 className='text-[50px] md:text-[55px] sm:text-[55px] font-bold flex justify-start items-start'>
                                {Movie?.name ? Movie.name : Movie.title}
                            </h1>
                        </div>
                        <div id='overview-container' className='flex flex-col ml-2 h-full w-full'>
                            <div id='rating-box' className='flex'>
                                <p className='text-[16px] font-thin'>{turncateStrting(Movie.release_date, 4)}</p>
                                <p className='text-[16px] flex flex-row justify-start items-center font-thin'>
                                    <MdStarRate className='mr-1 text-yellow-500' />
                                    {Movie.vote_average
                                        ? turncateStrting(Movie.vote_average, 3)
                                        : turncateStrting('null', -1)}
                                </p>
                            </div>
                            <div id='m' className='flex flex-col items-start h-full w-full'>
                                <div
                                    id='overview-box'
                                    className='flex flex-col justify-start items-start w-[75%] sm:w-full h-full pr-4 hover:overflow-y-auto scrollbar scrollbar-thumb-gray-900 scrollbar-track-gray-100'
                                >
                                    <p className='text-[20px] md:text-[14px] sm:pr-4 font-thin mt-1 mb-4'>{Movie.overview}</p>
                                    <div id='trailer-box' className='flex flex-col justify-start p-4 items-start w-full h-full'>
                                        <iframe
                                            id='trailer'
                                            className='w-full h-full md:h-[315px] sm:h-[250px]'
                                            src={'https://www.youtube.com/embed/'+Trailer?.key}
                                            title='Trailer'
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                            allowFullScreen
                                        ></iframe>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
    
};

export default React.memo(MovieCard);
