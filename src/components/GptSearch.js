import React from 'react'
import GptSearchBar from './GptSearchBar'
import GptMovieSuggestions from './GptMovieSuggestions'
import { BACKGROUND_PAGE } from '../utils/constants'

const GptSearch = () => {
  return (
    <div className='md:bg-gradient-to-r from-gray-700 w-screen aspect-video'>
        <div className="fixed -z-10 w-full h-full">
            <img className="h-screen object-cover  md:w-screen" src={BACKGROUND_PAGE} alt="background-image"/>
        </div>
      <GptSearchBar/>
      <GptMovieSuggestions/>
    </div>
  )
}

export default GptSearch