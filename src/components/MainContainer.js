import React from 'react'
import { useSelector } from 'react-redux'
import VideoTitle from './VideoTitle'
import VideoBackground from './VideoBackground'

const MainContainer = () => {
    const movies = useSelector(store => store.movies?.nowPlayingMovies)
   

    if(!movies) return;


      // const randomIndex = Math.floor(Math.random() * movies.length);
      const mainMovie = movies[10]
  
   
   
    const {original_title, overview, id} = mainMovie;

  return (
    <div className='pt-[30%] bg-black w-screen md:pt-0'>
      <VideoTitle title={original_title} overview={overview} />
      <VideoBackground movieId = {id}/>
    </div>
  )
}

export default MainContainer
