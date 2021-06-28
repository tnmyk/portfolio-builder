import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../firebase";
import Error from "./Error";
import PersonalNav from "./personalComponents/PersonalNav";
import SocialBtns from "./personalComponents/SocialBtns";
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
