import { useState, useEffect } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';
import { auth, db, storage } from '../firebase/firebaseconfig';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { setDoc, doc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

export const useSignUp = () => {
  const [thumbnail, setThumbnail] = useState(null);
  const [error, setError] = useState(null);
  const [isCancelled, setIsCancelled] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const { dispatch } = useAuthContext();

  const signUp = async (email, password, displayName) => {
    setError(null);
    setIsPending(true);
    await createUserWithEmailAndPassword(auth, email, password)
      .then((res) => {
        dispatch({ type: 'LOGIN', paylod: res.user });
        if (!isCancelled) {
          setIsPending(false);
          setError(null);
        }
        console.log(res.user);
        //upload user profile picture
        const storageRef = ref(storage);
        const imagesRef = ref(
          storageRef,
          `thumbnails/${auth.uid}/${thumbnail.name}`
        );
        const img = uploadBytes(imagesRef, thumbnail);

        updateProfile(res.user, {
          displayName: displayName,
          // photoURL: imgUrl,
        });
        const uid = res.user.uid;
        setDoc(doc(db, 'users', uid), {
          online: true,
          displayName,
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
