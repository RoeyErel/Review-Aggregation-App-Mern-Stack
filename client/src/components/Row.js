import React, { useEffect, useState } from 'react'
import { MdChevronLeft, MdChevronRight} from 'react-icons/md'
import axios from 'axios'
import Movie from './Movie'
import { rowSlider } from '../utils'

const Row = ({rowID, title, fetchURL}) => {
    const [movies, setMovies] = useState([])
    const [savedShows, setSavedShows] = useState(() => {
        // Retrieve savedShows from localStorage if it exists
        const saved = localStorage.getItem("savedShows");
        return saved ? JSON.parse(saved) : [];
    });
    
    
    const fetchUrls = async(url) =>{
        try{
            axios.get(process.env.REACT_APP_API_BASE + url)
            .then((response) =>{
                setMovies(response.data.results)
        })
        }catch(err){
            console.log(err)
        }
    }

    useEffect(() => {
        const fetchSavedShow = async () => {
            try {
                const res = await axios.get(`${process.env.REACT_APP_API_BASE}/api/users/GetSavedShow`, {
                    withCredentials: true,
                });
                const data = res.data;
                const parsedData = Array.isArray(data) ? data : JSON.parse(data); // Ensure data is parsed as an array
                setSavedShows(parsedData);

                // Store as a JSON string in localStorage
                localStorage.setItem("savedShows", JSON.stringify(parsedData));
            } catch (error) {
                console.error("Error fetching saved shows:", error);
            }
        };

        fetchUrls(fetchURL);
        fetchSavedShow();
    }, [fetchURL]); // Remove savedShows from dependency array

    
    return (
        <div id='rows' className='my-4'>
            <div className='mt-4 mb-0'>
                <h2 className='text-white font-bold text-3xl sm:text-2xl px-2 py-1'>{title}</h2>
                <div className='w-14 h-1 bg-green-600 mx-2 rounded-md'></div>
            </div>
            <div className='relative flex items-center group'>
                <MdChevronLeft onClick={() => rowSlider("left", rowID)} className='sm:hidden bg-white left-0 rounded-full absolute opacity-50 hover:opacity-100 cursor-pointer z-10 hidden group-hover:block' size={40}  />
                <div id={'slider' + rowID} className='w-full h-full overflow-hidden overflow-x-auto whitespace-nowrap scroll-smooth scrollbar-hide relative ease-in-out'>
                    {movies.map((item, id) => (
                        // eslint-disable-next-line eqeqeq
                        <Movie key={id} item={item} liked={savedShows.some((favorite) => favorite.id == item.id )} />
                    ))}
                </div>
                <MdChevronRight onClick={() => rowSlider("right", rowID)} className='sm:hidden bg-white right-0 rounded-full absolute opacity-50 hover:opacity-100 cursor-pointer z-10 hidden group-hover:block' size={40}  />
            </div>
        </div>
    )
}

export default Row