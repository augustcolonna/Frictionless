import React from 'react';

function ProjectSummary({ project }) {
  return (
    <div className="project-summary">
      <h2 className="page-title">{project.project.name}</h2>
      <p className="due-date">
        Project due by {project.project.dueDate.toDate().toDateString()}
      </p>
      <p className="details">{project.project.details}</p>
      <h4>Project is assigned to</h4>
      <div className="assigned-users">
        {project.project.assignedUsersList.map((user) => {
          return (
            <div key={user.id}>
              <p>{user.displayName}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ProjectSummary;
