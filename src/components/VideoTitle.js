import React from 'react'

const VideoTitle = ({title, overview}) => {
  return (
    <div className='h-screen w-screen object-cover md:w-screen aspect-video pt-[20%] px-24 absolute text-white bg-gradient-to-r from-black'>
        <h1 className='text-2xl md:text-6xl font-bold'>{title}</h1>
        <p className='hidden md:inline-block py-6 text-xl w-1/3'>{overview}</p>
        <div className='px-0'>
            <button className='bg-white text-black px-3 md:px-10 py-1 md:py-3 text-lg font-semibold rounded-md hover:bg-opacity-80 my-3 md:my-0'><span className='font-bold'>▷</span> Play</button>
            <button className='hidden md:inline-block mx-2 bg-gray-500 text-white bg-opacity-50 px-10 p-3 text-lg font-semibold rounded-md hover:bg-opacity-60'>ⓘ More Info</button>
        </div>
    </div>
  )
}

export default VideoTitle
