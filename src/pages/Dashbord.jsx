import React from 'react';
import { useCollection } from '../hooks/useCollection';
import ProjectList from '../components/ProjectList';

function Dashbord() {
  const { documents, error } = useCollection('projects');

  return (
    <div>
      <h2 className="page-title">Dashbord</h2>
      {error && <p className="error">{error}</p>}
      {documents && <ProjectList projects={documents} />}
    </div>
  );
}

export default Dashbord;
