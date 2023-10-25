//hooks
import { useAuthContext } from '../hooks/useAuthContext';
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

export default function Sidebar() {
  const { user } = useAuthContext();

  // const toggleClicked = () => {
  //   setIsClicked(!isClicked);
  //   console.log(isClicked);
  // };

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
              <NavLink to={`/profile/${user.uid}`}>
                <img src={ProfileIcon} alt="profile icon" />
                <span>Profile</span>
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
