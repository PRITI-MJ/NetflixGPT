import { useRef, useState } from "react";
import Header from "./Header";
import { checkValidData } from "../utils/validate";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword,updateProfile } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { BACKGROUND_PAGE } from "../utils/constants";



const Login = () => {

    const [isSignInForm, setIsSignInForm] = useState(true);
    const [errorMessage, setErrorMessage] = useState(null);
   

    const name = useRef(null);
    const email = useRef(null);
    const password = useRef(null);

    const toggleSignInForm = () => {
    setIsSignInForm(!isSignInForm);
}

    

    const handleButtonClick = () => {
        //Validate the form data
        const message = checkValidData(email.current.value, password.current.value)
        setErrorMessage(message);

        if(message) return;

        //sign in logic
       
        signInWithEmailAndPassword(auth, email.current.value, password.current.value)
        .then((userCredential) => {
          // Signed in 
          const user = userCredential.user;
        })
        .catch((error) => {
          setErrorMessage("Please enter the correct username or password")
        });
          

    }

    const handleButtonClickSignUp = () => {
        const message = checkValidData(email.current.value, password.current.value, name.current.value)
        setErrorMessage(message);

        if(message) return;

        //sign up logic

        createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
                .then((userCredential) => {
                    // Signed up 
                    const user = userCredential.user;
                    updateProfile(user, {
                        displayName: name.current.value
                      }).then(() => {})
                      .catch((error) => {
                        setErrorMessage(error.message)
                      });
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    setErrorMessage(errorCode + "-" + errorMessage);
                });
    }


    return(
        <div>
            <Header/>
            <div className="absolute w-full h-full">
                <img className="h-screen object-cover md:w-screen" src={BACKGROUND_PAGE} alt="background-image"/>
            </div>
            <form onSubmit={(e) => e.preventDefault()} className="w-full md:w-3/12 absolute p-12 bg-black bg-opacity-75 my-36  mx-auto right-0 left-0 text-white">
                <h1 className="font-bold text-3xl px-2 py-6">{isSignInForm? "Sign In" : "Sign Up"}</h1>
                {!isSignInForm && <input ref={name} type="text" placeholder="Full Name" className="p-2 m-2 w-full rounded-md bg-gray-700"/>}
                <input ref={email} type="text" placeholder="Email or mobile number" className="p-2 m-2 w-full rounded-md bg-gray-700"/>
                <input ref={password} type="password" placeholder="Password" className="p-2 m-2 w-full rounded-md bg-gray-700"/>
                <p className="text-red-700 px-2 mb-2">{errorMessage}</p>
                {isSignInForm? <button className="py-4 m-2 bg-red-700 w-full rounded-md" onClick={handleButtonClick}>Sign In</button> : <button className="py-4 m-2 bg-red-700 w-full rounded-md" onClick={handleButtonClickSignUp}>Sign Up</button> }
                {isSignInForm ? <p className="py-4 px-2 flex">New to Netflix?<p className="font-bold cursor-pointer" onClick={toggleSignInForm}>Sign Up now.</p></p> : <p className="py-4 px-2 flex">Already registered?<p className="font-bold cursor-pointer" onClick={toggleSignInForm}>Sign In Now.</p></p>}
                

            </form>
        </div>
    )
}

export default Login;