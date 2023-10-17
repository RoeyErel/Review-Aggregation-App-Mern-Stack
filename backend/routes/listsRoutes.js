import express from 'express'
const router = express.Router();
import fetch from 'node-fetch'
import dotenv from 'dotenv'
dotenv.config()

router.get("/", (req, res) => {
    res.send("Lists is on");
});

router.get('/Main', (req, res)=>{
  const header = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: process.env.Authorization
      }
    };
  fetch('https://api.themoviedb.org/3/movie/popular?language=en-US&page=1&with_original_language=en', header)
      .then(res => res.json())
      .then(data => res.json(data))
      .catch(err => console.error("error: ", err));
})

router.get('/PopularMovies', (req, res)=>{
    const header = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: process.env.Authorization
        }
      };
    fetch('https://api.themoviedb.org/3/movie/popular?language=en-US&page=1&with_original_language=en', header)
        .then(res => res.json())
        .then(data => res.json(data))
        .catch(err => console.error("error: ", err));
})

router.get('/NowPlaying', (req, res)=>{
    const header = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: process.env.Authorization
        }
      };
    fetch('https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1&with_original_language=en', header)
        .then(res => res.json())
        .then(data => res.json(data))
        .catch(err => console.error("error: ", err));
})

router.get('/TopRated', (req, res)=>{
    const header = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: process.env.Authorization
        }
      };
    fetch('https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1&with_original_language=en', header)
        .then(res => res.json())
        .then(data => res.json(data))
        .catch(err => console.error("error: ", err));
})


router.get('/ShowPopular', (req, res)=>{
    const header = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: process.env.Authorization
        }
    };
    fetch('https://api.themoviedb.org/4/account/632802a243250f007b7e765a/tv/recommendations?page=1&language=en-US', header)
        .then(res => res.json())
        .then(data => res.json(data))
        .catch(err => console.error("error: ", err));
})


router.get('/ShowTopRated', (req, res)=>{
    const header = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: process.env.Authorization
        }
      };
    fetch('https://api.themoviedb.org/3/tv/top_rated?language=en-US&page=1&with_original_language=en', header)
        .then(res => res.json())
        .then(data => res.json(data))
        .catch(err => console.error("error: ", err));
})

router.get('/Trending', (req, res)=>{
    const header = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: process.env.Authorization
        }
    };
    fetch('https://api.themoviedb.org/3/trending/all/day?language=en-US&with_original_language=en', header)
        .then(res => res.json())
        .then(data => res.json(data))
        .catch(err => console.error("error: ", err));
})

router.get('/Stream/:type/:id', (req, res)=>{
    const url = 'https://api.themoviedb.org/3/'+req.params.type+'/'+req.params.id;
    const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: process.env.Authorization
        }
    };  
    fetch(url, options)
        .then(res => res.json())
        .then(data => res.json(data))
        .catch(err => console.error('error:' + err));
})

router.get('/:id', (req, res)=>{
    const url = 'https://api.themoviedb.org/3/movie/'+req.params.id+'/videos?language=en-US';
    const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: process.env.Authorization
        }
    };
  
    fetch(url, options)
        .then(res => res.json())
        .catch(err => console.error('error:' + err));
})


export default router;