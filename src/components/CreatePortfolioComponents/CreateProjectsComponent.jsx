import { GoPlus } from "react-icons/go";

const CreateProjectsComponent = ({ projects, setProjects, CreateProject,edit }) => {
  return (
    <div className="align-middle">
      <div className="projects-grid">
        {projects && projects.map((project, index) => {
          return (
            <CreateProject
              index={index}
              projects={projects}
              setProjects={setProjects}
              key={project.id}
              id={project.id}
              inputId={`project-${index}`}
              edit={edit}
            />
          );
        })}
        {(!projects || projects.length < 5) && (
          <div className="project">
            <div
              className="project-image-container"
              onClick={() => {
                if(!projects) return setProjects([
                  { name: "", snippet: "", id: Math.random() },
                ]);
                if ( projects.length === 5) return;
                setProjects([
                  ...projects,
                  { name: "", snippet: "", id: Math.random() },
                ]);
              }}
            >
              <GoPlus className="add-project-icon" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreateProjectsComponent;
