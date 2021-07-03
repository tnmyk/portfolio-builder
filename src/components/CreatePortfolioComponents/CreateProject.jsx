import { useState } from "react";
import { useEffect } from "react/cjs/react.development";
import {storage} from '../../firebase'
import { useAuth } from "../../context/AuthContext";
const CreateProject = ({ index, setProjects, projects, id, inputId,edit }) => {
  const {currentUser} = useAuth()
  const [projectForm, setProjectForm] = useState(projects[index]);
  const [photoURL, setPhotoURL] = useState();
  let tempProjects = projects;
  const handleChange = (e) => {
    setProjectForm({ ...projectForm, [e.target.name]: e.target.value });
  };
  useEffect(()=>{
    if (!edit) return;
    console.log(projectForm.photo);
    setPhotoURL(projectForm.photo);
    // eslint-disable-next-line
  },[])
  useEffect(() => {
    tempProjects[index] = projectForm;
    setProjects(tempProjects);
    // eslint-disable-next-line
  }, [projectForm]);

  const handleDelete = () => {
    setProjects(tempProjects.filter((project) => project.id !== id));
  };
  const handleImgClick = () => {
    document.querySelector(`#${inputId}`).click();
  };

  const handleImageInput = (e) => {
    const selected = e.target.files[0];
    if (!selected) return;
    if ((selected.size / 1024 / 1024).toFixed(4) > 1)
      return alert("Please Upload file less than 1MB");
    let reader = new FileReader();
    reader.readAsDataURL(selected);
    reader.onload = async () => {
      setPhotoURL(reader.result);
      const storageRef = storage.ref();
      const fileRef = storageRef.child("/" + currentUser.uid + "/projects/"+index);
      await fileRef.put(selected);
      setProjectForm({ ...projectForm, photo: await fileRef.getDownloadURL() });

    };

  };
  return (
    <div className="project">
      <input
        type="file"
        name="image"
        className="project-input-image"
        onChange={handleImageInput}
        style={{ display: "none" }}
        id={inputId}
      />
      <div className="project-image-container" onClick={handleImgClick}>
        {<img src={photoURL} alt="" className="project-image" />}
      </div>
      <div className="input-container input-project-container">
        <input
          maxLength="30"
          type="text"
          name="name"
          className="input-project-name"
          placeholder="Project Name"
          value={projectForm.name}
          onChange={handleChange}
        />
        <div className="input-count">{projectForm.name.length} /30</div>
      </div>

      <div className="input-container input-project-container">
        <textarea
          maxLength="90"
          name="snippet"
          className="input-project-snippet"
          value={projectForm.snippet}
          onChange={handleChange}
        />
        <div className="input-count">{projectForm.snippet.length} /90 </div>
      </div>
      <button className="project-delete-btn" onClick={handleDelete}>
        Delete
      </button>
    </div>
  );
};

export default CreateProject;
