import { useAuthContext } from '../hooks/useAuthContext';

function ProfileInformaton({ profile }) {
  const { user } = useAuthContext();

  return (
    <div className="general-information">
      <h2>Profile Information</h2>
      <p>Display Name {profile.displayName}</p>
      <img src={user.photoURL} alt="user profile" />
    </div>
  );
}

export default ProfileInformaton;
