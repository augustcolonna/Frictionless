//hooks
import { useAuthContext } from '../hooks/useAuthContext';
import { useNavigate } from 'react-router-dom';
//firebase imports
import { db } from '../firebase/firebaseconfig';
import { doc, deleteDoc } from 'firebase/firestore';
//styles
import '../styles/project.css';

function ProjectSummary({ project }) {
  const { user } = useAuthContext();
  const navigate = useNavigate();

  const handleDelete = async (id) => {
    const docRef = doc(db, 'projects', id);
    await deleteDoc(docRef);
    navigate('/');
  };

  const handleUpdate = async (id) => {};

  return (
    <div>
      <div className="project-summary">
        <h2 className="page-title">{project.name}</h2>
        <p>Project Owner {project.createdBy.displayName}</p>
        <p className="due-date">
          Project due by {project.dueDate.toDate().toDateString()}
        </p>
        <p className="details">{project.details}</p>
        <h4>Project is assigned to</h4>
        <div className="assigned-users">
          {project.assignedUsersList.map((user) => {
            return (
              <div key={user.id}>
                <p>{user.displayName}</p>
              </div>
            );
          })}
        </div>
      </div>
      {user.uid === project.createdBy.id && (
        <div>
          <button
            className="crud-buttons btn"
            onClick={() => handleDelete(project.id)}
          >
            Delete Project
          </button>
          <button
            className="crud-buttons btn"
            onClick={() => handleUpdate(document.id)}
          >
            Update Project
          </button>
        </div>
      )}
    </div>
  );
}

export default ProjectSummary;
