//hooks
import { useAuthContext } from './hooks/useAuthContext';
//routing
import { Routes, Route, Navigate, BrowserRouter } from 'react-router-dom';
//pages
import Signin from './pages/Singin';
import Signup from './pages/Signup';
import Create from './pages/Create';
import Dashbord from './pages/Dashbord';
import Project from './pages/Project';
//components
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import UserList from './components/UserList';
//styles
import './styles/App.css';
import WelcomePage from './pages/WelcomePage';

function App() {
  const { user, authIsReady } = useAuthContext();

  return (
    <div className="App">
      {authIsReady && (
        <BrowserRouter>
          {user && <Sidebar />}
          <div className="container">
            <Navbar />
            <Routes>
              <Route path="/welcome" element={<WelcomePage />} />
              <Route
                path="/signin"
                element={user ? <Navigate to="/" /> : <Signin />}
              />
              <Route
                path="/signup"
                element={user ? <Navigate to="/" /> : <Signup />}
              />
              <Route
                path="/create"
                element={user ? <Create /> : <Navigate to="/welcome" />}
              />
              <Route
                path="/"
                element={user ? <Dashbord /> : <Navigate to="/welcome" />}
              />
              <Route
                path="/projects/:id"
                element={user ? <Project /> : <Navigate to="/welcome" />}
              />
            </Routes>
          </div>
          {user && <UserList />}
        </BrowserRouter>
      )}
    </div>
  );
}

export default App;
