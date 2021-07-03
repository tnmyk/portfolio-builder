const PersonalProject = ({name,snippet,photo}) => {
    return (
      <div className="project">
        <div className="project-image-container">
          {<img src={photo} alt="" className="project-image" />}
        </div>
        <h4 className='project-name'>{name}</h4>
        <p className="project-snippet">{snippet}</p>
      </div>
    );
}
 
export default PersonalProject;