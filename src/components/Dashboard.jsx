import React from "react";
import { useState } from "react";
import "../css/dashboard.css";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { ImNewTab } from "react-icons/im";
import { VscRefresh } from "react-icons/vsc";
import {db} from '../firebase'
import { FiSettings } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
function Dashboard() {
  const { currentUser } = useAuth();
  const [created,setCreated] =useState(false)
  db.collection('users').doc(currentUser.uid).get().then(docSnap=>{
    if(docSnap.data().data) setCreated(true)
  })
  return (
    <div className="page">
      <h1 className="sub-heading">Dashboard</h1>
      <div className="dashboard-page-btn-grid">
        <Link to="/create-portfolio" className="dashboard-page-btn">
          Create New Portfolio{" "}
          <AiOutlinePlusCircle className="dashboard-page-btn-icons" />
        </Link>

        {created && <><Link to="/edit-portfolio" className="dashboard-page-btn">
          Update Portfolio
          <VscRefresh className="dashboard-page-btn-icons" />
        </Link>
        <a
          target="_blank"
          rel="noreferrer"
          href={`/portfolio/${currentUser.displayName}`}
          className="dashboard-page-btn"
        > 
          View Portfolio <ImNewTab className="dashboard-page-btn-icons" />
        </a> </>}
        <Link to='/settings' className="dashboard-page-btn">
          Profile Settings <FiSettings className="dashboard-page-btn-icons" />
        </Link>
      </div>
    </div>
  );
}

export default Dashboard;
