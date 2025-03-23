import React from 'react'
import { IMG_CDN_URL } from '../utils/constants'

const MovieCard = ({ posterPath }) => {
  if(!posterPath) return;
  return (
    <div>
         <div className='w-36 md:w-48 -ml-2 pr-4'>
         <img className="h-64 w-48 overflow-hidden" alt='Movie Card'
         src={IMG_CDN_URL + posterPath}/>
    </div>
    </div>
   
  )
}

export default MovieCard
