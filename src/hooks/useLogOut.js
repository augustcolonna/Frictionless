import { auth } from "../firebase/firebaseconfig";
import useAuthContext from "./useAuthContext";
import { signOut } from "firebase/auth";

function useLogOut() {
  const { dispatch } = useAuthContext();
  const logout = () => {
    signOut(auth)
      .then(() => {
        dispatch({ type: "LOGOUT" });
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  return { logout };
}

export default useLogOut;

//import this hook into the page where you will be logging out
// const { logout } = useLogOut(); in the function then use it as a onClick event
