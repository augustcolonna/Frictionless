import { useParams } from 'react-router-dom';
import { useDocument } from '../hooks/useDocument';

import '../styles/profile.css';
import ProfileInformaton from '../components/ProfileInformaton';

function Profile() {
  const { id } = useParams();
  const { document, error } = useDocument('users', id);

  if (error) {
    return <p className="error">{error}</p>;
  }

  if (!document) {
    return <div className="loading">loading documents...</div>;
  }
  return (
    <div className="profile-info">
      <ProfileInformaton profile={document} />
    </div>
  );
}

export default Profile;
