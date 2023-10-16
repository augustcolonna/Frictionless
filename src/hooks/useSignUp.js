import { useState } from "react";
import useAuthContext from "./useAuthContext";
import { auth } from "../firebase/firebaseconfig";
import { createUserWithEmailAndPassword } from "firebase/auth";

export const useSignUp = () => {
  const [error, setError] = useState(null);
  const { dispatch } = useAuthContext();

  const signUp = (email, password, displayName) => {
    setError(null);
    createUserWithEmailAndPassword(auth, email, password)
      //upload user profile picture
      // const uploadPath = `thumbnails/${auth.user.uid}/${thumbnail.name}`;
      // const img = await storage.ref(uploadPath).put(thumbnail);
      // const imgUrl = await img.ref.getDownloadURL();
      // updateProfile(auth.user, {
      //   displayName: displayName,
      //   // photoURL: imgUrl,
      // })

      .then((res) => {
        dispatch({ type: "LOGIN", paylod: res.user });
        console.log(res.user);
      })
      .then()
      .catch((error) => {
        console.log(error);
      });
  };
  return { error, signUp };
};

//import this into the signup page
//it will be handled in the handleSubmit function for the form
