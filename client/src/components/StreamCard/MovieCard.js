import React,{useState, useEffect} from 'react'
import { MdStarRate} from 'react-icons/md'
import YouTube from 'react-youtube'

const MovieCard = ({streamIndex, StreamTV}) => {
    const [Trailer, setTrailer] = useState([])
    const [Movie, setMovie] = useState(false)
    const opts = {
        playerVars: {
          autoplay: 1,
          mute: 1
        },
    };
    const fetchStream = async (StreamType, StreamIndex) => {
        const details = await fetch('https://api.themoviedb.org/3/'+StreamType+'/'+StreamIndex+'?api_key='+process.env.REACT_APP_API_KEY+'&append_to_response=videos')
        const data = await details.json()
        setMovie(data)
        const fetchData = await data.videos.results.find(trailer => {
            if(trailer.name.includes("Opening Credits") 
            || trailer.name.includes("First Look") 
            || trailer.name.includes("Promo") 
            || trailer.name.includes("Trailer")){
                return true
            }else{
                return false
            }
        })
        setTrailer(fetchData)  
    }

    useEffect(() =>{
        fetchStream(StreamTV, streamIndex)
    },[StreamTV, streamIndex])

    const turncateStrting = (str, num) => {
        if(str?.length > num){
            if(str?.length > 401){
                return str.slice(0,num)+"...";
            }
            return str.slice(0,num);
        }else if(num === -1){
            return str
        }else{
            return str
        }
    }
    return (
        <div id='main-frame' className='flex flex-col justify-center items-center w-full h-fit'>
            <div id='red-container' className='z-50 flex flex-row justify-center items-start w-full h-full mt-[100px] sm:mt-[75px] md:mt-[90px]'>
                <div id='yellow-container' className='flex flex-row justify-center items-center w-[40%] mx-4 lg:hidden md:hidden sm:hidden'>
                    <div id='poster' className='h-full flex md:items-start md:justify-center px-2'>
                        <img className='w-full md:w-full md:h-fit' alt='poster' src={`https://image.tmdb.org/t/p/w500/${Movie?.poster_path}`}/>
                    </div>
                </div>
                <div id='green-container' className='text-white flex justify-start items-center flex-col w-[60%] h-[750px] sm:h-[380px] sm:w-full sm:mx-2'>
                    <div id='text-container' className='h-[50%] flex justify-start items-start flex-col w-full'>
                        <div id='stream-overview' className='flex justify-start items-start ml-2'>
                            <h1 className='text-[75px] md:text-[55px] sm:text-[55px]  font-bold flex justify-start items-start'>{Movie?.name ? Movie.name : Movie.title}</h1>
                        </div>
                        <div id='overview-container' className='flex flex-col ml-2'>
                            <div id='rating-box' className='flex'>
                                <p className='text-[16px] font-thin'>{turncateStrting(Movie.release_date, 4)}</p>
                                <p className='text-[16px] flex flex-row justify-start items-center font-thin'><MdStarRate className='mr-1 text-yellow-500'/>
                                    {Movie.vote_average?turncateStrting( Movie.vote_average, 3):turncateStrting("null", -1)}
                                </p>
                            </div>
                            <div id='overview-box' className='w-full h-[90%] hover:overflow-y-auto scrollbar scrollbar-thumb-gray-900 scrollbar-track-gray-100'>
                                <p  className='text-[20px] md:text-[14px] font-thin mt-1 '>{Movie.overview}</p>
                            </div>
                        </div>
                    </div>
                    <div id='trailer-container' className='h-[50%] w-full flex justify-start items-end p-0 sm:hidden'>
                        <div id='trailer' className='w-fit h-auto p-0 flex justify-start items-end '>
                            {<YouTube opts={opts} videoId={Trailer? Trailer.key : 'Y1DZZvTnOH8'}/>}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default React.memo(MovieCard)