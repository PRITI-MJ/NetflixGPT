import React, { useRef } from 'react'
import lang from '../utils/languageConstants'
import { useDispatch, useSelector } from 'react-redux'
import { API_OPTIONS, OPENAI_KEY } from '../utils/constants'
import { addGptMovieResults} from '../utils/gptSlice'


const GptSearchBar = () => {

  const dispatch = useDispatch()
  const langKey = useSelector((store) => store.config.lang)
  const searchText = useRef(null);

  const searchMovieTMDB = async (movie) => {
    const data = await fetch("https://api.themoviedb.org/3/search/movie?query="+movie+"&include_adult=false&language=en-US&page=1", API_OPTIONS)

    const json = await data.json()

    return json.results;
  }

  const handleGptSearchClick = async() => {
    
      //make an API call to GPT API and get Movie Results

      const gptQuery = "Act as a Movie Recommendation System and suggest some movies for the query" + searchText.current.value + ". Only give me names of 5 movies, comma separated like the example result given ahead. Example Result: Gadar, Sholay, Don, Golmal Returns, Koi mil Gya. Please show only the names of the movie and not the text."

      // const gptResults = await openai.chat.completions.create({
      //   model: 'gpt-3.5-turbo',
      //   messages: [
      //     { role: 'user', content: gptQuery },
      //   ],
      // });

      // console.log(gptResults.choices?.[0]?.message?.content);

      const payload = {
        "contents": [{
          "parts": [{"text": gptQuery}]
        }]
      }


      let gptResults = await fetch(OPENAI_KEY, {
        method: "POST",
        body: JSON.stringify(payload)
      })

     gptResults = await gptResults.json()

      const gptMovies = gptResults.candidates[0].content.parts[0].text.split(",") //now GPT movies become array
      
      //For each movie, I will search TMDB API
      const promiseArray = gptMovies.map(movie => searchMovieTMDB(movie))
      //we will get a result of array of Promise(it will take some time to resolve)

      const tmdbResults = await Promise.all(promiseArray);

      dispatch(addGptMovieResults({movieNames: gptMovies, movieResults: tmdbResults}))


  }

  return (
    
      <div className='pt-[35%] md:pt-[10%] flex justify-center '>
        <form className='w-full bg-black md:w-1/2 grid grid-cols-12' onSubmit={(e) => e.preventDefault()}>
              <input ref={searchText} type='text' className=' m-4 p-4 col-span-9 rounded-sm' placeholder={lang[langKey].gptSearchPlaceholder}></input>
              <button className='py-2 px-4 m-4 bg-red-700 text-white rounded-lg col-span-3' onClick={handleGptSearchClick}>{lang[langKey].search}</button>
        </form>
      </div>
  )
}

export default GptSearchBar
