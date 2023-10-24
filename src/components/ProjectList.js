//misc.
import { Link } from 'react-router-dom';
//styles
import '../styles/projectlist.css';

function ProjectList({ projects }) {
  return (
    <div className="project-list">
      {projects.length === 0 ? (
        <p>No Projects</p>
      ) : (
        projects.map((project) => {
          return (
            <Link to={`/projects/${project.id}`} key={project.id}>
              <h4>{project.name}</h4>
              <p>Due by {project.dueDate.toDate().toDateString()}</p>
              <div className="assigned-to">
                <ul>
                  {project.assignedUsersList.map((user) => {
                    return <li key={user.id}>{user.displayName}</li>;
                  })}
                </ul>
              </div>
            </Link>
          );
        })
      )}
    </div>
  );
}

export default ProjectList;
