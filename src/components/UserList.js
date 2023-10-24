//hooks
import { useCollection } from '../hooks/useCollection';
//components
// import Avatar from './Avatar';
//styles
import '../styles/userlist.css';

function UserList() {
  const { documents } = useCollection('users');

  return (
    <div className="user-list">
      <h2>Team Members</h2>
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
  );
}

export default UserList;
