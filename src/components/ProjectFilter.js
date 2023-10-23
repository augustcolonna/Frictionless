const filters = ['all', 'mine', 'development', 'marketing', 'sales', 'design'];

function ProjectFilter({ currentFilter, changeFilter }) {
  const handleClick = (newfilter) => {
    changeFilter(newfilter);
  };

  return (
    <div className="project-filter">
      <nav>
        <p>filter by</p>
        {filters.map((filter) => {
          return (
            <button
              key={filter}
              onClick={() => handleClick(filter)}
              className={currentFilter === filter ? 'active' : ''}
            >
              {filter}
            </button>
          );
        })}
      </nav>
    </div>
  );
}

export default ProjectFilter;
