import { useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { auth } from "../firebase/firebaseconfig";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

export const useSignUp = () => {
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const { dispatch } = useAuthContext();

  const signUp = async (email, password, displayName) => {
    setError(null);
    setIsPending(true);
    await createUserWithEmailAndPassword(auth, email, password)
      .then((res) => {
        dispatch({ type: "LOGIN", paylod: res.user });
        console.log(res.user);
        //upload user profile picture
        // const uploadPath = `thumbnails/${auth.uid}/${thumbnail.name}`;
        // const img = storage.ref(uploadPath).put(thumbnail);
        // const imgUrl = img.ref.getDownloadURL();
        updateProfile(res.user, {
          displayName: displayName,
          // photoURL: imgUrl,
        });
      })
      .catch((error) => {
        setError(error.message);
        setIsPending(false);
        console.log(error);
      });
  };
  return { error, signUp, isPending };
};

//import this into the signup page
//it will be handled in the handleSubmit function for the form
