//hooks
import { useLogOut } from '../hooks/useLogOut';
import { useAuthContext } from '../hooks/useAuthContext';
//routing
import { Link } from 'react-router-dom';
//misc.
import Logo from '../assets/hi5Boxbig.png';
//styles
import '../styles/navbar.css';

function Navbar() {
  const { user } = useAuthContext();
  const { logout, isPending } = useLogOut();

  return (
    <div className="navbar">
      <ul>
        <li className="logo">
          <img src={Logo} alt="hi5-logo" />
          <span>Hi5 Box</span>
        </li>
        {!user && (
          <li>
            <Link to="/signin">Login</Link>
          </li>
        )}
        {!user && (
          <li>
            <Link to="/signup">Signup</Link>
          </li>
        )}
        <li>
          {user && !isPending && (
            <button className="btn" onClick={logout}>
              Logout
            </button>
          )}
          {user && isPending && (
            <button className="btn" disabled>
              Logging Out...
            </button>
          )}
        </li>
      </ul>
    </div>
  );
}

export default Navbar;
