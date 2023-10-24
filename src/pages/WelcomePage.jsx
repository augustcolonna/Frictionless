//hooks
// import { useNavigate } from 'react-router-dom';
//routing
import { Link } from 'react-router-dom';
//misc.
import Logo from '../assets/hi5Boxbig.png';
//styles
import '../styles/App.css';

function WelcomePage() {
  return (
    <div className="welcome-page">
      <img src={Logo} alt="hi5box logo" />
      <div className="choice-container">
        <button className="btn">
          <Link to="/signin">Sign In</Link>
        </button>
        <button className="btn">
          <Link to="/signup">Sign Up</Link>
        </button>
      </div>
    </div>
  );
}

export default WelcomePage;
