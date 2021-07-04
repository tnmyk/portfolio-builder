import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../firebase";
import Error from "./Error";
import PersonalNav from "./personalComponents/PersonalNav";
import SocialBtns from "./personalComponents/SocialBtns";
import PersonalSkill from "./personalComponents/PersonalSkill";
import PersonalProject from "./personalComponents/PersonalProject";
const PersonalSite = ({ setPersonal }) => {
  const { username } = useParams("");
  const [data, setData] = useState("");
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  useEffect(() => {
    setPersonal(true);
    db.collection("users")
      .where("username", "==", username)
      .get()
      .then((docSnapshot) => {
        if (docSnapshot.empty) {
          setNotFound(true);
          setPersonal(false);
          return;
        }
        require("../css/personalSite.css");
        setData(docSnapshot.docs[0].data());
        setLoading(false);
      });
  }, [username,setPersonal]);

  const Site = () => {
    return (
      <div className="personal-page">
        <PersonalNav logo={data.username} />
        <div className="personal-page-content">
          <div className="intro-flex">
            <div className="intro-photo">
              <div className="photo-container">
                <img src={data.data.photo} alt="" className="personal-photo" />
              </div>
            </div>
            <div className="personal-intro-text">
              <h3 className="personal-intro">{data.data.form.intro}</h3>
              <p className="personal-bio">{data.data.form.bio}</p>
              <SocialBtns socialLinks={data.data.socialLinks} />
            </div>
          </div>
          <h1 className="personal-subheading">Skills</h1>
          <div className="skills-container">
            {data.data.skillArr.map((skill) => {
              return <PersonalSkill name={skill.name} key={skill.id} />;
            })}
          </div>
          {data.data.projects && (
            <>
              <h1 className="personal-subheading">Projects</h1>
              <div className="projects-grid personal-projects-grid">
                {data.data.projects.map((project,index) => {
                  return (
                    <PersonalProject
                      name={project.name}
                      key={project.id}
                      photo={project.photo}
                      snippet={project.snippet}
                      index={index+1}
                    />
                  );
                })}
              </div>
            </>
          )}
        </div>
      </div>
    );
  };
  return (
    <>
      {!loading ? <Site />:''}
      {notFound ? <Error />:''}
    </>
  );
};

export default PersonalSite;
