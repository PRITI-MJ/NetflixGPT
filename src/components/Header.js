import React, { useEffect, useState } from 'react'
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../utils/firebase';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addUser, removeUser } from '../utils/userSlice';
import { LOGO_URL, SUPPORTED_LANGUAGES, USER_AVATAR } from '../utils/constants';
import { toggleGptSearchView } from '../utils/gptSlice';
import { changeLanguage } from '../utils/configSlice';
import { resetMovieData } from '../utils/gptSlice';



const Header = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const showGptSearch = useSelector((store) => store.gpt.showGptSearch)
 


  const showSignoutButton = location.pathname === '/browse';
  
  const handleSignOut = () => {
    signOut(auth).then(() => {})
    .catch((error) => {
      navigate("/error")
    });
  }


  const toggleDropdown = () => {
      setIsOpen(!isOpen)
  }

  useEffect(() => {
    const unsubsribe = onAuthStateChanged(auth, (user) => {
        if (user) {
          const {uid, email, displayName} = user;
          dispatch(addUser({uid: uid, email: email, displayName: displayName}))
          navigate("/browse")
        } else {
          // User is signed out
          dispatch(removeUser())
          navigate("/")
        }
      });

    //unsubscribe when component unmounts
    return () => unsubsribe();
},[])


const handleGptSearchClick = () => {
  // Toggle GPT Search
  dispatch(toggleGptSearchView());

  dispatch(resetMovieData());
}

const handleLanguageChange = (e) => {
    dispatch(changeLanguage(e.target.value))
}


//to change the background color while scrolling
  const [scrolled, setScrolled] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > 100) {  // Adjust scroll position as needed
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    // Cleanup on component unmount
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  

  return (
    <div className={`fixed w-screen px-8 py-2 z-50 flex flex-col md:flex-row justify-between mt-0 pl-20 ${scrolled ? 'bg-black' : 'bg-gradient-to-b from-black'}`}>
      <img className= "w-44 mx-auto md:mx-0" src={LOGO_URL} alt="logo"/>

      {showSignoutButton && 
       <div className="cursor-pointer flex p-2 justify-between">
        {showGptSearch && <div className='flex p-2 cursor-pointer mt-2 -mx-2'>
          <select className='p-2 bg-white bg-opacity-80 text-black rounded-lg' onChange={handleLanguageChange}>
            {SUPPORTED_LANGUAGES.map(lang => <option key={lang.identifier}  value={lang.identifier}>{lang.name}</option>)}
          </select>
        </div>}

        {showGptSearch ? 
        (<button className='py-2 px-4 m-2 mt-4 bg-blue-500 text-white rounded-lg'
          onClick={handleGptSearchClick}
          >Home</button>) : 
        (<button className='py-2 px-4 m-2 mt-4 bg-purple-700 text-white rounded-lg'
        onClick={handleGptSearchClick}
        >GPT search</button>)
        }

       <div className="cursor-pointer" onClick={toggleDropdown}>
      <img className="w-10 h-10 mt-4 mr-12" src={USER_AVATAR} alt='usericon'/>
     </div>
    </div> }
       {/* Dropdown menu */}
       {isOpen && (
        <div className="absolute right-0 mt-20 mr-8 w-48 bg-white border border-gray-300 rounded-md shadow-lg">
          <ul className="py-1">
            <li className="px-4 py-2 text-white bg-black cursor-pointer hover:font-bold">Manage Profiles</li>
            <li className="px-4 py-2 text-white bg-black cursor-pointer hover:font-bold">Account</li>
            <li className="px-4 py-2 text-white bg-black cursor-pointer hover:font-bold">Help Centre</li>
            <li className="px-4 py-2 text-white bg-black cursor-pointer hover:font-bold" onClick={handleSignOut}>Sign Out</li>
          </ul>
        </div>
      )}
     
    </div>
  )


}
export default Header
