import React from 'react';
import '../styles/projectlist.css';

function ProjectList({ projects }) {
  return (
    <div>
      {projects.length === 0 ? (
        <p>No Projects</p>
      ) : (
        projects.map((project) => {
          return (
            <div key={project.id}>
              <p>{project.project.name}</p>
            </div>
          );
        })
      )}
    </div>
  );
}

export default ProjectList;
