import React from 'react';
import '../styles/userlist.css';
import { useCollection } from '../hooks/useCollection';
// import Avatar from './Avatar';

function UserList() {
  const { documents } = useCollection('users');

  return (
    <div className="user-list">
      <h2>Team Members</h2>
      {documents &&
        documents.map((user) => {
          return (
            <div key={user.id} className="user-list-item">
              {user.data.online && <span className="online-user"></span>}
              {!user.data.online && <span className="offline-user"></span>}
              <span>{user.data.displayName}</span>
              {/* <Avatar src={user.data.photoURL} /> */}
            </div>
          );
        })}
    </div>
  );
}

export default UserList;
