//hooks
import { useAuthContext } from '../hooks/useAuthContext';
import { useCollection } from '../hooks/useCollection';
//components
import Avatar from './Avatar';
//routing
import { NavLink } from 'react-router-dom';
//misc.
import DashboardIcon from '../assets/dashboard_icon.svg';
import AddIcon from '../assets/add_icon.svg';
import ProfileIcon from '../assets/user_icon.svg';

//styles
import '../styles/sidebar.css';

export default function Sidebar() {
  const { user } = useAuthContext();

  const { documents } = useCollection('users');

  // const getProfile = documents.filter((document) => {
  //   return document.id === user.uid;
  // });

  // console.log(getProfile);

  return (
    <div className="sidebar">
      <div className="sidebar-content">
        <div className="user">
          <Avatar src={user.photoURL} />
          <p>Hey there {user.displayName}</p>
        </div>
        <nav className="links">
          <ul>
            <li>
              <NavLink to="/profile">
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
      </div>
    </div>
  );
}
