import { useState } from "react";
import { useHistory } from "react-router-dom";
import { storage, db } from "../firebase";
import { useAuth } from "../context/AuthContext";
import "../css/createportfolio.css";
import SocialLink from "./CreatePortfolioComponents/SocialLink";
import Skill from "./CreatePortfolioComponents/Skill";
import { FiSend } from "react-icons/fi";
const CreatePortfolio = () => {
  const [skillArr, setSkillArr] = useState([]);
  const history = useHistory()
  const socialLinkArr = [
    "instagram",
    "linkedin",
    "twitter",
    "facebook",
    "youtube",
  ];
  const { currentUser } = useAuth();
  const [photo, setPhoto] = useState();
  const [photoURL, setPhotoURL] = useState();
  const [social, setSocial] = useState({
    instagram: false,
    linkedin: false,
    facebook: false,
    youtube: false,
    twitter: false,
  });
  const [socialLinks, setSocialLinks] = useState({
    instagram: "",
    linkedin: "",
    facebook: "",
    youtube: "",
    twitter: "",
  });
  const [form, setForm] = useState({
    intro: "",
    bio: "",
  });
  const [skillInput, setSkillInput] = useState("");
  const handleForm = (e) => {
    const { value, name } = e.target;
    setForm({ ...form, [name]: value });
  };
  async function handleSubmit() {
    if (
      !photo ||
      skillArr.length === 0 ||
      form.intro.trim() === "" ||
      form.bio.trim() === ""
    )
      return alert("Please complete the form before submitting.");
    if ((photo.size / 1024 / 1024).toFixed(4) > 1)
      return alert("Please Upload file less than 1MB");
    const storageRef = storage.ref();
    const fileRef = storageRef.child(currentUser.uid);
    await fileRef.put(photo);
    db.collection("users")
      .doc(currentUser.uid)
      .update({
        data: {
          socialLinks: socialLinks,
          form: form,
          skillArr: skillArr,
          photo: await fileRef.getDownloadURL(),
        },
      }).then(()=>{
        db.collection('users').doc(currentUser.uid).get().then((docSnap)=>{
          history.push(`/portfolio/${docSnap.data().username}`)
        })
      });
  }
  const handleUpload = (e) => {
    const file = e.target.files[0];
    const url = URL.createObjectURL(file);
    setPhoto(file);
    setPhotoURL(url);
  };
  const handleSkillInput = () => {
    if (skillArr.length === 5) return;
    setSkillInput("");
    document.querySelector('.input-skill').focus()
    if (skillInput.trim() === "") return;
    setSkillArr([...skillArr, { name: skillInput, id: skillArr.length }]);
  };
  return (
    <div className="page">
      <h1 className="create-portfolio-heading">Create Portfolio</h1>
      <h2 className="create-portfolio-steps">
        Step 1 : Upload your Professional Photograph
      </h2>
      <div className="upload-photo align-middle">
        <div className="upload-photo-container">
          <img src={photoURL} alt="" className="photo" />
        </div>
        <input
          type="file"
          name="photo"
          id="input-photo"
          onChange={handleUpload}
        />
      </div>
      <h2 className="create-portfolio-steps">Step 2 : Enter Your Details</h2>
      <div className=" align-middle">
        <div className="input-container">
          <input
            maxLength="25"
            type="text"
            name="intro"
            placeholder="Intro"
            onChange={handleForm}
            value={form.intro}
          />
          <div className="input-count">{form.intro.length} /25</div>
        </div>
        <div className="input-hint">Ex: Hi!👋 My name is Tanmay</div>
        <div className="input-hint">
          You can leave it as your name only if you want
        </div>

        <div className="text-area-container">
          <textarea
            maxLength="150"
            name="bio"
            placeholder="Your Bio"
            onChange={handleForm}
            value={form.bio}
          ></textarea>
          <div className="input-count">{form.bio.length} /150</div>
        </div>
        <div className="input-hint">
          Tell something interesting about yourself in 150 letters
        </div>
      </div>
      <h2 className="create-portfolio-steps">Step 3 : Social Links</h2>
      <div className="align-middle">
        <div className="input-hint">
          Choose the social media sites you are active on
        </div>{" "}
        <br />
        {socialLinkArr.map((link, index) => {
          return (
            <SocialLink
              name={link}
              social={social}
              setSocial={setSocial}
              socialLinks={socialLinks}
              setSocialLinks={setSocialLinks}
              key={index}
            />
          );
        })}
      </div>
      <h2 className="create-portfolio-steps">
        Step 4 : Display Your Top-Skills
      </h2>
      <div className="align-middle">
        <div className="skills-container">
          {skillArr.map((skill, index) => {
            return (
              <Skill
                name={skill.name}
                id={skill.id}
                skillArr={skillArr}
                setSkillArr={setSkillArr}
                key={skill.id}
              />
            );
          })}
        </div>
        <div className="input-hint">
          Tell people about your top 5 skills ({skillArr.length}/5)
        </div>

        <div className="input-container input-skill-container">
          <input
            maxLength="15"
            type="text"
            placeholder="Skill Name"
            value={skillInput}
            onChange={(e) => {
              setSkillInput(e.target.value);
            }}
            className='input-skill'
          />
          <div className="input-count">{skillInput.length} /15</div>

          <FiSend className="send-skill-btn" onClick={handleSkillInput} />
        </div>
        <br />
      </div>
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default CreatePortfolio;
