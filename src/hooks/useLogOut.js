import { useState, useEffect } from "react";
import { auth, db } from "../firebase/firebaseconfig";
import { useAuthContext } from "../hooks/useAuthContext";
import { signOut } from "firebase/auth";
import { updateDoc, doc } from "firebase/firestore";

export const useLogOut = () => {
  const [isPending, setIsPending] = useState(false);
  const [isCancelled, setIsCancelled] = useState(false);
  const [error, setError] = useState(null);

  const { dispatch, user } = useAuthContext();

  const logout = () => {
    setError(null);
    setIsPending(true);

    //update online status
    const { uid } = user;
    const updateLogin = doc(db, "users", uid);
    updateDoc(updateLogin, {
      online: false,
    });

    signOut(auth)
      .then(() => {
        dispatch({ type: "LOGOUT" });
        if (!isCancelled) {
          setIsPending(false);
          setError(null);
        }
      })
      .catch((error) => {
        if (!isCancelled) {
          setError(error.message);
          setIsPending(false);
        }
        console.log(error.message);
      });
  };

  useEffect(() => {
    return () => setIsCancelled(true);
  }, []);

  return { logout, error, isPending };
};

//import this hook into the page where you will be logging out
// const { logout } = useLogOut(); in the function then use it as a onClick event
