import React from 'react'
import Main from '../components/Main'
import Row from '../components/Row'

const Home = () => {
    return (
        <div id='Main'>
            <Main fetchURL={'/api/lists/Main'}/>
            <Row rowID='1' title='New Movies' fetchURL={'/api/lists/Main'} />
            <Row rowID='2' title='Top Rated Movies' fetchURL={'/api/lists/TopRated'}  />
            <Row rowID='3' title='Now Playing' fetchURL={'/api/lists/NowPlaying'}  />
            <Row rowID='4' title='Popular TV Shows' fetchURL={'/api/lists/ShowPopular'}  />
            <Row rowID='5' title='Top Rated TV Shows' fetchURL={'/api/lists/ShowTopRated'}  />
            <Row rowID='6' title='Trending' fetchURL={'/api/lists/Trending'}  />               
        </div>
    )
}

export default Home