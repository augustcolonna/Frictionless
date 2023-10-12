import { useState } from "react";
import useAuthContext from "./useAuthContext";
import { auth } from "../firebase/firebaseconfig";
import { createUserWithEmailAndPassword } from "firebase/auth";

function useSignUp() {
  const [error, setError] = useState(null);
  const { dispatch } = useAuthContext();

  const signUp = (email, password, displayName) => {
    setError(null);
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        dispatch({ type: "LOGIN", paylod: userCredential.user });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return { error, signUp };
}

export default useSignUp;

//import this into the signup page
//it will be handled in the handleSubmit function for the form
