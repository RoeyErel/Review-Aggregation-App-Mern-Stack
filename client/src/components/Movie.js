import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { toastMessage } from '../utils';

const Movie = ({ item }) => {
    const [isMovie, setIsMovie] = useState('');
    const [like, setLike] = useState(false);

    useEffect(() => {
        ifMovie(item);
    }, [item]);

    const ifMovie = (Stream) => {
        setIsMovie(Stream.original_title != null || Stream.streamType === 'movie' ? 'movie' : 'tv');
    };



    const saveShow = async () => {
        if (localStorage.getItem('username')) {
            try {
                const showData = {
                    UserId: localStorage.getItem('ID'),
                    StreamName: item.name ? item.name : item.title,
                    StreamType: item.name ? 'tv' : 'movie',
                    id: item.id,
                    Poster_path: item.poster_path,
                };
                if (like) {
                    await axios.delete(`${process.env.REACT_APP_API_BASE}/api/users/${localStorage.getItem('ID')}/savedShow`, { data: { id: item.id } });
                    toastMessage('success', 'bottom-center', 'Removed Successfully!');
                } else {
                    await axios.post(`${process.env.REACT_APP_API_BASE}/api/users/savedShow`, showData);
                    toastMessage('success', 'bottom-center', 'Saved Successfully!');
                }
                // Toggle the like status
                setLike(!like);
            } catch (error) {
                console.error('Error saving show:', error);
                toastMessage('error', 'bottom-center', 'An error occurred!');
            }
        } else {
            toastMessage('error', 'bottom-center', 'Please Log in!');
        }
    };

    return (
        <div className='w-[240px] sm:w-[200px] md:w-[240px] lg:w-[280px] inline-block relative p-2'>
            <img className='w-full h-full block rounded-md' src={`https://image.tmdb.org/t/p/w500/${item?.poster_path}`} alt={item.title} />
            <ToastContainer position="top-center" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="dark" />
            <div id={item.id} className='absolute top-0 left-0 w-full h-full hover:bg-black/50 opacity-0 hover:opacity-100 text-white flex justify-center items-center'>
                <Link to={`/Stream/${isMovie}/${item.id}`} id={item.id} className='cursor-pointer text-lg md:text-sm font-bold flex justify-center items-center whitespace-break-spaces h-full text-center px-2'>
                {item?.name ? item.name : item.title}
                </Link>
                <p onClick={saveShow}>
                {like ? (
                    <FaHeart className='absolute top-4 left-4 text-gray-300 cursor-pointer' size={20} />
                ) : (
                    <FaRegHeart className='absolute top-4 left-4 text-gray-300 cursor-pointer' size={20} />
                )}
                </p>
            </div>
        </div>
    );
};

export default React.memo(Movie);
