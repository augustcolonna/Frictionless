import { useAuthContext } from '../hooks/useAuthContext';

import '../styles/profile.css';

function ProfileInformaton({ profile }) {
  const { user } = useAuthContext();

  return (
    <div className="general-information">
      <img className="profile-picture" src={user.photoURL} alt="user profile" />
      <p>
        <span>Display Name:</span> {profile.displayName}
      </p>
      <p>
        <span>Address:</span>
        {profile.address[0] +
          ' ' +
          profile.address[1] +
          ' ' +
          profile.address[2]}
      </p>
      <ul>
        <li>{}</li>
      </ul>
    </div>
  );
}

export default ProfileInformaton;
