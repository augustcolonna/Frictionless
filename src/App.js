import { AuthContextProvider } from "./context/AuthContext";
import { Routes, Route } from "react-router-dom";
import Signin from "./pages/Singin";
import Signup from "./pages/Signup";
import Create from "./pages/Create";
import Dashbord from "./pages/Dashbord";
import Project from "./pages/Project";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import "./styles/App.css";

function App() {
  return (
    <div className="App">
      <AuthContextProvider>
        <Sidebar />
        <div className="container">
          <Navbar />
          <Routes>
            <Route path="/signin" element=<Signin />></Route>
            <Route path="/signup" element=<Signup />></Route>
            <Route path="/create" element=<Create />></Route>
            <Route path="/" element=<Dashbord />></Route>
            <Route path="/projects/:id" element=<Project />></Route>
          </Routes>
        </div>
      </AuthContextProvider>
    </div>
  );
}

export default App;
