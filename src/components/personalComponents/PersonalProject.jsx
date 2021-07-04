const PersonalProject = ({name,snippet,photo,index}) => {
    return (
      <div className="project">
        <div className="project-image-container">
          {photo? <img src={photo} alt="" className="project-image" />: 'Project #'+index}
        </div>
        <h4 className='project-name'>{name}</h4>
        <p className="project-snippet">{snippet}</p>
      </div>
    );
}
 
export default PersonalProject;