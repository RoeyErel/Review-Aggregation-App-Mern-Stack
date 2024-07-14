import React, { useEffect, useState } from 'react'
import SavedShow from './SavedShow'
import { MdChevronLeft, MdChevronRight} from 'react-icons/md'
import { rowSlider } from '../utils'
import axios from 'axios'
import 'react-toastify/dist/ReactToastify.css';
import { toastMessage } from '../utils';

const SavedShowRow = () => {
    const [SavedShows, setSavedShows] = useState([])

    const getSavedShow = async () =>{
        try{
            await axios.get(process.env.REACT_APP_API_BASE + '/api/users/GetSavedShow',{withCredentials: true})
            .then(res => {
                setSavedShows(res.data)
            })
        }catch(err){
            console.log(err);
        }
    }
    
    const removeSavedShow = async (item) => {
        if(localStorage.getItem('username')){
            await axios.post(process.env.REACT_APP_API_BASE + '/api/users/savedShow', {
                UserId: localStorage.getItem('ID'),
                StreamName: item.name? item.name:item.title,
                StreamType: item.name? "tv":"movie",
                id: item.id,
                Poster_path: item.poster_path,
            }).then(res => {
                if(res.status === 201){
                    toastMessage("success", "bottom-center", "Saved Successfully!")
                }
            })
            // re-render list
            getSavedShow()
        }else {
            toastMessage("error", "bottom-center", 'Please Log in!')
        }
    }

    useEffect(()=>{
        getSavedShow()
    },[]);
    

    return (
        <div id='rows' className='my-4'>
            <div className='mt-4 mb-0'>
                <h2 className='text-white font-bold text-3xl sm:text-2xl px-2 py-1'>Saved Shows</h2>
                <div className='w-14 h-1 bg-green-600 mx-2 rounded-md'></div>
            </div>
            <div className='relative flex items-center group'>
                <MdChevronLeft onClick={() => rowSlider("left", 1)} className='sm:hidden bg-white left-0 rounded-full absolute opacity-50 hover:opacity-100 cursor-pointer z-10 hidden group-hover:block' size={40}  />
                <div id={'slider' + 1} className=' mx-10 w-full h-full overflow-hidden overflow-x-auto whitespace-nowrap scroll-smooth scrollbar-hide relative ease-in-out'>
                    {SavedShows.map((item, id) => (
                        <SavedShow key={id} item={item} removeSavedShow={removeSavedShow} savedStream={SavedShows.some(favorite => favorite.id.includes(item.id))}/>
                    ))}
                </div>
                <MdChevronRight onClick={() => rowSlider("right", 1)} className='sm:hidden bg-white right-0 rounded-full absolute opacity-50 hover:opacity-100 cursor-pointer z-10 hidden group-hover:block' size={40}  />
            </div>
        </div>
    )
}

export default React.memo(SavedShowRow)