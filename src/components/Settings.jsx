import SetUsername from "./SetUsername";
import { useState } from "react";
import { db } from "../firebase";
import { useAuth } from "../context/AuthContext";
import { useHistory } from "react-router-dom";
const Settings = () => {
  const history = useHistory()
  const { currentUser } = useAuth();
  const [created, setCreated] = useState(false);
  db.collection("users")
    .doc(currentUser.uid)
    .get()
    .then((docSnap) => {
      if (docSnap.data().data) setCreated(true);
    });
    const handleDeletePortfolio=()=>{
      if(!window.confirm('Are you sure you want to delete your Portfolio?')) return;
      db.collection("users").doc(currentUser.uid).update({
        data: null
      });
      setCreated(false)
    }
    const handleDeleteAccount =async () => {
      if (!window.confirm("Are you sure you want to delete your Account?")) return;

      await db
        .collection("username")
        .where("uid", "==", currentUser.uid)
        .get()
        .then((docSnapshot) => {
          docSnapshot.forEach((doc) => {
            doc.ref.delete();
          });
        });
      await db.collection("users").doc(currentUser.uid).delete()
      await currentUser.delete()
      history.push('/')
    };
  return (
    <div>
      <SetUsername  />
      <div className="page">
        <h1 className="sub-heading" style={{marginTop:'1.5rem'}}>Manage your Account</h1>
        <div className="skills-container settings-options-container">
          {created && (
            <div className="skill delete" onClick={handleDeletePortfolio}>
              Delete Portfolio
            </div>
          )}
          <div className="skill delete" onClick={handleDeleteAccount}>
            Delete Account
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
