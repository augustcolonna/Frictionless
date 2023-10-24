//hooks
import { useState } from 'react';
import { useCollection } from '../hooks/useCollection';
import { useAuthContext } from '../hooks/useAuthContext';
//components
import ProjectList from '../components/ProjectList';
import ProjectFilter from '../components/ProjectFilter';
//styles
import '../styles/dashboard.css';

function Dashbord() {
  const [currentFilter, setCurrentFilter] = useState('all');
  const { documents, error } = useCollection('projects');
  const { user } = useAuthContext();

  const changeFilter = (newFilter) => {
    setCurrentFilter(newFilter);
  };

  const filteredProjects = documents
    ? documents.filter((document) => {
        switch (currentFilter) {
          case 'all':
            return true;
          case 'mine':
            let assignedToMe = false;
            document.assignedUsersList.forEach((element) => {
              if (user.uid === element.id) {
                assignedToMe = true;
              }
            });
            return assignedToMe;
          case 'development':
          case 'design':
          case 'sales':
          case 'marketing':
            return document.category === currentFilter;
          default:
            return true;
        }
      })
    : null;

  return (
    <div>
      <h2 className="page-title">Dashbord</h2>
      {error && <p className="error">{error}</p>}
      {documents && (
        <ProjectFilter
          currentFilter={currentFilter}
          changeFilter={changeFilter}
        />
      )}
      {filteredProjects && <ProjectList projects={filteredProjects} />}
    </div>
  );
}

export default Dashbord;
