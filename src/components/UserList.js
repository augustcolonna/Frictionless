//hooks
import { useCollection } from '../hooks/useCollection';
import { useState } from 'react';
//components
// import Avatar from './Avatar';
//styles
import '../styles/userlist.css';

function UserList() {
  const [showUsers, setShowUsers] = useState(false);
  const { documents } = useCollection('users');

  const handleToggle = () => {
    setShowUsers(!showUsers);
  };

  return (
    <div className="user-list">
      <button className="toggle-btn " onClick={handleToggle}>
        {!showUsers ? 'Online Team Members' : 'Hide'}
      </button>
      {showUsers && (
        <div className="online-members">
          {documents &&
            documents.map((user) => {
              return (
                <div key={user.id} className="user-list-item">
                  {user.online && <span className="online-user"></span>}
                  {!user.online && <span className="offline-user"></span>}
                  <span>{user.displayName}</span>
                  {/* <Avatar src={user.data.photoURL} /> */}
                </div>
              );
            })}
        </div>
      )}
    </div>
  );
}

export default UserList;
