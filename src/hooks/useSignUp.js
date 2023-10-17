import { useState, useEffect } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { auth, db } from "../firebase/firebaseconfig";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";

export const useSignUp = () => {
  const [error, setError] = useState(null);
  const [isCancelled, setIsCancelled] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const { dispatch } = useAuthContext();

  const signUp = async (email, password, displayName) => {
    setError(null);
    setIsPending(true);
    await createUserWithEmailAndPassword(auth, email, password)
      .then((res) => {
        dispatch({ type: "LOGIN", paylod: res.user });
        if (!isCancelled) {
          setIsPending(false);
          setError(null);
        }
        console.log(res.user);
        //upload user profile picture
        // const uploadPath = `thumbnails/${auth.uid}/${thumbnail.name}`;
        // const img = storage.ref(uploadPath).put(thumbnail);
        // const imgUrl = img.ref.getDownloadURL();
        updateProfile(res.user, {
          displayName: displayName,
          // photoURL: imgUrl,
        });
        const uid = res.user.uid;
        // const userCollection = collection(db, "users");
        const data = {
          online: true,
          displayName,
        };
        // const ref = doc(userCollection, uid);
        // setDoc(ref, {
        //   data,
        // });

        setDoc(doc(db, "users", uid), {
          data,
        });
      })
      .catch((error) => {
        if (!isCancelled) {
          setError(error.message);
          setIsPending(false);
          console.log(error);
        }
      });
  };

  useEffect(() => {
    return () => setIsCancelled(true);
  }, []);

  return { error, signUp, isPending };
};

//import this into the signup page
//it will be handled in the handleSubmit function for the form
