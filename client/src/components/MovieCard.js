import React,{useState, useEffect} from 'react'
import { MdStarRate} from 'react-icons/md'
import YouTube from 'react-youtube'

const MovieCard = ({streamIndex, StreamTV}) => {
    const [Trailer, setTrailer] = useState([])
    const [Movie, setMovie] = useState(false)
    const opts = {
        height: '375',
        width: '700',
        playerVars: {
          autoplay: 1,
          mute: 1
        },
    };
    const fetchStream = async () => {
        const details = await fetch('https://api.themoviedb.org/3/'+StreamTV+'/'+streamIndex+'?api_key='+process.env.REACT_APP_API_KEY+'&append_to_response=videos')
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
        fetchStream()
    })

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
        <div id='main-frame' className='flex flex-col justify-center overflow-y-auto items-center w-full h-full absolute'>
            <img id='bg-img' className='w-full h-full object-cover absolute' 
                    src={`https://image.tmdb.org/t/p/original/${Movie?.backdrop_path}`} 
                    alt={Movie?.title}
            />
            <div id='bg-img-filter' className=' bg-black/80 fixed top-0 left-0 w-full h-screen'></div>
            <div id='red-container' className='z-50 flex flex-row justify-center items-start w-full h-full mt-[100px] sm:mt-[75px] md:mt-[90px] sm:w-full'>
                <div id='yellow-container' className='flex flex-row w-[500px] h-[750px] sm:hidden md:hidden md:h-fit'>
                    <div id='poster' className='w-[500px] h-full flex md:items-start md:justify-center md:px-2'>
                        <img className='w-full h-full sm:hidden md:w-full md:h-fit' alt='poster' src={`https://image.tmdb.org/t/p/w500/${Movie?.poster_path}`}/>
                    </div>
                </div>
                <div id='green-container' className='text-white flex flex-col w-[700px] h-[750px] sm:w-full sm:mx-2 mx-8'>
                    <div id='text-container' className='h-[50%] w-full'>
                        <div id='stream-overview' className='flex justify-start items-start'>
                            <h1 className='text-[45px] px-8 font-bold'>{Movie?.name ? Movie.name : Movie.title}</h1>
                        </div>
                        <div id='overview-container' className='flex flex-col px-8'>
                            <div id='rating-box' className='flex'>
                                <p className='text-[16px] font-thin'>{turncateStrting(Movie.release_date, 4)}</p>
                                <p className='text-[16px] px-2 flex flex-row justify-start items-center font-thin'><MdStarRate className='mr-1 text-yellow-500'/>
                                    {Movie.vote_average?turncateStrting( Movie.vote_average, 3):turncateStrting("null", -1)}
                                </p>
                            </div>
                            <div id='overview-box'>
                                <p  className='text-[18px] md:text-[14px] font-thin mt-1'>{turncateStrting(Movie.overview, 400)}</p>
                            </div>
                        </div>
                    </div>
                    <div id='trailer-container' className='h-[50%] w-full flex justify-center items-end p-0 sm:hidden md:'>
                        <div id='trailer' className='w-full h-auto p-0 flex justify-center items-end '>
                            {<YouTube opts={opts} videoId={Trailer? Trailer.key : 'Y1DZZvTnOH8'}/>}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default MovieCard