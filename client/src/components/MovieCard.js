import React,{useState, useEffect} from 'react'
import { MdStarRate} from 'react-icons/md'
import YouTube from 'react-youtube'

const MovieCard = ({streamIndex, StreamTV}) => {
    const [Trailer, setTrailer] = useState([])
    const [Movie, setMovie] = useState(false)
    const opts = {
        height: '350',
        width: '640',
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
            if(trailer.name.includes("Opening Credits") || trailer.name.includes("First Look") || trailer.name.includes("Promo") || trailer.name.includes("Trailer")){
                return true
            }else{
                return false
            }
        })
        setTrailer(fetchData)  
    }

    useEffect(() =>{
        fetchStream()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[StreamTV])

    const turncateStrting = (str, num) => {
        if(str?.length > num){
            if(str?.length > 401){
                return str.slice(0,num)+"...";
            }
            return str.slice(0,num);
        }else{
            return str
        }
    }
    return (
        <div id='main-frame' className='flex flex-col justify-center items-center w-full h-full absolute mt-'>
            <img id='bg-img' className='w-full h-full object-cover absolute z-0' 
                    src={`https://image.tmdb.org/t/p/original/${Movie?.backdrop_path}`} 
                    alt={Movie?.title}
            />
            <div id='bg-img-filter' className=' bg-black/80 fixed top-0 left-0 w-full h-screen'></div>
            <div id='red-container' className='z-50 fixed flex flex-row justify-center items-start w-full h-full rounded-r-md mt-[150px] sm:mt-[125px] md:mt-[140px] sm:w-full'>
                <div id='yellow-container' className='flex flex-row  w-fit h-fit sm:hidden md:w-fit md:h-fit'>
                    <div id='poster' className='w-[400px] h-full flex md:items-start md:justify-center md:px-2'>
                        <img alt='poster' src={`https://image.tmdb.org/t/p/w500/${Movie?.poster_path}`} className='w-full h-full sm:hidden md:w-full md:h-fit'/>
                    </div>
                </div>
                <div id='green-container' className='text-white flex flex-col w-[700px] sm:w-full sm:mx-2 h-full mx-8'>
                    <div className='flex justify-start items-start'>
                        <h1 className='text-[45px] px-8 font-bold'>{Movie?.name ? Movie.name : Movie.title}</h1>
                    </div>
                    <div id='overview-container' className='flex flex-col px-8'>
                        <div className='flex'>
                            <p className='text-[16px] font-thin'>{turncateStrting(Movie.release_date, 4)}</p>
                            <p className='text-[16px] px-2 flex flex-row justify-start items-center font-thin '><MdStarRate className='mr-1 text-yellow-500'/>
                                {Movie.vote_average}
                            </p>
                        </div>
                        <div>
                            <p  className='text-[18px] md:text-[14px] font-thin mt-1'>{turncateStrting(Movie.overview, 400)}</p>
                        </div>
                    </div>
                    <div id='trailer' className='w-full h-[400px] flex justify-center items-end sm:hidden md:hidden'>
                        {<YouTube opts={opts} videoId={Trailer? Trailer.key : 'Y1DZZvTnOH8'}/>}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MovieCard