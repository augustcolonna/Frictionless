import { useAuthContext } from "../hooks/useAuthContext";
import { AuthContextProvider } from "./context/AuthContext";
import { Routes, Route } from "react-router-dom";
import Signin from "./pages/Singin";
import Signup from "./pages/Signup";
import Home from "./pages/Home";

import "./App.css";

function App() {
  const { user, authIsReady } = useAuthContext();

  return (
    <div className="App">
      {authIsReady && (
        <AuthContextProvider>
          <Routes>
            <Route path="/signin"> {!user && <Signin />}</Route>
            <Route path="/singup">{!user && <Signup />}</Route>
            <Route path="/">{user && <Home />}</Route>
          </Routes>
        </AuthContextProvider>
      )}
    </div>
  );
}

export default App;
