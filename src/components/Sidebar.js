//hooks
import { useAuthContext } from '../hooks/useAuthContext';
import { useLogOut } from '../hooks/useLogOut';

//components

//routing
import { NavLink } from 'react-router-dom';
//misc.
import DashboardIcon from '../assets/dashboard_icon.svg';
import AddIcon from '../assets/add_icon.svg';
import ProfileIcon from '../assets/user_icon.svg';
import UserList from './UserList';
import Logo from '../assets/hi5Boxbig.png';
//styles
import '../styles/sidebar.css';
import { useState } from 'react';

export default function Sidebar() {
  const [isClicked, setIsClicked] = useState(false);
  const { user } = useAuthContext();
  const { logout, isPending } = useLogOut();

  const toggleClicked = () => {
    setIsClicked(!isClicked);
  };

  return (
    <div className="sidebar">
      <div className="sidebar-content">
        <div className="user">
          <ul>
            <li className="logo">
              <img src={Logo} alt="hi5-logo" />
            </li>
          </ul>
        </div>
        <nav className="links">
          <ul>
            <li>
              <NavLink to={`/profile/${user.uid}`} onClick={toggleClicked}>
                <img src={ProfileIcon} alt="profile icon" />
                <span>Profile</span>
                {isClicked && user && !isPending && (
                  <button className={'active'} onClick={logout}>
                    Logout
                  </button>
                )}
                {isClicked && user && isPending && (
                  <button className="btn" disabled>
                    Logging Out...
                  </button>
                )}
              </NavLink>
            </li>
            <li>
              <NavLink to="/">
                <img src={DashboardIcon} alt="dash icon" />
                <span>Dashbord</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/create">
                <img src={AddIcon} alt="add icon" />
                <span>New Project</span>
              </NavLink>
            </li>
          </ul>
        </nav>
        <UserList />
      </div>
    </div>
  );
}
