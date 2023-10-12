import { useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { auth } from "../firebase/firebaseconfig";
import { signInWithEmailAndPassword } from "firebase/auth";

function useLogIn() {
  const [error, setError] = useState(null);
  const { dispatch } = useAuthContext();

  const login = (email, password) => {
    setError(null);
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        dispatch({ type: "LOGIN", payload: userCredential.user });
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  return { error, login };
}

export default useLogIn;
//import hook to login page
// const {error, login} = useLogin()
//use this in handlesubmit function onSubmit in form
//output error at the end of the form
