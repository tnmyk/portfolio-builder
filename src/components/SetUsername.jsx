import { useState } from "react";
import { db } from "../firebase";
import { useAuth } from "../context/AuthContext";
import Loader from "react-loader-spinner";
import { GoCheck } from "react-icons/go";
import { AiOutlinePlus } from "react-icons/ai";
import { useHistory } from "react-router-dom";

import "../css/setusername.css";
const SetUsername = () => {
  const history=useHistory()
  const { currentUser } = useAuth();
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState("");
  async function handleSubmitUsername() {
    try {
      if (loading !== "available") return;
      await currentUser.updateProfile({
        displayName: username,
      }); //history push after delay
      await db.collection("username").where("uid", "==", currentUser.uid).get().then((docSnapshot)=>{
        docSnapshot.forEach(doc=>{
          doc.ref.delete()
        })
      })
      db.collection("users").doc(currentUser.uid).set({
        email: currentUser.email,
        username: username,
      },{merge:true});
      db.collection("username").doc(username).set({
        uid: currentUser.uid,
        email: currentUser.email,
      });
    } catch {
      console.log('errr')
    }
    history.push('/dashboard')
  }

  const handleUsername = (e) => {
    setUsername(e.target.value);
    setLoading("loading");
    if (e.target.value.trim() === "") return setLoading("Unavailable");
    db.collection("username")
      .doc(e.target.value)
      .get()
      .then((docSnapshot) => {
        if (docSnapshot.exists) {
          setLoading("taken");
        } else {
          setLoading("available");
        }
      });
  };
  const Load = () => {
    if (loading === "loading")
      return (
        <Loader
          type="TailSpin"
          color="#911cff"
          height={"1.3rem"}
          width={"1.3rem"}
          className="loader"
        />
      );
    else if (loading === "taken")
      return <AiOutlinePlus className=" loader unavail-username" />;
    else if (loading === "available")
      return <GoCheck className="check-username loader" />;
    else return "";
  };
  return (
    <div className="page">
      <h1 className="sub-heading">Set a unique Username</h1>
      <h4 className="sub-heading">This will be used for your Website's link</h4>
      <div className="input-container username-input-container">
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={handleUsername}
          className='input-intro'
        />

        <Load />
      </div>
      <div className="input-hint username-hint">
        Your website link🔗 will be http://portfoliobuilder.vercel.app/portfolio/{username}{" "}
        <br />
        You can't change this later.
      </div>
      <button className="btn " onClick={handleSubmitUsername}>
        Get Username
      </button>
    </div>
  );
};

export default SetUsername;
