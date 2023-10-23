import React from 'react';
import { db } from '../firebase/firebaseconfig';
import { doc, deleteDoc } from 'firebase/firestore';
import { useAuthContext } from '../hooks/useAuthContext';

function ProjectSummary({ project }) {
  const { user } = useAuthContext();

  const handleDelete = async (id) => {
    const docRef = doc(db, 'projects', id);
    await deleteDoc(docRef);
  };

  return (
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
      {user.uid === project.createdBy.id && (
        <button className="btn" onClick={() => handleDelete(document.id)}>
          Delete Project
        </button>
      )}
    </div>
  );
}

export default ProjectSummary;
