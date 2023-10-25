//hooks
import { useParams } from 'react-router-dom';
import { useDocument } from '../hooks/useDocument';
import { useState } from 'react';
//components
import ProfileInformaton from '../components/ProfileInformaton';
//styles
import '../styles/profile.css';
import UpdateProfile from '../components/UpdateProfile';

function Profile() {
  const { id } = useParams();
  const { document, error } = useDocument('users', id);

  const [toggleUpdateProfile, setToggleUpdateProfile] = useState(false);

  const toggleUpdate = () => {
    setToggleUpdateProfile(!toggleUpdateProfile);
    console.log(toggleUpdateProfile);
  };

  if (error) {
    return <p className="error">{error}</p>;
  }

  if (!document) {
    return <div className="loading">loading profile...</div>;
  }
  return (
    <div className="profile-info">
      <h2>Profile Information</h2>
      <button className="btn" onClick={toggleUpdate}>
        Update Profile Information
      </button>
      {toggleUpdateProfile && <UpdateProfile profile={document} />}

      {!toggleUpdateProfile && <ProfileInformaton profile={document} />}
    </div>
  );
}

export default Profile;
