import Temple from "../assets/temple.svg";
import { Link } from "react-router-dom";
import "../styles/navbar.css";
import { useLogOut } from "../hooks/useLogOut";

function Navbar() {
  const { logout } = useLogOut();

  return (
    <div className="navbar">
      <ul>
        <li className="logo">
          <img src={Temple} alt="dojo-logo" />
          <span>The Dojo</span>
        </li>
        <li>
          <Link to="/signin">Login</Link>
        </li>
        <li>
          <Link to="/signup">Signup</Link>
        </li>
        <li>
          <button className="btn" onClick={logout}>
            Logout
          </button>
        </li>
      </ul>
    </div>
  );
}

export default Navbar;
